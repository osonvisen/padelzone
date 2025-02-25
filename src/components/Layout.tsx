import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./styling/Layout.css";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="layout-container">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
