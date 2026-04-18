"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import SocialButton from "@/components/auth/SocialButton";

export default function LoginPage() {
   

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
                    <Link href="/register" className="text-primary font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}