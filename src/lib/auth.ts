import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import {resend} from "@/lib/resend";
import {nextCookies} from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword(data) {
            await resend.emails.send({
                from:"noreply@filmactu.app",
                to: data.user.email,
                subject: "Reset Password",
                text: `Reset password : ${data.url}`,
            }
            )
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!
        }
    },
    plugins: [nextCookies()],
});