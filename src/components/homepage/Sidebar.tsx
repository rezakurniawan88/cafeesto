import { Link } from "react-router-dom";
import useCartStore from "../../stores/cartStore";
import { useCartPrice } from "../../hooks/orders/useCartPrice";
import useStore from "../../stores/store";
import useDeleteItem from "../../utils/useDeleteItemCart";

function Sidebar() {
    const { carts, handleQuantity } = useCartStore((state) => state);
    const deleteItem = useDeleteItem();
    const { sidebarOpen, handlerSidebar } = useStore((state) => state);
    const { subTotal, totalPrice } = useCartPrice(carts);

    return (
        <aside className={`fixed top-0 right-0 z-40 w-full h-screen transition-transform sm:translate-x-0 sm:w-80 ${sidebarOpen ? "block" : "hidden sm:block"}`}>
            <div className="bg-white h-full relative py-7 px-10 sm:px-7">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold">My Order</h1>
                    <button onClick={handlerSidebar} className="p-1.5 border rounded-lg block sm:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>


                {/* Card */}
                <div className="card flex flex-col gap-4 mt-8 h-1/2 overflow-y-scroll no-scrollbar cursor-pointer">
                    {carts.map((cart) => (
                        <div key={cart.id} className="flex gap-3 items-center border rounded-xl p-4">
                            <div className="flex justify-center items-center w-16 h-16 overflow-hidden">
                                <img src={`${import.meta.env.VITE_BASE_URL}${cart.image}`} alt={cart.name} className="" />
                            </div>
                            <div className="w-2/6">
                                <h1 className="text-sm mb-2">{cart.name}</h1>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleQuantity(cart.id, -1)} className="flex justify-center items-center border w-5 h-5 rounded-full hover:bg-slate-200">-</button>
                                    <h1 className="text-sm">{cart.menuQty}</h1>
                                    <button onClick={() => handleQuantity(cart.id, 1)} className="flex justify-center items-center border w-5 h-5 rounded-full hover:bg-slate-200">+</button>
                                </div>
                            </div>
                            <div className="w-2/6">
                                <h1 className="text-sm mb-2 font-medium w-full">
                                    Rp. {cart.price.toLocaleString("id-ID", { minimumFractionDigits: 0 })}
                                </h1>
                                <button onClick={() => deleteItem(cart.id)} className="hover:bg-gray-100 rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-[5.5rem] left-0 w-full flex justify-center">
                    <div className="border w-4/5 p-4 rounded-xl">
                        <div className="flex justify-between">
                            <h1 className="text-sm text-zinc-500 font-medium">Sub Total</h1>
                            <h1 className="text-sm font-medium">Rp. {subTotal.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</h1>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <h1 className="text-sm text-zinc-500 font-medium">Total</h1>
                            <h1 className="text-sm font-medium text-orange-500">Rp. {totalPrice.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</h1>
                        </div>
                    </div>
                </div>


                <div className="absolute bottom-6 left-0 w-full flex justify-center">
                    <Link to="/checkout" className="w-4/5">
                        <button className="flex justify-between items-center px-6 w-full bg-orange-500 text-sm font-semibold text-white py-3 rounded-xl hover:bg-orange-600">
                            Check out
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar