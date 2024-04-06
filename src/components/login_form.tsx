import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {APIstatus, authentication} from "@/lib/api";
import { useId, useState } from 'react';



export default function LoginForm() {
    const [email, setEmail] = useState("");
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Logowanie</CardTitle>
        <CardDescription>
          Wpisz swojego emaila szkolnego aby zalogować się na twoje konto.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="nazwa@ckziu.elodz.edu.pl" required value={email} onChange={data => setEmail(data.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => authentication(email)}>Zaloguj się</Button>
      </CardFooter>
    </Card>
  )
}
