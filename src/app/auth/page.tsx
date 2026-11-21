// src/app/account/page.tsx
import { getUser } from "@/lib/auth-session";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import React from "react";

export default async function Auth() {
    const user = await getUser();

    if (!user) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Not Authenticated</CardTitle>
                    <CardDescription>You are not logged in.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Account</CardTitle>
                <CardDescription>Manage your account settings here.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div>
                        <h2 className="text-lg font-semibold">User Information</h2>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>ID:</strong> {user.id}</p>
                        <img src={user.image ?? ""} alt={""}/>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}