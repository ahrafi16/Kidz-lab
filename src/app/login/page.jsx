"use client";

import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import SocialButton from "@/components/auth/SocialButton";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const params = useSearchParams();
    const callback = params.get("callbackUrl") || "/";

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login to your account
                </h2>

                <LoginForm></LoginForm>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Google Login */}
                <SocialButton></SocialButton>

                {/* Register Link */}
                <p className="text-center mt-4 text-sm">
                    Don’t have an account?{" "}
                    <Link href={`/register?callbackUrl=${callback}`} className="text-primary font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}