import { createContext, Dispatch, SetStateAction } from "react";
import useLocalStorageState from "use-local-storage-state";
import { ProductItem } from "../../types/Product";

export type ContextInfo = {
    selectedProducts: ProductItem[];
    setSelectedProducts: Dispatch<SetStateAction<ProductItem[]>>;
}

type ContextProps = {};

export const ProductsContext = createContext<ContextInfo | null>(null);

export const ProductsContextProvider = ({ children }: React.PropsWithChildren<ContextProps>) => {
    const [selectedProducts, setSelectedProducts] = useLocalStorageState<ProductItem[]>("cart", { defaultValue: [] });

    return (
        <ProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}