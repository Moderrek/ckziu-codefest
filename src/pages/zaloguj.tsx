import LoginForm from "@/components/login_form";
// import Navbar from "@/components/ui/navbar";
import {Footer} from "@/components/component/Footer";

export default function LoginPage() {

  return (<>
    {/*<Navbar/>*/}
    <div className="flex flex-col min-h-screen">
      <div className="flex-auto">
        <div className="flex w-full flex-col items-center justify-center justify-self-center">
          <LoginForm/>
        </div>
      </div>
      <div className="flex-none h-14">
        <Footer/>
      </div>
    </div>
  </>);
}