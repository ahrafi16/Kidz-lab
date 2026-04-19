"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            // redirect: false,
            callbackUrl: params.get("callbackUrl") || "/"
        });

        if (result?.ok) {
            alert("Login successful");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label className="label">
                    <span className="label-text">Password</span>
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="input input-bordered w-full pr-10"
                        required
                    />

                    {/* Eye Icon */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
            </div>

            {/* Login Button */}
            <button type="submit" className="btn btn-primary w-full">
                Login
            </button>
        </form>
    );
};

export default LoginForm;