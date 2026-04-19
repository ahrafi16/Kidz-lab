"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const SocialButton = () => {
    const params = useSearchParams();
    const handleSignIn = async () => {
        const result = await signIn("google", {
            redirect: "false",
            callbackUrl: params.get("callbackUrl") || "/"
        });
        if (result.ok) {
            alert("Success");
        } else {
            alert("Error");
        }
    }
    return (
        <button
            onClick={handleSignIn}
            className="btn w-full flex items-center gap-2"
        >
            <FaGoogle />
            Continue with Google
        </button>
    );
};

export default SocialButton;