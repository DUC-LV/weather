import React from "react";
import Header from "../Components/Header/Header"
import Menu from "../Components/Menu/Menu";
import Footer from "./Footer/Footer";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
            <Header />
            <Menu city=""  />
            {children}
            <br></br>
            <br></br>
            <Footer />
        </>
    );
}
export default Layout;