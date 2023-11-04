function CardSkeleton() {
    return (
        <div className="flex gap-8 flex-wrap w-full">
            <div className="bg-white w-full rounded-xl p-6 drop-shadow-md sm:w-[30%] animate-pulse">
                <div className="flex gap-4">
                    <div className="w-[35%]">
                        <div className="w-20 h-20 bg-gray-200 rounded" />
                    </div>
                    <div className="w-[65%]">
                        <div className="w-12 h-4 mb-1.5 bg-gray-200 rounded" />
                        <div className="w-24 h-4 mb-1.5 bg-gray-200 rounded" />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="w-20 h-6 bg-gray-200 rounded" />
                    <div className="w-[62%] h-8 bg-gray-200 rounded" />
                </div>
            </div>
            <div className="bg-white w-full rounded-xl p-6 drop-shadow-md sm:w-[30%] animate-pulse">
                <div className="flex gap-4">
                    <div className="w-[35%]">
                        <div className="w-20 h-20 bg-gray-200 rounded" />
                    </div>
                    <div className="w-[65%]">
                        <div className="w-12 h-4 mb-1.5 bg-gray-200 rounded" />
                        <div className="w-24 h-4 mb-1.5 bg-gray-200 rounded" />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="w-20 h-6 bg-gray-200 rounded" />
                    <div className="w-[62%] h-8 bg-gray-200 rounded" />
                </div>
            </div>
            <div className="bg-white w-full rounded-xl p-6 drop-shadow-md sm:w-[30%] animate-pulse">
                <div className="flex gap-4">
                    <div className="w-[35%]">
                        <div className="w-20 h-20 bg-gray-200 rounded" />
                    </div>
                    <div className="w-[65%]">
                        <div className="w-12 h-4 mb-1.5 bg-gray-200 rounded" />
                        <div className="w-24 h-4 mb-1.5 bg-gray-200 rounded" />
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <div className="w-20 h-6 bg-gray-200 rounded" />
                    <div className="w-[62%] h-8 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    )
}

export default CardSkeleton