"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const cartCollection = dbConnect(collections.CART);

export const handleCart = async ({ product, inc = true }) => {
    const { user } = await getServerSession(authOptions) || {};
    if (!user) return { success: false };

    // get cart item
    const query = { email: user?.email, productId: product?._id };
    const isAdded = await cartCollection.findOne(query);
    if
        (isAdded) {
        const updatedData = {
            $inc: {
                quantity: inc ? 1 : -1,
            },
        };
        const result = await cartCollection.updateOne(query, updatedData);
        return { success: Boolean(result.modifiedCount) };
    } else {
        const newData = {
            productId: product?._id,
            email: user?.email,
            title: product?.title,
            quantity: 1,
            image: product.image,
            price: product.discount > 0 ? product.price - (product.price * product.discount) / 100 : product.price,
            username: user?.name
        };
        const result = await cartCollection.insertOne(newData);
        return { success: result.acknowledged };
    }
}