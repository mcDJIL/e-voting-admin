import { createBrowserRouter } from "react-router-dom";
import { GuestSkin } from "../Skins/guestSkin";
import { LoginPage } from "../Pages/loginPage";
import { GuardSkin } from "../Skins/guardSkin";
import { DashboardPage } from "../Pages/dashboardPage";
import { MasterWarga } from "../Pages/masterWarga";
import { MasterProvinsi } from "../Pages/masterProvinsi";
import { MasterKota } from "../Pages/masterKota";
import { PemiluPresiden } from "../Pages/pemiluPresiden";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <GuestSkin />,
        children: [
            {
                path: '/',
                element: <LoginPage />
            },
            
        ]
    },
    {
        path: '/',
        element: <GuardSkin />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/master-warga',
                element: <MasterWarga />
            },
            {
                path: '/master-provinsi',
                element: <MasterProvinsi />
            },
            {
                path: '/master-kota',
                element: <MasterKota />
            },
            {
                path: '/pemilu-presiden',
                element: <PemiluPresiden />
            },
        ]
    }
])

export default routes;