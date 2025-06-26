"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginDialogProps = {
  open: boolean;
  onSubmitSuccess?: () => Promise<void>;
  onOpenChange?: (open: boolean) => void;
  redirectTo?: string;
} & React.ComponentProps<typeof DialogContent>;

// Define the schema for login validation
const loginSchema = z.object({
  email: z.string().email("schema.auth.invalidEmail"),
  password: z.string().min(1, "schema.auth.passwordRequired"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
const socialProviders = [
  {
    id: "google",
    name: "auth.google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27026 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
          fill="#EA4335"
        />
        <path
          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
          fill="#4285F4"
        />
        <path
          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
          fill="#FBBC05"
        />
        <path
          d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.2154 17.14 5.2704 14.295L1.27539 17.39C3.25539 21.31 7.3104 24 12.0004 24Z"
          fill="#34A853"
        />
      </svg>
    ),
  },
];
export function LoginDialog({
  open,
  onSubmitSuccess,
  showCloseButton = true,
  onOpenChange,
  redirectTo,
}: LoginDialogProps) {
  const t = useTranslations();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;
  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: redirectTo,
      });
      if (result?.error) {
        // Set a form error instead of throwing
        form.setError("root", {
          type: "manual",
          message: t("auth.invalidCredentials"),
        });
        return;
      } else {
        // Login successful
        await onSubmitSuccess?.();
      }
    } catch (error) {
      // Handle any other errors
      form.setError("root", {
        type: "manual",
        message: t("auth.signInError"),
      });
      console.error("Login error:", error);
    }
  }

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    void signIn(provider, {
      redirectTo: redirectTo,
    });
    // We need to listen for the callback response
    // This will be handled by the onSubmitSuccess callback when auth is complete
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={showCloseButton} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("navigation.signIn")}</DialogTitle>
          <DialogDescription>{t("common.signInRequired")}</DialogDescription>
        </DialogHeader>
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "development" && (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log("🚀 ~ errors:", errors);
                })}
                className="space-y-4"
              >
                {formState.errors.root && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {formState.errors?.root?.message}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("auth.emailPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("auth.passwordPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-2">
                  <Button type="submit" isLoading={isSubmitting}>
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("navigation.signIn")}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}

        <div className="flex flex-col gap-2">
          {socialProviders.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="flex-1"
              onClick={() => handleSocialLogin(provider.id)}
              type="button"
            >
              {provider.icon}
              {t(provider.name)}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
