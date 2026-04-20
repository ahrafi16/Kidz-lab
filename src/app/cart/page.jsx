import { getCart } from "@/actions/server/cart";
import { FiShoppingCart, FiArrowRight, FiLogIn } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineLock } from "react-icons/md";
import Link from "next/link";
import CartItem from "@/components/cards/Cartitem";

const CartPage = async () => {
    const cart = await getCart();

    // ❌ Not logged in or error
    if (!cart.success) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <FiLogIn className="text-4xl text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Sign in to continue</h2>
                    <p className="text-base-content/50 text-sm mb-6 leading-relaxed">
                        Your cart is waiting for you. Log in to see what you&apos;ve added.
                    </p>
                    <a href="/login" className="btn btn-primary rounded-xl px-8 gap-2">
                        Login Now <FiArrowRight />
                    </a>
                </div>
            </div>
        );
    }

    const { data: items, meta } = cart;

    // 🛒 Empty cart
    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <BsBoxSeam className="text-4xl text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Your cart is empty</h2>
                    <p className="text-base-content/50 text-sm mb-6 leading-relaxed">
                        Looks like you haven&apos;t added anything yet. Start exploring!
                    </p>
                    <a href="/shop" className="btn btn-primary rounded-xl px-8 gap-2">
                        Browse Products <FiArrowRight />
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* ── Header ─────────────────────────────── */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <FiShoppingCart className="text-xl text-primary-content" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight leading-none">My Cart</h1>
                        <p className="text-xs text-base-content/40 mt-0.5">
                            {meta.totalQuantity} item{meta.totalQuantity !== 1 ? "s" : ""} in your bag
                        </p>
                    </div>
                </div>

                {/* ── Layout: Items + Summary ─────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* ── Cart Items ─────────────────────────── */}
                    <div className="lg:col-span-2 space-y-3">
                        {items.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                // onQuantityChange={updateCartQuantity}
                                // onDelete={removeFromCart}
                            />
                        ))}
                    </div>

                    {/* ── Order Summary ──────────────────────── */}
                    <div className="lg:col-span-1">
                        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden sticky top-6">

                            {/* Summary Header */}
                            <div className="bg-primary px-5 py-4">
                                <h2 className="text-primary-content font-bold text-base tracking-wide">
                                    Order Summary
                                </h2>
                            </div>

                            {/* Summary Body */}
                            <div className="px-5 py-5 space-y-3">

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-base-content/60">
                                        <span>Subtotal ({meta.totalQuantity} items)</span>
                                        <span className="font-medium text-base-content">
                                            ৳{meta.totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-base-content/60">
                                        <span>Shipping</span>
                                        <span className="text-success font-medium">Free</span>
                                    </div>
                                </div>

                                {/* Divider + Total */}
                                <div className="border-t border-base-200 pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-base">Total</span>
                                        <span className="text-xl font-extrabold text-primary">
                                            ৳{meta.totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className="btn btn-primary w-full rounded-xl mt-1 gap-2">
                                    Proceed to Checkout
                                    <FiArrowRight />
                                </button>

                                <Link
                                    href="/products"
                                    className="btn btn-ghost btn-sm w-full rounded-xl text-base-content/50 hover:text-primary"
                                >
                                    ← Continue Shopping
                                </Link>
                            </div>

                            {/* Trust badge */}
                            <div className="border-t border-base-200 px-5 py-3 bg-base-200/40">
                                <p className="text-xs text-base-content/40 text-center flex items-center justify-center gap-1">
                                    <MdOutlineLock className="text-sm" /> Secure & encrypted checkout
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CartPage;