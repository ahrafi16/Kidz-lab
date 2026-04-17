export default function Loading() {
    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">

            {/* Image Skeleton */}
            <div className="w-full h-105 bg-gray-200 rounded-lg"></div>

            {/* Content Skeleton */}
            <div className="space-y-4">

                {/* Title */}
                <div className="h-8 bg-gray-200 w-3/4 rounded"></div>

                {/* Rating */}
                <div className="flex gap-2 items-center">
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="w-5 h-5 bg-gray-200 rounded"
                            ></div>
                        ))}
                    </div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                </div>

                {/* Price */}
                <div className="h-6 w-32 bg-gray-200 rounded"></div>

                {/* Button */}
                <div className="h-10 w-40 bg-gray-200 rounded"></div>

                {/* Description */}
                <div className="space-y-2 mt-6">
                    <div className="h-4 bg-gray-200 w-full rounded"></div>
                    <div className="h-4 bg-gray-200 w-11/12 rounded"></div>
                    <div className="h-4 bg-gray-200 w-10/12 rounded"></div>
                </div>

                {/* Features */}
                <div className="mt-6 space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded"></div>

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-4 w-3/4 bg-gray-200 rounded"
                        ></div>
                    ))}
                </div>

            </div>

        </div>
    );
}