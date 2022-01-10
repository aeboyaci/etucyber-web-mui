import React, {useEffect, useState} from 'react';
import TopNav from "./TopNav";
import SideNav from "./SideNav";

const MainLayout = ({ children }) => {
    const [size, setSize] = useState(typeof window !== "undefined" ? window.innerWidth : 1080);

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", () => setSize(window.innerWidth));
        }
        return () => {
            console.log("cleanup");
            (typeof window !== "undefined") && window.removeEventListener("resize", () => setSize(window.innerWidth));
        };
    }, []);

    return (
        <React.Fragment>
            {size >= 600 ? <TopNav/> : <SideNav />}
            { children }
        </React.Fragment>
    );
};

export default MainLayout;