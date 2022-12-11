import { useContext, useEffect } from "react";
import { ProductItem } from "../../types/Product";
import { ContextInfo, ProductsContext } from "./ProductContext";

type ItemProps = {
    product: ProductItem;
}
export const Item = ({ product }: ItemProps) => {
    const { setSelectedProducts } = useContext(ProductsContext) as ContextInfo;

    const { name, description, imageLocation, price } = product;

    const addProduct = () => {
        setSelectedProducts(prev => [...prev, product]);
    }

    return (
        <div className="py-4 px-5">
            <div className="w-64">
                <div className="bg-blue-100 p-5 rounded-xl">
                    <img src={imageLocation} alt="" />
                </div>
                <div className="mt-2">
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="text-sm mt-1 leading-4">{description}</p>
                    <div className="flex mt-1">
                        <div className="text-2xl font-bold grow">{`$${price}`}</div>
                        <button onClick={addProduct} className="bg-emerald-400 text-white py-1 px-3 rounded-md">Add to cart</button>
                    </div>
                </div>

            </div>
        </div>
    )
}