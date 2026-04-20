"use server"

import { dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export const getProducts = async () => {
    const collection = await dbConnect("products"); // 👈
    const products = await collection.find().toArray();

    return products.map((p) => ({
        ...p,
        _id: p._id.toString(),
    }));
};

export const getSingleProduct = async (id) => {
    if (!id || typeof id !== "string") {
        return {};
    }

    try {
        const collection = await dbConnect("products"); // 👈
        const product = await collection.findOne({
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