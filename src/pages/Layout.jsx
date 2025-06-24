import Boardlist from "../templates/Boardlist";
import { Outlet, Link } from "react-router-dom";
import Footer from "../templates/Footer";

function Layout() {
    return(
        <>
            <Boardlist/>
            <Outlet/>
            <Footer/>
        </>
        

    )
}

export default Layout;