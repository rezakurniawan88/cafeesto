import { useEffect } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import { useForm } from "react-hook-form";
import { IDataMenu } from "../../../types/types";
import { useUpdateMenu } from "../../../hooks/menus/useUpdateMenu";
import { useFetchMenuById } from "../../../hooks/menus/useFetchMenuById";

function EditMenu() {
    const { handleSubmit, register, setValue, formState: { errors } } = useForm<IDataMenu>();
    const { mutate: updateMenu, isLoading } = useUpdateMenu();
    const { data: dataMenu } = useFetchMenuById();

    const onUpdate = (data: IDataMenu) => {
        const hasError = Object.keys(errors).length > 0;
        if (hasError) return null;
        updateMenu(data);
    }

    useEffect(() => {
        setValue("name", dataMenu?.name || '');
        setValue("description", dataMenu?.description || '');
        setValue("category", dataMenu?.category || '');
        setValue("price", dataMenu?.price || 0);
        setValue("stock", dataMenu?.stock || 0);
    }, [setValue, dataMenu])

    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <h1 className="text-3xl font-bold mb-6">Edit Menu</h1>

                    <form onSubmit={handleSubmit(onUpdate)}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Menu name</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert menu name" required {...register('name', { required: "Name is required" })} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <input type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert description" required {...register('description', { required: "Description is required" })} />
                            {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required {...register('category', { required: true })}>
                                <option value="">Select...</option>
                                <option value="Foods">Foods</option>
                                <option value="Snacks">Snacks</option>
                                <option value="Desserts">Desserts</option>
                                <option value="Drinks">Drinks</option>
                            </select>
                            {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert Price" required {...register('price', { required: "Price is required" })} />
                            {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input type="number" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert Stock" required {...register('stock', { required: "Stock is required" })} />
                            {errors.stock && <span className="text-red-500 text-xs">{errors.stock.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <img src={`${import.meta.env.VITE_BASE_URL}${dataMenu?.image}`} alt={dataMenu?.name} width={100} height={100} className="mb-4" />
                            <input type="file" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" {...register('image')} />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? "Saving ..." : "Save"}</button>
                    </form>
                </div>


            </div>
        </>
    )
}

export default EditMenu