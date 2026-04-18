"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form onSubmit={""} className="space-y-4">
            {/* Email */}
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    name="email"
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