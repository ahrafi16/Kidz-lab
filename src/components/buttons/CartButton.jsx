"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaCartPlus } from "react-icons/fa";

const CartButton = ({ product }) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const path = usePathname();

    const addToCart = () => {
        if (status === "authenticated") {
            // add to cart logic here
            alert(`Added: ${product._id}`);
        } else {
            // Not logged in → redirect to login
            router.push(`/login?callbackUrl=${path}`);
        }
    };

    return (
        <div className="w-full">
            <button
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