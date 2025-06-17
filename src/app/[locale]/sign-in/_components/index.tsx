"use client";
import { LoginDialog } from "@/components/dialog/login-dialog";

export function SignIn() {
  return <LoginDialog showCloseButton={false} open={true} redirectTo="/" />;
}
