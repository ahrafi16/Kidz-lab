"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaCartPlus } from "react-icons/fa";
import { handleCart } from "@/actions/server/cart";
import Swal from "sweetalert2";
import { useState } from "react";

const CartButton = ({ product }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const path = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    const addToCart = async () => {
        setIsLoading(true);
        if (status === "authenticated") {
            const result = await handleCart({ product, inc: true });
            if (result.success) {
                Swal.fire("Added to Cart", product?.title, "success");
            } else {
                Swal.fire("Ooppss", "Something went wrong", "error");
            }
            setIsLoading(false);
        } else {
            // Not logged in → redirect to login
            router.push(`/login?callbackUrl=${path}`);
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <button
                disabled={session.status == "loading" || isLoading}
                onClick={addToCart}
                className="btn btn-primary flex items-center w-full gap-2"
            >
                <FaCartPlus />
                Add to Cart
            </button>
        </div>
    );
};

export default CartButton;