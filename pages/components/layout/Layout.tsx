import { useContext, useEffect, useState } from "react";
import { ContextInfo, ProductsContext } from "../ProductContext";
import { Footer } from "./Footer";

type LayoutProps = {};

export const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
    const { setSelectedProducts } = useContext(ProductsContext) as ContextInfo;
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (window.location.href.includes('success')) {
            setSelectedProducts([]);
            setSuccess(true);
        }
    }, []);

    return (
        <>
            {success && (
                <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
                    Thanks for your order!
                </div>
            )}
            <div className="p-5">
                {children}
            </div>
            <Footer />
        </>
    )
}