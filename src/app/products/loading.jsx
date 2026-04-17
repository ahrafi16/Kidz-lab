import { ProductCardSkeleton } from "@/components/skeleton/ProductCardSkeleton";

const Loading = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[...Array(9)].map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default Loading;