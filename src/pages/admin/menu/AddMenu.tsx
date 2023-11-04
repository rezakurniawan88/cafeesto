import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import { useForm } from "react-hook-form";
import { IDataMenu } from "../../../types/types";
import { useAddMenu } from "../../../hooks/menus/useAddMenu";

function AddMenu() {
    const { handleSubmit, register, formState: { errors } } = useForm<IDataMenu>();
    const { mutate: addMenu, isLoading } = useAddMenu();

    const onSubmit = (data: IDataMenu) => {
        const hasError = Object.keys(errors).length > 0;
        if (hasError) return null;
        addMenu(data);
    }

    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <h1 className="text-3xl font-bold mb-6">Add New Menu</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Menu name</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert menu name" required {...register('name', { required: true, maxLength: { value: 25, message: "The maximum character of name is 25" } })} />
                            {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <input type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert description" required {...register('description', { required: true, maxLength: { value: 100, message: "The maximum character of description is 100" } })} />
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
                            <input type="number" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert Price" required {...register('price', { required: true })} />
                            {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input type="number" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert Stock" required {...register('stock', { required: true })} />
                            {errors.stock && <span className="text-red-500 text-xs">{errors.stock.message}</span>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                            <input type="file" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required {...register('image', { required: true })} />
                            {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{isLoading ? "Submitting ..." : "Submit"}</button>
                    </form>
                </div>


            </div>
        </>
    )
}

export default AddMenu