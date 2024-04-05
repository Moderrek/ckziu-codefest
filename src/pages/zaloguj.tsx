import LoginForm from "@/components/login_form";

export default function ZalogujPage() {

  return (<>
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <LoginForm/>
      </main>
    </div>

  </>);
}