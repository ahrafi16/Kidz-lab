"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";

const CartButton = ({ product }) => {
    const isLogin = false;
    const router = useRouter();
    const path = usePathname();
    const addToCart = () => {
        if (isLogin) {
            alert(product._id);
        } else {
            router.push(`/login?callbackUrl=${path}`);
        }
    }
    return (
        <div className="w-full">
            <button onClick={addToCart} className="btn btn-primary  flex items-center w-full gap-2">
                <FaCartPlus />
                Add to Cart
            </button>
        </div>
    );
};

export default CartButton;