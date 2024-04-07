"use client";

import {Loader2, Mail} from "lucide-react";
import {useState} from 'react';

import {authentication} from "@/lib/api";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const {toast} = useToast();

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
            disabled={loading}
            placeholder='nazwa@ckziu.elodz.edu.pl'
            required
            value={email}
            onChange={(data) => setEmail(data.target.value)}
          />
        </div>
        {sent ? (
          <div className='grid gap-4'>
            <InputOTP maxLength={6}>
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
            setResponse('Logowanie...');
            setLoading(true);
            const res = await authentication(email);
            setLoading(false);
            const success: boolean = res.token;

            if (!success) {
              toast({
                variant: 'destructive',
                title: 'O nie! Logowanie nie powiodło sie!',
                description: res.message,
                action: (
                  <ToastAction altText='Spróbuj ponownie'>
                    Spróbuj ponownie
                  </ToastAction>
                ),
              });
            } else {
              toast({
                variant: 'default',
                title: 'Wysłano kod na twoją pocztę!',
                description: "Wpisz 6 cyfrowy kod, który otrzymasz na swoją pocztę.",
              });
              setSent(true);
            }
            setResponse(res.message);
          }}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Logowanie...
            </>
          ) : (
            <>
              <Mail className='mr-2 h-4 w-4' />
              Zaloguj sie
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
