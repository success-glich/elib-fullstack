import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { Link } from "react-router-dom"

 function LoginPage() {

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleLoginSubmit = ()=>{
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    console.log("login payload",{email,password})
  }
  return (
    <div className="container h-screen flex justify-center items-center">
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input ref ={emailRef} id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input ref ={passwordRef} id="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
       <div className="w-full"> <Button className="w-full" onClick={handleLoginSubmit}>Sign in</Button>
        <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/auth/register" className="underline">
          Register
        </Link>
      </div>
      </div>
      </CardFooter>
    </Card>
    </div>
  )
}
export default LoginPage