"user client";

import { postUser } from "@/actions/server/auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

const RegisterForm = () => {
    const router = useRouter();
    const params = useSearchParams();
    const callbackUrl = params.get("callbackUrl") || "/";
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await postUser(form);
        if (result.acknowledged) {

            // router.push("/login");
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
                callbackUrl: callbackUrl
            });
            if (result.ok) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Registration Successfull",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push(callbackUrl);
            }
        }
        setForm({ name: "", email: "", password: "" });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
                <label className="label">
                    <span className="label-text">Your Name</span>
                </label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    required
                />
            </div>

            {/* Email */}
            <div>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={form.email}
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
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
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

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-full">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;