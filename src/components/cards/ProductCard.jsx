"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { ProductCardSkeleton } from "../skeleton/ProductCardSkeleton";

const ProductCard = ({ product, loading }) => {
    if (loading) return <ProductCardSkeleton />;

    if (!product) return null;

    const {
        _id,
        title,
        image,
        price = 0,
        discount = 0,
        ratings = 0,
        reviews = 0,
        sold = 0,
    } = product;

    const discountedPrice =
        discount > 0 ? price - (price * discount) / 100 : price;

    return (
        <div className="card bg-base-100 shadow  transition-all duration-300 rounded-xl overflow-hidden">

            {/* IMAGE */}
            <figure className="relative p-3">
                <Image
                    src={image}
                    alt={title || "Product image"}
                    width={300}
                    height={280}
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="rounded-lg object-cover w-full h-[200px]"
                    priority={false}
                />

                {discount > 0 && (
                    <span className="absolute top-3 left-3 badge badge-error text-white text-xs">
                        -{discount}%
                    </span>
                )}
            </figure>

            {/* CONTENT */}
            <div className="card-body p-4 space-y-2">

                {/* TITLE */}
                <h2 className="card-title text-sm font-semibold line-clamp-2">
                    {title}
                </h2>

                {/* RATING */}
                <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center text-yellow-500">
                        <FaStar />
                        <span className="ml-1 text-gray-700 font-medium">
                            {ratings.toFixed ? ratings.toFixed(1) : ratings}
                        </span>
                    </div>

                    <span className="text-gray-500">
                        ({reviews} reviews)
                    </span>
                </div>

                {/* SOLD */}
                <p className="text-xs text-gray-500">
                    {sold} sold
                </p>

                {/* PRICE */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                        ৳{discountedPrice.toFixed(0)}
                    </span>

                    {discount > 0 && (
                        <span className="text-sm line-through text-gray-400">
                            ৳{price}
                        </span>
                    )}
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col gap-2 pt-2">

                    <button className="btn btn-primary w-full flex items-center gap-2">
                        <FaShoppingCart />
                        Add to Cart
                    </button>

                    <Link
                        href={`/products/${_id}`}
                        className="btn btn-outline border-gray-300 w-full"
                    >
                        View Details
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default ProductCard;