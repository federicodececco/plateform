import { Outlet } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

export default function AppLayout() {
    
    return (
        <>
            <AppNavbar></AppNavbar>
            <Outlet />
            <AppFooter></AppFooter>
        </>
    )
}