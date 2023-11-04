import ErrorPage from '../pages/error/ErrorPage.tsx'
import App from '../App.tsx'
import RegisterPage from '../pages/auth/RegisterPage.tsx'
import LoginPage from '../pages/auth/LoginPage.tsx'
import Dashboard from '../pages/admin/dashboard/Dashboard.tsx'
import MenuPage from '../pages/admin/menu/MenuPage.tsx'
import AddMenu from '../pages/admin/menu/AddMenu.tsx'
import EditMenu from '../pages/admin/menu/EditMenu.tsx'
import TablePage from '../pages/admin/table/TablePage.tsx'
import UserPage from '../pages/admin/user/UserPage.tsx'
import OrderPage from '../pages/admin/order/OrderPage.tsx'
import CheckoutPage from '../pages/home/CheckoutPage.tsx'
import ProtectedRoute from '../components/route/ProtectedRoute.tsx'

const routes = [
    {
      path: "/",
      Component: App,
      ErrorBoundary: ErrorPage
    },
    {
      path: "/checkout",
      Component: CheckoutPage
    },
    {
      path: "/register",
      Component: RegisterPage
    },
    {
      path: "/login",
      Component: LoginPage
    },
    {
      Component: ProtectedRoute,
      children: [
        {
          path: "/admin/dashboard",
          Component: Dashboard
        },
        {
          path: "/admin/dashboard/menu",
          Component: MenuPage
        },
        {
          path: "/admin/dashboard/menu/add-menu",
          Component: AddMenu
        },
        {
          path: "/admin/dashboard/menu/edit-menu/:id",
          Component: EditMenu
        },
        {
          path: "/admin/dashboard/tables",
          Component: TablePage
        },
        {
          path: "/admin/dashboard/users",
          Component: UserPage
        },
        {
          path: "/admin/dashboard/orders",
          Component: OrderPage
        },
      ],
    },
];

export default routes;