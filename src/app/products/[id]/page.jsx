import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import { FaCartPlus, FaStar } from "react-icons/fa";

export default async function ProductDetails({ params }) {
    const { id } = await params;

    const product = await getSingleProduct(id);

    if (!product?._id) {
        return <div className="text-center p-10">Product not found</div>;
    }

    const {
        title,
        image,
        price = 0,
        discount = 0,
        ratings = 0,
        reviews = 0,
        sold = 0,
        description,
        info = [],
        qna = []
    } = product;

    const discountPrice =
        discount > 0 ? price - (price * discount) / 100 : price;

    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
                <Image
                    width={600}
                    height={420}
                    src={image}
                    alt={title}
                    className="w-full h-105 object-cover rounded-lg"
                />
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-3">{title}</h1>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                                key={i}
                                className={
                                    i < Math.round(ratings)
                                        ? ""
                                        : "opacity-30"
                                }
                            />
                        ))}
                    </div>

                    <span className="text-sm text-gray-600">
                        {ratings} ({reviews} reviews) · {sold} sold
                    </span>
                </div>

                <div className="mb-4 text-xl font-bold">
                    ৳{discountPrice.toFixed(0)}
                    {discount > 0 && (
                        <span className="line-through text-gray-400 ml-3 text-base">
                            ৳{price}
                        </span>
                    )}
                </div>

                <button className="btn btn-primary btn-wide flex items-center gap-2">
                    <FaCartPlus />
                    Add to Cart
                </button>

                <div className="mt-8 space-y-4 text-gray-700 leading-relaxed">
                    {description?.split("\n\n").map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>

                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Key Features</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {info.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
                {/* Q&A SECTION */}
                {qna.length > 0 && (
                    <div className="mt-8">
                        <h3 className="font-semibold mb-3">Q & A</h3>

                        <div className="space-y-4">
                            {qna.map((item, i) => (
                                <div key={i} className="border rounded-lg p-4 bg-base-100">
                                    <p className="font-medium text-gray-800">
                                        Q: {item.question}
                                    </p>
                                    <p className="mt-2 text-gray-600">
                                        A: {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}