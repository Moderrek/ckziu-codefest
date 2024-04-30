import axios from 'axios';
import { Fingerprint, Loader2, Mail } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { API_V1 } from '@/lib/api/api';

import UnstyledLink from '@/components/links/UnstyledLink';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

import {
  validate_name,
  validate_password,
  ValidationResult,
} from '@/utils/Validate';

interface LoginFormProps {
  loginService: boolean;
}

enum LoginStage {
  NONE,
  PRELOGIN,

  LOGGING_IN,

  WAITING_OTP,
  REGISTER,

  SUCCESS,
}

function LoginForm({ loginService }: LoginFormProps) {
  // form fields
  const [login, setLogin] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const [stage, setStage] = useState<LoginStage>(LoginStage.NONE);
  // is waiting for a response
  const [waiting, setWaiting] = useState<boolean>(false);
  const [validUserName, setValidUserName] = useState<
    ValidationResult | undefined
  >(undefined);
  const [validPassword, setValidPassword] = useState<
    ValidationResult | undefined
  >(undefined);
  // used to redirect after success login
  const router = useRouter();
  const { toast } = useToast();

  async function requestExist() {}

  function toastServerProblem() {
    toast({
      variant: 'destructive',
      title: 'Błąd po stronie serwera',
      description:
        'Przepraszamy! Wystąpił błąd po stronie serwera. Spróbuj ponownie później.',
    });
  }

  async function logIn(token: string, name: string) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    await router.push(`/p/${name}`);
  }

  async function fetchOtp() {
    setWaiting(true);
    let req;
    try {
      req = await axios.post(API_V1 + '/auth/otp', {
        email: login,
      });
    } catch (err) {
      setWaiting(false);
      toastServerProblem();
      return;
    }
    setWaiting(false);
    const data = req.data;
    if (!data.success) {
      toast({
        variant: 'destructive',
        title: 'Wystąpił problem',
        description: 'Wystąpił problem. ' + data.message,
      });
      return;
    }
    toast({
      variant: 'default',
      title: 'Wysłano kod na twoją pocztę!',
      description: ' Wpisz 6 cyfrowy kod, który otrzymasz na swoją pocztę.',
    });
    setStage(LoginStage.WAITING_OTP);
  }

  async function fetchRegister() {
    setWaiting(true);
    // verify data
    if (password !== passwordAgain) {
      toast({
        variant: 'destructive',
        title: 'Nieprawidłowe dane',
        description: 'Podane hasła nie są takie same!',
      });
      setWaiting(false);
      return;
    }
    // TODO validation

    let req;
    try {
      req = await axios.post(API_V1 + '/auth/register', {
        email: login,
        name: username,
        password: password,
        otp: otp,
      });
    } catch (err) {
      console.log(err);
      toastServerProblem();
      setWaiting(false);
      return;
    }
    setWaiting(false);
    const data = req.data;
    if (!data.success) {
      toast({
        variant: 'destructive',
        title: 'Wystąpił problem',
        description: data.message,
      });
      return;
    }

    toast({
      variant: 'default',
      title: 'Pomyślnie zalogowano',
      description: `Pomyślnie zalogowano jako ${data.name}`,
    });
    await logIn(data.token, data.name);
  }

  async function fetchPrelogin() {
    setStage(LoginStage.PRELOGIN);
    setWaiting(true);
    let prelogin_request;
    try {
      prelogin_request = await axios.post(API_V1 + '/auth/prelogin', {
        login: login,
      });
    } catch (err) {
      console.log(err);
      toastServerProblem();
      return;
    }
    if (prelogin_request.data.can_login) {
      setWaiting(false);
      setStage(LoginStage.LOGGING_IN);
    } else {
      setWaiting(true);
      setStage(LoginStage.WAITING_OTP);
      await fetchOtp();
      return;
    }
  }

  async function fetchLogin() {
    setWaiting(true);
    let login_request;
    try {
      login_request = await axios.post(API_V1 + '/auth/login/credentials', {
        login: login,
        password: password,
      });
      setWaiting(false);
    } catch (err) {
      console.log(err);
      toastServerProblem();
      setWaiting(false);
      return;
    }
    const data = login_request.data;
    if (!data.token) {
      toast({
        variant: 'destructive',
        title: 'Błąd po stronie serwera',
        description: 'Nie udało się zalogowoać.',
      });
      return;
    }
    await logIn(data.token, data.name);
  }

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (token == null) {
        return;
      }
      console.log('Logged in');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      if (localStorage.getItem('cachedName') !== null) {
        await router.push(`/p/${localStorage.getItem('cachedName')}`);
        return;
      }

      try {
        const req = await axios.get(API_V1 + '/auth/info');
        const data = req.data;
        localStorage.setItem('cachedName', data.name);
        await router.push(`/p/${data.name}`);
      } catch (err) {
        if (err.response.status === 401) {
          console.log('Logout..');
          // logout
          delete axios.defaults.headers.common['Authorization'];
          localStorage.removeItem('cachedName');
          localStorage.removeItem('token');
          await router.push(`/zaloguj`);
        }
      }
    })();
  }, [router]);
  useEffect(() => {
    setValidUserName(validate_name(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(validate_password(password, passwordAgain));
  }, [password, passwordAgain]);

  async function buttonClick() {
    if (stage == LoginStage.NONE) {
      await fetchPrelogin();
      return;
    }
    if (stage == LoginStage.LOGGING_IN) {
      await fetchLogin();
      return;
    }
    if (stage == LoginStage.WAITING_OTP) {
      await fetchRegister();
      return;
    }
  }

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Logowanie</CardTitle>
        <CardDescription>
          Wpisz swojego e-maila szkolnego albo login, aby zalogować się na swoje
          konto.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        {stage != LoginStage.WAITING_OTP ? (
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email albo login</Label>
            <Input
              id='email'
              name='login'
              type='text'
              disabled={waiting || !loginService || stage != LoginStage.NONE}
              placeholder='nazwa@ckziu.elodz.edu.pl'
              value={login}
              onChange={(data) => setLogin(data.target.value)}
              required
              onKeyDown={async (event) => {
                if (event.code === 'Enter') {
                  await buttonClick();
                  event.preventDefault();
                }
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {stage == LoginStage.LOGGING_IN ? (
          <div className='grid gap-2'>
            <Label htmlFor='password'>Hasło</Label>
            <Input
              id='password'
              name='password'
              type='password'
              disabled={waiting || !loginService}
              value={password}
              onChange={(data) => setPassword(data.target.value)}
              required
              maxLength={38}
              onKeyDown={async (event) => {
                if (event.code === 'Enter') {
                  await buttonClick();
                  event.preventDefault();
                }
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {stage == LoginStage.WAITING_OTP ? (
          <>
            <div className='grid gap-2'>
              <Label>Kod jednorazowej autoryzacji</Label>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(otp) => setOtp(otp)}
                name='otp'
                className='flex justify-center'
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Nazwa użytkownika</Label>
              <Input
                id='username'
                name='username'
                type='text'
                disabled={waiting}
                value={username}
                maxLength={38}
                onChange={(data) => setUsername(data.target.value)}
                required
              />
            </div>
            {Array.from(validUserName?.message).map((message, idx) => {
              return (
                <p key={idx} className='block text-red-400 text-sm font-bold'>
                  {message}
                </p>
              );
            })}

            <div className='grid gap-2'>
              <Label htmlFor='password'>Hasło</Label>
              <Input
                id='password'
                name='password'
                type='password'
                disabled={waiting}
                value={password}
                onChange={(data) => setPassword(data.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Ponownie hasło</Label>
              <Input
                id='password-again'
                name='password'
                type='password'
                disabled={waiting}
                value={passwordAgain}
                onChange={(data) => setPasswordAgain(data.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </CardContent>
      <CardFooter className='flex flex-col'>
        {!loginService ? (
          <>
            <Button className='w-full' disabled={true}>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Spróbuj ponownie
              później
            </Button>
            <UnstyledLink
              className='mt-2 text-red-400 hover:underline'
              href='/status'
            >
              Przepraszamy, serwery logowania są tymczasowo niedostępne. Spróbuj
              ponownie za chwilę
            </UnstyledLink>
          </>
        ) : (
          <>
            <Button
              type='button'
              className='w-full'
              disabled={waiting}
              onClick={async () => {
                await buttonClick();
              }}
            >
              {waiting ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Logowanie...
                </>
              ) : (
                <>
                  {stage == LoginStage.WAITING_OTP ? (
                    <Fingerprint className='mr-2 h-4 w-4' />
                  ) : (
                    <Mail className='mr-2 h-4 w-4' />
                  )}
                  Zaloguj sie
                </>
              )}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export { LoginForm };
