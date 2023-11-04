import { useState } from "react";
import toast from "react-hot-toast";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import { useAddTable } from "../../../hooks/tables/useAddTable";
import { useFetchTables } from "../../../hooks/tables/useFetchTables";
import { useDeleteTable } from "../../../hooks/tables/useDeleteTable";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import useStore from "../../../stores/store";
import DeleteModal from "../../../components/modal/DeleteModal";
import { ITableProps } from "../../../types/types";

function TablePage() {
    const { data: dataTables, refetch: refetchTable, isLoading } = useFetchTables();
    const { handleDeleteModal } = useStore((state) => state);
    const [deletedTableID, setDeletedTableID] = useState<number | null>(null);

    const { mutate: addNewTable } = useAddTable({
        onSuccess: () => {
            toast.success("Add Table Successfull");
            refetchTable();
        }
    });

    const { mutate: deleteTable, isLoading: loadingDelTable } = useDeleteTable({
        onSuccess: (data) => {
            toast.success(data);
            handleDeleteModal();
            refetchTable();
        }
    });

    const confirmDelete = (id: number) => {
        setDeletedTableID(id);
        handleDeleteModal();
    }

    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Table</h1>
                        <div className="flex gap-3">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                            </button>
                            <button onClick={addNewTable} className="font-medium bg-blue-600 text-white py-1.5 px-4 text-sm rounded-md hover:bg-blue-700">+ Add New Table</button>
                        </div>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Table Number
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataTables?.data?.tables?.map((table: ITableProps, index: number) => (
                                    <tr key={table.id} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            Table {table.table_number}
                                        </td>
                                        <td className={`px-6 py-4 font-semibold ${table.status ? "text-green-500" : "text-red-500"}`}>
                                            {table.status ? "Available" : "Reserved"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => confirmDelete(table.id)} className="p-2 hover:bg-gray-100 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                            </button>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                            {isLoading && <TableSkeleton col={4} />}

                        </table>
                    </div>

                </div>
            </div>

            <DeleteModal selectedID={deletedTableID} deleteFunction={deleteTable} loading={loadingDelTable} />
        </>
    )
}

export default TablePage