'use client';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { API_URL } from '@/lib/api/api';

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

export default function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitingForOtp, setWaitingForOtp] = useState(false);
  const router = useRouter();

  async function requestOTP() {
    if (loading) return;
    if (waitingForOtp) return;
    setLoading(true);
    let otp_request;
    try {
      otp_request = await axios.post(API_URL + '/auth/otp', {
        email: email,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    setWaitingForOtp(true);
  }

  // const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();
  //   const response = await signIn('credentials', {
  //     email: email,
  //     password: otp,
  //     redirect: true,
  //   });
  //   if (response?.status === 200) {
  //     await router.push('/');
  //     return;
  //   }
  //   if (response?.error) {
  //     console.log(response?.error);
  //   }
  // };
  //
  // async function requestLogin() {
  //   if (loading) return;
  //   if (!waitingForOtp) return;
  //   setLoading(true);
  //   let login_request;
  //   try {
  //     login_request = await axios.post(API_URL + '/auth/login', {
  //       email: email,
  //       otp: otp,
  //     });
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //     toast({
  //       variant: 'destructive',
  //       title: 'Błąd po stronie serwera',
  //       description:
  //         'Przepraszamy! Nie udało się zweryfikować danych logowania',
  //     });
  //     return;
  //   }
  //   if (!login_request.data.success) {
  //     toast({
  //       variant: 'destructive',
  //       title: 'O nie! Logowanie nie powiodło sie!',
  //       description: 'Podano nieprawidłowe dane logowania',
  //     });
  //     return;
  //   }
  //   toast({
  //     variant: 'default',
  //     title: 'Pomyślnie zalogowano!',
  //     description:
  //       'Autoryzowano za pomocą szyfrowanego jednorazowego hasła wysłanego na pocztę szkolną.',
  //   });
  //   setWaitingForOtp(true);
  //   console.log(login_request.data.token);
  // }

  return (
    <Card className='w-full max-w-sm '>
      <CardHeader>
        <CardTitle className='text-2xl'>Logowanie</CardTitle>
        <CardDescription>
          Wpisz swojego emaila szkolnego aby zalogować się na twoje konto.
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              name='email'
              type='email'
              disabled={loading || waitingForOtp}
              placeholder='nazwa@ckziu.elodz.edu.pl'
              required
              value={email}
              onChange={(data) => setEmail(data.target.value)}
            />
          </div>
          {waitingForOtp ? (
            <div className='flex flex-col justify-center'>
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(otp) => setOtp(otp)}
                name='otp'
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
        <CardFooter>
          {/*<Button*/}
          {/*  type={waitingForOtp ? 'submit' : 'button'}*/}
          {/*  className='w-full'*/}
          {/*  disabled={loading}*/}
          {/*  onClick={async () => {*/}
          {/*    if (!waitingForOtp) await requestOTP();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  {loading ? (*/}
          {/*    <>*/}
          {/*      <Loader2 className='mr-2 h-4 w-4 animate-spin' />*/}
          {/*      Logowanie...*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      {waitingForOtp ? (*/}
          {/*        <Fingerprint className='mr-2 h-4 w-4' />*/}
          {/*      ) : (*/}
          {/*        <Mail className='mr-2 h-4 w-4' />*/}
          {/*      )}*/}
          {/*      Zaloguj sie*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</Button>*/}
          <Button type='button' className='w-full' disabled={true}>
            Odblokowanie niedługo..
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
