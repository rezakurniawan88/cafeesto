import { Link } from "react-router-dom";
import SidebarDashboard from "../../../components/dashboard/SidebarDashboard";
import TopBarDashboard from "../../../components/dashboard/TopBarDashboard";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import { useFetchAllUsers } from "../../../hooks/auth/useFetchAllUsers";
import { IDataUser } from "../../../types/types";

function UserPage() {
    const { data: dataUsers, isLoading } = useFetchAllUsers();

    return (
        <>
            <TopBarDashboard />
            <SidebarDashboard />

            <div className="p-4 sm:ml-64">
                <div className="p-4 mt-14">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Users</h1>
                        <Link to="/register">
                            <button className="font-medium bg-blue-600 text-white py-1.5 px-4 text-sm rounded-md hover:bg-blue-700">+ Create New User</button>
                        </Link>
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {dataUsers?.data?.users?.map((user: IDataUser, index: number) => {
                                    const formattedDate = new Date(user.created_at).toLocaleDateString("en-GB");
                                    return (
                                        <tr key={user.id} className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.role ? "Admin" : "Cassier"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {formattedDate}
                                            </td>
                                        </tr>

                                    )
                                })}
                            </tbody>

                            {isLoading && <TableSkeleton col={4} />}

                        </table>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserPage