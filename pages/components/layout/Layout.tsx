import { Footer } from "./Footer";

type LayoutProps = {};

export const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
    return (
        <>
            <div className="p-5">
                {children}
            </div>
            <Footer />
        </>
    )
}