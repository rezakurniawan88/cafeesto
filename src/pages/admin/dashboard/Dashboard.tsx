import { useEffect } from "react";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import { useFetchOrders } from "../../../hooks/orders/useFetchOrders";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import { useFetchUser } from "../../../hooks/auth/useFetchUser";
import { useFetchMetrics } from "../../../hooks/orders/useFetchMetrics";
import LoadingPage from "../../../components/loading/LoadingPage";
import userStore from "../../../stores/userStore";
import DashboardCharts from "../../../components/charts/DashboardCharts";
import { IDataOrder } from "../../../types/types";

function Dashboard() {
    const { mutate: getUser, isError, isLoading: loadingFetchUser } = useFetchUser();
    const { data: dataMetrics } = useFetchMetrics();
    const { data: dataOrder, isLoading } = useFetchOrders();
    const { userData } = userStore((state) => state);

    useEffect(() => {
        getUser();
    }, [getUser])


    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <h1 className="mt-2 text-xl">Hello, {isError ? "Guest" : userData?.data.role ? "Administrator" : "Cassier"}</h1>
                    <div className="flex gap-10 mt-8">
                        <div className="flex flex-col justify-center items-center bg-white w-1/3 h-40 font-bold rounded-xl">
                            <h1 className="mb-4 text-gray-600">Today Revenue</h1>
                            <h1 className="text-2xl text-orange-400">Rp. {dataMetrics?.data?.todayRevenue?.toLocaleString()}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white w-1/3 h-40 font-bold rounded-xl">
                            <h1 className="mb-4 text-gray-600">Product Sold</h1>
                            <h1 className="text-2xl text-orange-400">{dataMetrics?.data?.productSold}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-white w-1/3 h-40 font-bold rounded-xl">
                            <h1 className="mb-4 text-gray-600">Total Revenue</h1>
                            <h1 className="text-2xl text-orange-400">Rp. {dataMetrics?.data?.totalRevenue?.toLocaleString()}</h1>
                        </div>
                    </div>
                </div>

                <DashboardCharts />

                <div className="p-4">
                    <h1 className="text-xl font-bold mb-4">Recent Orders</h1>
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
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
                                    <td className={`px-6 py-4 ${order.completion_status === 0 ? "text-red-500" : "text-green-500"}`}>
                                        {order.completion_status === 0 ? "Pending" : "Complete"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        {isLoading && <TableSkeleton col={7} />}
                    </table>
                </div>
                {loadingFetchUser && <LoadingPage />}
            </div>
        </>
    )
}

export default Dashboard