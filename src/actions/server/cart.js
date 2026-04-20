"use server";

import { authOptions } from "@/lib/authOptions";
import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const handleCart = async ({ product, inc = true }) => {
    const cartCollection = await dbConnect(collections.CART);
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


// get cart
export const getCart = async () => {
    const cartCollection = await dbConnect(collections.CART);
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        // ❌ Not logged in
        if (!user) {
            return { success: false, message: "Unauthorized" };
        }

        // ✅ Get cart items
        const cartItems = await cartCollection
            .find({ email: user.email })
            .toArray();

        // ✅ Optional: calculate totals
        const totalQuantity = cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const totalPrice = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        return {
            success: true,
            data: cartItems,
            meta: {
                totalItems: cartItems.length,
                totalQuantity,
                totalPrice,
            },
        };
    } catch (error) {
        console.error("Get Cart Error:", error);
        return { success: false, message: "Failed to fetch cart" };
    }
};

// delete items from cart
export const deleteItemFromCart = async (id) => {
    const cartCollection = await dbConnect(collections.CART);
    try {
        const session = await getServerSession(authOptions);
        const user = session?.user;

        if (!user) {
            return { success: false, message: "Unauthorized" };
        }

        const result = await cartCollection.deleteOne({
            _id: new ObjectId(id),
            email: user.email, // 🔒 ensures users can only delete their own items
        });

        if (result.deletedCount === 0) {
            return { success: false, message: "Item not found or already removed" };
        }

        revalidatePath("/cart"); // 🔄 refresh the cart page

        return { success: true, message: "Item removed from cart" };
    } catch (error) {
        console.error("Delete Cart Item Error:", error);
        return { success: false, message: "Failed to delete item" };
    }
};