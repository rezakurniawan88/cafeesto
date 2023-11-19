import { useState } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDeleteMenu } from "../../../hooks/menus/useDeleteMenu";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import useStore from "../../../stores/store";
import DeleteModal from "../../../components/modal/DeleteModal";
import { IDataMenu } from "../../../types/types";
import { useFetchMenusDashboard } from "../../../hooks/menus/useFetchMenusDashboard";
import Pagination from "../../../components/pagination/Pagination";

function MenuPage() {
    const { data: dataMenu, isLoading, refetch: refetchMenus } = useFetchMenusDashboard();
    const { handleDeleteModal, changePageMenu } = useStore((state) => state);
    const [deletedMenuID, setDeletedMenuID] = useState<number | null>(null);

    const { mutate: deleteMenu, isLoading: loadingDelMenu } = useDeleteMenu({
        onSuccess: (data) => {
            toast.success(data);
            handleDeleteModal();
            refetchMenus();
        }
    });

    const confirmDelete = (id: number) => {
        setDeletedMenuID(id);
        handleDeleteModal();
    }

    const handlerChangePage = ({ selected }: { selected: number }) => {
        console.log("selected", selected);
        changePageMenu(selected);
        refetchMenus();
    };

    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Menus</h1>
                        <Link to="/admin/dashboard/menu/add-menu">
                            <button className="font-medium bg-blue-600 text-white py-1.5 px-4 text-sm rounded-md hover:bg-blue-700">+ Add Menu</button>
                        </Link>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Menu name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Image
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataMenu?.data?.menus?.data?.map((menu: IDataMenu) => (
                                    <tr key={menu.id} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {menu.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            <img src={`${import.meta.env.VITE_BASE_URL}${menu.image}`} alt={menu.name} className="w-20 h-20" />
                                        </td>
                                        <td className="px-6 py-4">
                                            {menu.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {menu.category}
                                        </td>
                                        <td className="px-6 py-4">
                                            {menu.stock}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <Link to={`/admin/dashboard/menu/edit-menu/${menu.id}`}>
                                                    <button className="font-medium bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700">Edit</button>
                                                </Link>
                                                <button onClick={() => confirmDelete(menu.id)} className="font-medium bg-red-600 text-white py-1.5 px-3 rounded-md hover:bg-red-700">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {isLoading && <TableSkeleton col={6} />}
                        </table>
                    </div>

                    <Pagination
                        pageCount={dataMenu?.data?.menus?.last_page}
                        handlerChangePage={handlerChangePage}
                    />

                </div>
            </div>

            <DeleteModal selectedID={deletedMenuID} deleteFunction={deleteMenu} loading={loadingDelMenu} />
        </>
    )
}

export default MenuPage