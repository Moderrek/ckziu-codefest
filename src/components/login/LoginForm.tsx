'use client';

import axios from 'axios';
import { Fingerprint, Loader2, Mail } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { API_V1, API_V1_AUTH_OTP } from '@/lib/api/api';

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

interface LoginFormProps {
  loginService: boolean;
}

enum LoginStage {
  NONE,
  WAITING_OTP,
  LOGGING_IN,
  REGISTER,
  SUCCESS,
}

function LoginForm({ loginService }: LoginFormProps) {
  // form fields
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [stage, setStage] = useState<LoginStage>(LoginStage.NONE);
  // is waiting for a response
  const [waiting, setWaiting] = useState<boolean>(false);

  // used to redirect after success login
  const router = useRouter();
  const { toast } = useToast();

  async function requestExist() {}

  async function requestOTP() {
    setWaiting(true);
    let otp_request;
    try {
      otp_request = await axios.post(API_V1_AUTH_OTP, {
        email: email,
      });
      setWaiting(false);
    } catch (error) {
      console.log(error);
      setWaiting(false);
      toast({
        variant: 'destructive',
        title: 'Błąd po stronie serwera',
        description:
          'Przepraszamy! Nie udało się zweryfikować danych logowania',
      });
      return;
    }
    if (!otp_request.data.success) {
      toast({
        variant: 'destructive',
        title: 'O nie! Logowanie nie powiodło sie!',
        description:
          'Podano nieprawidłowe dane logowania. ' + otp_request.data.message,
      });
      return;
    }
    toast({
      variant: 'default',
      title: 'Wysłano kod na twoją pocztę!',
      description:
        otp_request.data.message +
        ' Wpisz 6 cyfrowy kod, który otrzymasz na swoją pocztę.',
    });
    setWaiting(false);
    setStage(LoginStage.LOGGING_IN);
  }

  async function requestLogin() {
    setWaiting(true);
    let login_request;
    try {
      login_request = await axios.post(API_V1 + '/auth/login', {
        email: email,
        otp: otp,
      });
      setWaiting(false);
    } catch (error) {
      console.log(error);
      setWaiting(false);
      toast({
        variant: 'destructive',
        title: 'Błąd po stronie serwera',
        description:
          'Przepraszamy! Nie udało się zweryfikować danych logowania',
      });
      return;
    }
    if (!login_request.data.success) {
      toast({
        variant: 'destructive',
        title: 'O nie! Logowanie nie powiodło sie!',
        description: 'Podano nieprawidłowe dane logowania',
      });
      return;
    }

    toast({
      variant: 'default',
      title: 'Pomyślnie zalogowano!',
      description:
        'Autoryzowano za pomocą szyfrowanego jednorazowego hasła wysłanego na pocztę szkolną.',
    });
    setStage(LoginStage.SUCCESS);

    localStorage.setItem('token', login_request.data.token);

    await router.push('/p/moderr');
  }

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Logowanie</CardTitle>
        <CardDescription>
          Wpisz swojego e-maila szkolnego, aby zalogować się na twoje konto.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            disabled={waiting || !loginService || stage != LoginStage.NONE}
            placeholder='nazwa@ckziu.elodz.edu.pl'
            value={email}
            onChange={(data) => setEmail(data.target.value)}
            required
          />
        </div>
        {stage == LoginStage.WAITING_OTP ? (
          <div className='flex flex-col justify-center'>
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
                if (true) {
                  await requestOTP();
                } else {
                  await requestLogin();
                }
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
