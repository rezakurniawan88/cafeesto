import { useState } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import { toast } from "react-hot-toast";
import { useFetchOrders } from "../../../hooks/orders/useFetchOrders";
import { useDeleteOrder } from "../../../hooks/orders/useDeleteOrder";
import { useCompleteOrder } from "../../../hooks/orders/useCompleteOrder";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import useStore from "../../../stores/store";
import DeleteModal from "../../../components/modal/DeleteModal";
import { useFinishedTable } from "../../../hooks/tables/useFinishedTable";
import { IDataOrder } from "../../../types/types";
import Pagination from "../../../components/pagination/Pagination";

function OrderPage() {
    const { data: dataOrder, isLoading, refetch: refetchOrders } = useFetchOrders();
    const { handleDeleteModal, changePage } = useStore((state) => state);
    const [deletedOrderID, setDeletedOrderID] = useState<number | null>(null);

    const { mutate: onDeleteOrder, isLoading: loadingDelete } = useDeleteOrder({
        onSuccess: (data: string) => {
            toast.success(data);
            handleDeleteModal();
            refetchOrders();
        }
    });

    const { mutate: handleCompleteOrder } = useCompleteOrder({
        onSuccess: (data: string) => {
            toast.success(data);
            refetchOrders();
        }
    });

    const { mutate: handleFinishedTable } = useFinishedTable({
        onSuccess: (data: string) => {
            toast.success(data);
            refetchOrders();
        }
    });

    const confirmDelete = (id: number) => {
        setDeletedOrderID(id);
        handleDeleteModal();
    }

    const handlerChangePage = ({ selected }: { selected: number }) => {
        changePage(selected);
        refetchOrders();
    };


    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <div className="flex">
                        <h1 className="text-3xl font-bold">Orders</h1>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Table Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Detail Menu
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Options
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataOrder?.data?.orders?.data?.map((order: IDataOrder, id: number) => (
                                    <tr key={order.id} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {id + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {`Table ${order.table_number} : ${order.name}`}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.items.map((item) => (
                                                <h1 key={item.id}>{`${item.name} x ${item.menuQty}`}</h1>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4">
                                            Rp. {order.total_price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.options.toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button disabled={order.completion_status === 0 ? false : true} onClick={() => handleCompleteOrder(order.id)} className={`font-medium bg-green-600 text-white py-1.5 px-3 rounded-md hover:bg-green-700 ${order.completion_status === 1 && "opacity-50 cursor-not-allowed"}`}>Accept</button>
                                                <button disabled={order.completion_status === 0 ? false : true} onClick={() => confirmDelete(order.id)} className={`font-medium bg-red-600 text-white py-1.5 px-3 rounded-md hover:bg-red-700 ${order.completion_status === 1 && "opacity-50 cursor-not-allowed"}`}>Reject</button>
                                                <button onClick={() => handleFinishedTable(order.table.id)} className={`font-medium bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 ${order.table.status === 1 && "opacity-50 cursor-not-allowed"}`}>Done</button>
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 ${order.completion_status === 0 ? "text-red-500" : "text-green-500"}`}>
                                            {order.completion_status === 0 ? "Pending" : "Complete"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {isLoading && <TableSkeleton col={7} />}
                        </table>
                    </div>

                    <Pagination
                        pageCount={dataOrder?.data?.orders?.last_page}
                        handlerChangePage={handlerChangePage}
                    />

                </div>
            </div>

            <DeleteModal selectedID={deletedOrderID} deleteFunction={onDeleteOrder} loading={loadingDelete} />
        </>
    )
}

export default OrderPage