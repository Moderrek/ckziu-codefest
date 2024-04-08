'use client';

import { Fingerprint, Loader2, Mail } from 'lucide-react';
import { useState } from 'react';

import { API_URL, authentication } from '@/lib/api';

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
import { Label } from '@/components/ui/label';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import axios from 'axios';

export default function LoginForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitingForOtp, setWaitingForOtp] = useState(false);

  return (
    <Card className='w-full max-w-sm '>
      <CardHeader>
        <CardTitle className='text-2xl'>Logowanie</CardTitle>
        <CardDescription>
          Wpisz swojego emaila szkolnego aby zalogować się na twoje konto.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
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
            <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
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
        <Button
          className='w-full'
          disabled={loading}
          onClick={async () => {
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
                title: 'O nie! Logowanie nie powiodło sie!',
                description: 'Nie udało się zweryfikować danych logowania',
              });
              return;
            }
            if (!otp_request.data.success) {
              toast({
                variant: 'destructive',
                title: 'O nie! Logowanie nie powiodło sie!',
                description: 'Nie udało się zweryfikować danych logowania',
              });
              return;
            }
            toast({
              variant: 'default',
              title: 'Wysłano kod na twoją pocztę!',
              description:
                'Wpisz 6 cyfrowy kod, który otrzymasz na swoją pocztę.',
            });
            setWaitingForOtp(true);
          }}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Logowanie...
            </>
          ) : (
            <>
              {waitingForOtp ? (
                <Fingerprint className='mr-2 h-4 w-4' />
              ) : (
                <Mail className='mr-2 h-4 w-4' />
              )}
              Zaloguj sie
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
