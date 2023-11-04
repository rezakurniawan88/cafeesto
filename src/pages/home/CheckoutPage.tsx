import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useStore from "../../stores/store";
import useCartStore from "../../stores/cartStore";
import { useCartPrice } from "../../hooks/orders/useCartPrice";
import { useFetchTables } from "../../hooks/tables/useFetchTables";
import { IDataOrder, ITableProps } from "../../types/types";
import { useCreateOrder } from "../../hooks/orders/useCreateOrder";
import useDeleteItem from "../../utils/useDeleteItemCart";
import SuccessOrderModal from "../../components/modal/SuccessOrderModal";

function CheckoutPage() {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<IDataOrder>();
    const { data: dataTables } = useFetchTables();
    const { tableModalOpen, handlerTableModal } = useStore((state) => state);
    const { mutate: submitOrder, isLoading } = useCreateOrder();
    const { carts } = useCartStore((state) => state);
    const deleteItem = useDeleteItem();
    const { subTotal, totalPrice } = useCartPrice(carts);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [activeTable, setActiveTable] = useState<number>(0);

    const handleClickTable = (number: number, status: number) => {
        if (status === 0) {
            toast.error("Table cannot be selected")
            setIsActive(false);
            setActiveTable(0);
        } else {
            setIsActive(true);
            setActiveTable(number);
        }
    };

    const placeOrder = (data: IDataOrder) => {
        const hasError = Object.keys(errors).length > 0;
        if (hasError) return null;
        submitOrder(data);
    };

    useEffect(() => {
        setIsActive(true);
        setValue("table_number", activeTable);
    }, [activeTable, setValue])

    return (
        <div className="fixed flex w-full h-screen">
            <div className="flex flex-col justify-center w-3/4 h-full px-14">
                <h1 className="text-2xl font-bold mb-4">Detail Orders.</h1>
                <div className="relative h-[24rem] bg-gray-50 overflow-y-scroll no-scrollbar">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Menu
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Price
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {carts.map((cart) => (
                                <tr key={cart.id} className="bg-gray-50 border-b border-opacity-20">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-4">
                                        <img src={`${import.meta.env.VITE_BASE_URL}${cart.image}`} alt={cart.name} className="w-20 h-20" />
                                        <h1>{cart.name}</h1>
                                    </th>
                                    <td className="px-6 py-4">
                                        x {cart.menuQty}
                                    </td>
                                    <td className="px-6 py-4">
                                        Rp. {cart.price.toLocaleString("id-ID", { minimumFractionDigits: 0 })}
                                    </td>
                                    <td className="px-1">
                                        <button onClick={() => deleteItem(cart.id)} className="p-1 rounded-lg hover:bg-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-black hover:text-red-500">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center w-full h-16 pr-8 pl-4 bg-gray-50">
                    <Link to="/">
                        <button className="flex items-center justify-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" /></svg>
                            <h1 className="text-sm font-semibold text-orange-500">Back to menu</h1>
                        </button>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-sm"><span className="font-medium">Sub Total :</span> Rp. {subTotal.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</h1>
                        <h1><span className="font-bold">{`Total (+Tax 10%) :`}</span> Rp. {totalPrice.toLocaleString("id-ID", { minimumFractionDigits: 0 })}</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center w-2/6 h-full">
                <div className="relative bg-gray-100 h-[30.5rem] mr-10 rounded-md">
                    <h1 className="text-xl font-bold px-7 py-5">Reservation Form</h1>

                    <form onSubmit={handleSubmit(placeOrder)} className="space-y-4 md:space-y-6">
                        <div className="mx-7">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input type="text" id="name" className="bg-gray-100 border border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-none block w-full p-2.5" placeholder="Customer name" required {...register('name', { required: true, maxLength: { value: 70, message: "The maximum character of name is 70" } })} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>
                        <div className="mx-7">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                            <input type="date" id="date" className="bg-gray-100 border border-orange-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 focus:outline-none block w-full p-2.5 cursor-pointer" required {...register('date', { required: true })} />
                        </div>
                        <div className="mx-7">
                            <p className="mb-2 text-sm font-medium text-gray-900">Options</p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        {...register("options")}
                                        type="radio"
                                        value="dinein"
                                        id="field-dinein"
                                        className="w-4 h-4 cursor-pointer"
                                        defaultChecked={true}
                                    />
                                    <label htmlFor="field-dinein" className="text-sm font-medium text-gray-900">Dine In</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        {...register("options")}
                                        type="radio"
                                        value="takeaway"
                                        id="field-takeaway"
                                        className="w-4 h-4 cursor-pointer"
                                    />
                                    <label htmlFor="field-takeaway" className="text-sm font-medium text-gray-900">Take Away</label>
                                </div>
                            </div>
                        </div>
                        <div className="mx-7">
                            <label htmlFor="table_number" className="block mb-2 text-sm font-medium text-gray-900">Table</label>
                            <div className="flex justify-between items-center">
                                <h1>Table {activeTable}</h1>
                                <button onClick={handlerTableModal} type="button" className="bg-orange-500 p-2.5 text-xs text-white rounded-md hover:bg-orange-600">Choose a table</button>
                            </div>
                            <input type="hidden" id="table_number" value={activeTable} {...register('table_number', { required: true })} />
                        </div>
                        <div className="absolute bottom-5 flex justify-center w-full">
                            <button type="submit" className="w-[85%] bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600">{isLoading ? "Processed..." : "Order Now"}</button>
                        </div>
                    </form>

                </div>
            </div>


            <div className={`${tableModalOpen ? "absolute top-0 left-0 w-full h-full flex justify-center items-center bg-white/20 backdrop-blur-lg" : "hidden"}`}>
                <div className="w-4/5 h-3/4 bg-white p-5 border border-slate-200 drop-shadow-md shadow-slate-200 rounded-xl overflow-hidden">
                    <div className="flex justify-between pl-4">
                        <div className="flex gap-4">
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 bg-orange-500" />
                                <h1 className="text-sm">Selected</h1>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 bg-gray-300" />
                                <h1 className="text-sm">Available</h1>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-4 h-4 bg-red-500" />
                                <h1 className="text-sm">Reserved</h1>
                            </div>
                        </div>
                        <button onClick={handlerTableModal} className="p-1 rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative flex flex-col h-full flex-wrap gap-16 mt-8 p-4 overflow-hidden">
                        {dataTables?.data?.tables?.map((table: ITableProps) => (
                            <div key={table.id} className="flex items-center gap-1">
                                <div className={`w-9 h-8 rounded-l-full ${isActive && activeTable === table.table_number ? "bg-orange-500" : table.status ? "bg-gray-300" : "bg-red-500"}`} />
                                <div onClick={() => handleClickTable(table.table_number, table.status)} className={`w-16 h-16 rounded-full flex justify-center items-center text-white cursor-pointer ${isActive && activeTable === table.table_number ? "bg-orange-500" : table.status ? "bg-gray-300" : "bg-red-500"}`}>{table.table_number}</div>
                                <div className={`w-9 h-8 rounded-r-full ${isActive && activeTable === table.table_number ? "bg-orange-500" : table.status ? "bg-gray-300" : "bg-red-500"}`} />
                            </div>
                        ))}
                        <div className="absolute bottom-24 right-0 w-16 h-10 flex justify-center items-center border-x-2 border-gray-700 -rotate-90 px-10">
                            <h1 className="font-semibold text-sm">Entrance</h1>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessOrderModal />
        </div>
    )
}

export default CheckoutPage