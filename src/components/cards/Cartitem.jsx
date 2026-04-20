"use client";

import Image from "next/image";
import { FiTag, FiLayers, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { useState, useTransition } from "react";
import Swal from "sweetalert2";
import { deleteItemFromCart } from "@/actions/server/cart";

const CartItem = ({ item, onQuantityChange, onDelete }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [isPending, startTransition] = useTransition();

    const handleIncrease = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        startTransition(async () => {
            await onQuantityChange?.(item._id, newQty);
        });
    };

    const handleDecrease = () => {
        if (quantity <= 1) return;
        const newQty = quantity - 1;
        setQuantity(newQty);
        startTransition(async () => {
            await onQuantityChange?.(item._id, newQty);
        });
    };

    const handleDelete = async () => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            startTransition(async () => {
                const res = await deleteItemFromCart(item._id); // ✅ direct call
                if (res?.success) {
                    Swal.fire({ title: "Deleted!", text: "Your item has been deleted.", icon: "success" });
                } else {
                    Swal.fire({ title: "Oops!", text: "Something went wrong!", icon: "error" });
                }
            });
        }
    };

    return (
        <div
            className={`group bg-base-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-base-200 
                hover:border-primary/30 hover:shadow-md transition-all duration-300
                ${isPending ? "opacity-60 pointer-events-none" : ""}`}
        >
            {/* ── Product Image ─────────────────── */}
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-base-200">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* ── Info ──────────────────────────── */}
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sm leading-snug line-clamp-1 mb-1">
                    {item.title}
                </h2>

                <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="inline-flex items-center gap-1 text-xs text-base-content/50">
                        <FiTag /> ৳{item.price.toLocaleString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-base-content/20" />
                    <span className="inline-flex items-center gap-1 text-xs text-base-content/50">
                        <FiLayers /> Per unit
                    </span>
                </div>

                {/* ── Quantity Controls ─────────── */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleDecrease}
                        disabled={quantity <= 1 || isPending}
                        className="w-7 h-7 rounded-lg border border-base-300 flex items-center justify-center 
                            hover:border-primary hover:text-primary hover:bg-primary/5
                            disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                        aria-label="Decrease quantity"
                    >
                        <FiMinus className="text-xs" />
                    </button>

                    <span className="min-w-[28px] text-center text-sm font-bold tabular-nums">
                        {quantity}
                    </span>

                    <button
                        onClick={handleIncrease}
                        disabled={isPending}
                        className="w-7 h-7 rounded-lg border border-base-300 flex items-center justify-center 
                            hover:border-primary hover:text-primary hover:bg-primary/5
                            disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
                        aria-label="Increase quantity"
                    >
                        <FiPlus className="text-xs" />
                    </button>
                </div>
            </div>

            {/* ── Right Side: Subtotal + Delete ─ */}
            <div className="shrink-0 flex flex-col items-end gap-3">
                {/* Subtotal */}
                <div className="text-right">
                    <p className="text-xs text-base-content/40 mb-0.5">Subtotal</p>
                    <p className="font-bold text-primary text-base">
                        ৳{(item.price * quantity).toLocaleString()}
                    </p>
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-base-content/30
                        hover:bg-error/10 hover:text-error border border-transparent hover:border-error/20
                        disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    aria-label="Remove item"
                >
                    <FiTrash2 className="text-sm" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;