import { ReactNode } from "react";

import { LoginForm } from "@/components/login/LoginForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type LoginDialogProps = {
  children: ReactNode;
}

/**
 * TODO Create login dialog using login form
 * @param children The trigger
 */
const LoginDialog = ({ children }: LoginDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>
      <DialogContent>
        {/* TODO change `loginService = true` to fetch API status */}
        <LoginForm loginService={true} />
      </DialogContent>
    </Dialog>
  );
};

export type { LoginDialogProps };
export default LoginDialog;