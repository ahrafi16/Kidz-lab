"use client";

import { useState } from "react";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";
import SocialButton from "@/components/auth/SocialButton";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="card w-full max-w-md bg-base-100 shadow p-6">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create an account
                </h2>

                <RegisterForm></RegisterForm>

                {/* Divider */}
                <div className="divider">OR</div>

                {/* Google Register */}
                <SocialButton></SocialButton>

                {/* Login Link */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}