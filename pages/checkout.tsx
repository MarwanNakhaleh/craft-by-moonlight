import { useContext, useState } from "react";
import { ProductItem } from "../types/Product";
import Layout from "../components/layout/Layout";
import { ContextInfo, ProductsContext } from "../components/ProductContext";

export default function CheckoutPage() {
    const { selectedProducts, setSelectedProducts } = useContext(ProductsContext) as ContextInfo;
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [zipcode, setZipcode] = useState<string>("");
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const uniqueProducts = Array.from(new Set(selectedProducts.map(e => JSON.stringify(e)))).map(e => JSON.parse(e));

    function moreOfThisProduct(product: ProductItem) {
        setSelectedProducts(prev => [...prev, product]);
    }

    function lessOfThisProduct(product: ProductItem) {
        let existingProductsOfSelectedType = selectedProducts.filter(selectedProduct => selectedProduct._id === product._id)
        const allOtherProducts = selectedProducts.filter(selectedProduct => selectedProduct._id !== product._id)
        existingProductsOfSelectedType.splice(0, 1);
        setSelectedProducts([...existingProductsOfSelectedType, ...allOtherProducts])
    }

    function removeFromCart(product: ProductItem) {
        setSelectedProducts(prev => {
            return prev.filter((value) => value._id !== product._id);
        });
    }

    const deliveryPrice = 5;
    let subtotal = 0;
    selectedProducts.forEach(product => {
        subtotal += product.price;
    })
    const total = subtotal + deliveryPrice;

    return (
        <Layout>
            {selectedProducts.length === 0 ?
                <div>No products in your shopping cart</div> : uniqueProducts.map(product => {
                    return <div className="flex mb-5 items-center" key={product._id}>
                        <div className="bg-gray-100 p-3 rounded-xl shrink-0" style={{ boxShadow: 'inset 1px 0px 10px 10px rgba(0,0,0,0.1)' }}>
                            <img className="w-24" src={product.imageLocation} alt="" />
                        </div>
                        <div className="pl-4 items-center">
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-sm leading-4 text-gray-500">{product.description}</p>
                            <p className="flex mt-1 font-bold">${product.price}</p>
                            <p className="flex-1">
                                <button onClick={() => lessOfThisProduct(product)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                                <span className="px-2">
                                    {selectedProducts.filter(selectedProduct => selectedProduct._id === product._id).length}
                                </span>
                                <button onClick={() => moreOfThisProduct(product)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
                            </p>
                            <p className="flex-1 mt-1">
                                <button onClick={() => removeFromCart(product)} className="bg-red-500 px-2 rounded-lg text-white">Remove from cart</button>
                            </p>
                        </div>
                    </div>
                })
            }

            {subtotal > 0 && <form action="/api/checkout" method="POST">
                <div className="mt-8 text-gray-500">
                    <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Name" />
                    <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address" />
                    <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City" />
                    <input name="state" value={state} onChange={e => setState(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="State" />
                    <input name="zipcode" value={zipcode} onChange={e => setZipcode(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Zip code" />
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address" />
                </div>
                <div className="mt-8">
                    <div className="flex my-3">
                        <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
                        <h3 className="font-bold">${subtotal}</h3>
                    </div>
                    <div className="flex my-3">
                        <h3 className="grow font-bold text-gray-400">Delivery:</h3>
                        <h3 className="font-bold">${deliveryPrice}</h3>
                    </div>
                    <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
                        <h3 className="grow font-bold text-gray-400">Total before sales tax:</h3>
                        <h3 className="font-bold">${total}</h3>
                    </div>
                </div>
                <input type="hidden" name="products" value={selectedProducts.map(product => product._id).join(',')} />
                <button type="submit" disabled={subtotal === 0} className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4">Pay ${total}</button>
            </form>}
        </Layout >
    )
}