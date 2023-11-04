import { useState, useEffect } from 'react'
import { ICategoryMenu } from '../../types/types';

function CategoryMenu({ activeButton, setActiveButton }: ICategoryMenu) {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleClick = (category: string) => {
        setIsActive(true);
        setActiveButton(category);
    };

    useEffect(() => {
        setIsActive(true);
    }, [])

    return (
        <div className="mt-6 flex gap-2 sm:gap-8 w-full overflow-x-scroll no-scrollbar sm:mt-8">
            <button
                className={`py-2 sm:py-2.5 px-6 sm:px-8 text-sm sm:text-base font-medium rounded-full border ${isActive && activeButton === "foods" ? "bg-orange-500 text-white" : "bg-slate-50"}`}
                onClick={() => handleClick("foods")}
            >Foods</button>
            <button
                className={`py-2 sm:py-2.5 px-6 sm:px-8 text-sm sm:text-base font-medium rounded-full border ${isActive && activeButton === "snacks" ? "bg-orange-500 text-white" : "bg-slate-50"}`}
                onClick={() => handleClick("snacks")}
            >Snacks</button>
            <button
                className={`py-2 sm:py-2.5 px-6 sm:px-8 text-sm sm:text-base font-medium rounded-full border ${isActive && activeButton === "desserts" ? "bg-orange-500 text-white" : "bg-slate-50"}`}
                onClick={() => handleClick("desserts")}
            >Desserts</button>
            <button
                className={`py-2 sm:py-2.5 px-6 sm:px-8 text-sm sm:text-base font-medium rounded-full border ${isActive && activeButton === "drinks" ? "bg-orange-500 text-white" : "bg-slate-50"}`}
                onClick={() => handleClick("drinks")}
            >Drinks</button>
        </div>
    )
}

export default CategoryMenu