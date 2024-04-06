"use client";

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {authentication} from "@/lib/api";
import {useState} from 'react';
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import {Loader2, Mail} from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const {toast} = useToast();

  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">Logowanie</CardTitle>
        <CardDescription>
          Wpisz swojego emaila szkolnego aby zalogować się na twoje konto.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" disabled={loading} placeholder="nazwa@ckziu.elodz.edu.pl" required
                 value={email} onChange={data => setEmail(data.target.value)}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={loading} onClick={async () => {
          setResponse("Logowanie...")
          setLoading(true);
          const res = await authentication(email);
          setLoading(false);
          const success = res.token != null;
          if (!success) {
            toast({
              variant: "destructive",
              title: "O nie! Logowanie nie powiodło sie!",
              description: res.message,
              action: <ToastAction altText="Spróbuj ponownie">Spróbuj ponownie</ToastAction>,
            })
          } else {
            toast({
              variant: "default",
              title: "Logowanie powiodło sie!",
              description: res.message,
            })
          }
          ;
          setResponse(res.message);
        }}>{loading ?
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Logowanie...
          </>
          : <>
            <Mail className="mr-2 h-4 w-4"/>
            Zaloguj sie
          </>}</Button>
      </CardFooter>
      {/*{<p className="text-center">{response}</p>}*/}
    </Card>
  )
}
