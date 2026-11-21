'use client';

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ForgetPassword() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ForgetPasswordContent />
        </Suspense>
    );
}

function ForgetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    if (!token) {
        return (
            <div>
                <h1>Reset Password</h1>
                <p>Enter your email address and we will send you a link to reset password</p>
                <form
                    action={async (formData) => {
                        const email = formData.get("email");
                        await authClient.forgetPassword({
                                email: email as string,
                                redirectTo: "/auth/reset-password",
                            },
                            {
                                onError: (ctx) => {
                                    toast.error(ctx.error.message);
                                },
                                onSuccess: () => {
                                    toast.success("Reset password link sent to your email");
                                }
                            });
                    }}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        autoComplete={"email"}
                        required
                    />
                    <button type={"submit"}>Send Reset Link</button>
                </form>
            </div>
        );
    }
    return (
        <div>
            <h1>Reset Password</h1>
            <p>Enter your email address and we will send you a link to reset password</p>
            <form
                action={async (formData) => {
                    const password = formData.get("password");
                    await authClient.resetPassword({
                            newPassword: password as string,
                            token: token as string,
                        },
                        {
                            onError: (ctx) => {
                                toast.error(ctx.error.message);
                            },
                            onSuccess: () => {
                                router.push("/auth/signin");
                            }
                        });
                }}>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="new password"
                    autoComplete={"password"}
                    required
                />
                <button type={"submit"}>Reset Password</button>
            </form>
        </div>
    );
}