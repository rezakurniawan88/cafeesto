import { useState, useEffect } from "react";
import CategoryMenu from "../../components/homepage/CategoryMenu";
import { useFetchMenus } from "../../hooks/menus/useFetchMenus";
import { IDataMenu } from "../../types/types";
import useCartStore from "../../stores/cartStore";
import toast from "react-hot-toast";
import useStore from "../../stores/store";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import FoodImage from "../../assets/image/food.png";
import Sidebar from "../../components/homepage/Sidebar";

function Homepage() {
    const { data: dataMenu, isLoading, isSuccess } = useFetchMenus();
    const [menus, setMenus] = useState<IDataMenu[]>([]);
    const [activeButton, setActiveButton] = useState<string>("foods");
    const [searchParams, setSearchParams] = useState<string>("");
    const { carts, addToCart } = useCartStore((state) => state);
    const { handlerSidebar } = useStore((state) => state);

    useEffect(() => {
        if (isSuccess) {
            const filteredMenus = dataMenu?.filter((menu: IDataMenu) => {
                const menuTitle = menu.name.toLowerCase();
                return (
                    menu.category.toLowerCase() === activeButton &&
                    (menuTitle.includes(searchParams.toLowerCase()) || searchParams === "")
                );
            });
            setMenus(filteredMenus);
        }
    }, [activeButton, dataMenu, searchParams])

    const addItemToCart = (id: number) => {
        const selectedItem = menus.find((menu) => menu.id === id);

        if (carts.some((menu) => menu.id === id)) {
            toast.error("Menu already in the cart");
            return;
        }

        const itemWithQty = { ...selectedItem, menuQty: 1 };

        addToCart(itemWithQty);
        toast.success("Menu successfully added");
    }

    return (
        <>
            <div className="p-5 mx-3 sm:mx-5 sm:mr-80">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-orange-500 text-xl font-bold sm:text-2xl">Cafeesto.</h1>
                    <div className="w-3/4 hidden md:block">
                        <form>
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" value={searchParams} onChange={(e) => setSearchParams(e.target.value)} className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="Search Foods, Drinks ..." required />
                                <button type="submit" className="text-white absolute right-2.5 bottom-2 bg-orange-500 hover:bg-orange-600 focus:ring-1 focus:outline-none focus:ring-orange-300 font-medium rounded-md text-sm px-4 py-1.5">Search</button>
                            </div>
                        </form>
                    </div>

                    <button onClick={handlerSidebar} className="block md:hidden p-1.5 border rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                    </button>
                </div>

                <div className="relative flex items-center bg-orange-500 rounded-2xl mt-4 h-60">
                    <div className="absolute w-[40%] ml-10">
                        <h1 className="text-2xl font-bold text-white">Find your favorite menu here, only at cafeesto.</h1>
                        <a href="#menu-list">
                            <button className="mt-4 flex gap-4 justify-between items-center font-semibold text-sm text-white px-6 py-2 border-2 border-gray-200 rounded-full hover:bg-orange-400">
                                See all
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-semibold">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                            </button>
                        </a>
                    </div>
                    <img src={FoodImage} alt="banner" className="absolute right-4 top-2 h-full" />
                </div>

                <CategoryMenu activeButton={activeButton} setActiveButton={setActiveButton} />

                <div className="mt-6 sm:mt-8">
                    <h1 className="font-medium text-lg sm:text-xl">{activeButton === "foods" ? "Foods 🥘" : activeButton === "snacks" ? "Snacks 🥖" : activeButton === "desserts" ? "Desserts 🎂" : activeButton === "drinks" ? "Drinks ☕" : ""}</h1>
                </div>

                <div id="menu-list" className="flex gap-8 flex-wrap mt-6 py-2 w-full sm:mt-8">
                    {menus.length > 0 ? (
                        menus.map((menu) => (
                            <div key={menu.id} className="bg-white w-full rounded-xl p-6 drop-shadow-md sm:w-[30%]">
                                <div className="flex gap-4">
                                    <div className="w-[35%]">
                                        <img src={`${import.meta.env.VITE_BASE_URL}${menu.image}`} alt={menu.name} className="w-20 h-20" />
                                    </div>
                                    <div className="w-[65%]">
                                        <h1 className="mb-1.5">{menu.name}</h1>
                                        <p className="text-xs text-slate-400">{menu.description}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <h1 className=" w-[35%] text-orange-500 font-medium">Rp. {menu.price.toLocaleString()}</h1>
                                    <button onClick={() => addItemToCart(menu.id)} className="w-[62%] bg-orange-500 text-white text-sm py-2 px-6 rounded-lg hover:bg-orange-600">Add to cart</button>
                                </div>
                            </div>
                        ))
                    ) :
                        isSuccess && (
                            <h1>Menu empty</h1>
                        )
                    }

                    {isLoading && <CardSkeleton />}

                </div>

            </div>
            <Sidebar />
        </>
    )
}

export default Homepage