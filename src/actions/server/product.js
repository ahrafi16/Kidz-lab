"use server"

import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export const getProducts = async () => {
    const products = await dbConnect("products").find().toArray();

    return products.map((p) => ({
        ...p,
        _id: p._id.toString(), // 🔥 THIS IS REQUIRED
    }));
};
export const getSingleProduct = async (id) => {
    if (!id || typeof id !== "string") {
        return {};
    }

    try {
        const product = await dbConnect("products").findOne({
            _id: new ObjectId(id),
        });

        if (!product) return {};

        return {
            ...product,
            _id: product._id.toString(),
        };
    } catch (err) {
        return {};
    }
};