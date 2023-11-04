import { Link } from "react-router-dom";
import userStore from "../../stores/userStore";

function SidebarDashboard() {
    const { userData } = userStore((state) => state);

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
            <div className="relative h-full px-3 pb-4 overflow-y-auto overflow-x-hidden bg-white">
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link to="/admin/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <svg className="w-4 h-4 text-gray-500 transition duration-75 group-hover:text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                            </svg>
                            <h2 className="flex-1 ml-2.5 text-sm whitespace-nowrap group-hover:text-orange-500">Dashboard</h2>
                        </Link>
                    </li>
                    <li className={userData?.data?.role ? "block" : "hidden"}>
                        <Link to="/admin/dashboard/menu" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <svg className="w-4 h-4 text-gray-500 transition duration-75 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.615c0 .414.336.75.75.75h5.373a.75.75 0 00.627-.74zm1.5 0a.75.75 0 00.627.74h5.373a.75.75 0 00.75-.75v-.615a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625zm6.75-3.63v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75v.625c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75zM17.5 7.5v-.625a.75.75 0 00-.75-.75H11.5a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75h5.25a.75.75 0 00.75-.75zm-8.25 0v-.625a.75.75 0 00-.75-.75H3.25a.75.75 0 00-.75.75V7.5c0 .414.336.75.75.75H8.5a.75.75 0 00.75-.75z"></path>
                            </svg>
                            <h2 className="flex-1 ml-2.5 text-sm whitespace-nowrap group-hover:text-orange-500">Menus</h2>
                        </Link>
                    </li>
                    <li className={userData?.data?.role ? "block" : "hidden"}>
                        <Link to="/admin/dashboard/tables" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-orange-500">
                                <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 011.5 10.875v-3.75zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 01-1.875-1.875v-8.25zM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 013 18.375v-2.25z" clipRule="evenodd" /></svg>
                            <h2 className="flex-1 ml-2.5 text-sm whitespace-nowrap group-hover:text-orange-500">Tables</h2>
                        </Link>
                    </li>
                    <li className={userData?.data?.role ? "block" : "hidden"}>
                        <Link to="/admin/dashboard/users" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <svg className="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 group-hover:text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                            </svg>
                            <h2 className="flex-1 ml-2.5 text-sm whitespace-nowrap group-hover:text-orange-500">Users</h2>
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/dashboard/orders" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <svg className="flex-shrink-0 w-4 h-4 text-gray-500 transition duration-75 group-hover:text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                            </svg>
                            <h2 className="flex-1 ml-2.5 text-sm whitespace-nowrap group-hover:text-orange-500">Orders</h2>
                        </Link>
                    </li>
                    <li className="absolute w-full bottom-4 left-2 flex items-center p-2 text-gray-600">
                        <h2 className="flex-1 ml-2.5 text-xs whitespace-nowrap">Cafeesto. @2023</h2>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SidebarDashboard