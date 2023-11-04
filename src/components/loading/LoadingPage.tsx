function LoadingPage() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-white flex flex-col gap-4 justify-center items-center">
            <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-400"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-400"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-400"></div>
                <div className="w-4 h-4 rounded-full animate-pulse dark:bg-orange-400"></div>
            </div>
        </div>
    )
}

export default LoadingPage