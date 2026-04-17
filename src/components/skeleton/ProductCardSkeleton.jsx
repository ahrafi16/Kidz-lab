const ProductCardSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-md rounded-xl">

            {/* Image Skeleton */}
            <div className="p-3">
                <div className="skeleton h-45 w-full rounded-lg"></div>
            </div>

            <div className="card-body p-4 space-y-3">

                {/* Title */}
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>

                {/* Rating */}
                <div className="flex gap-2">
                    <div className="skeleton h-4 w-12"></div>
                    <div className="skeleton h-4 w-16"></div>
                </div>

                {/* Sold */}
                <div className="skeleton h-3 w-20"></div>

                {/* Price */}
                <div className="flex gap-2">
                    <div className="skeleton h-5 w-16"></div>
                    <div className="skeleton h-5 w-12"></div>
                </div>

                {/* Button */}
                <div className="skeleton h-10 w-full rounded-md"></div>
            </div>
        </div>
    );
};

export { ProductCardSkeleton };