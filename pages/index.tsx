import { useState } from "react"
import { ProductItem } from "../types/Product";
import { findAllProducts, initMongoose } from "./api/products";
import Item from "../components/Item";
import Layout from "../components/layout/Layout";

type HomeProps = {
  products: ProductItem[];
}

export default function Home({ products }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  let productItems = searchQuery?.trim() === "" ? products : products?.filter(product => product.name.toLowerCase().includes((searchQuery as string).toLowerCase()));

  let categoryNames: string[] = [...new Set(productItems.map(p => p.type))];

  return (
    <Layout>
      <>
        <input type="text" placeholder="Search for products" className="bg-gray-100 w-full py-2 px-4 rounded-xl text-gray-500" onChange={e => setSearchQuery(e.target.value)} />
        {categoryNames?.map((category) => {
          return <div key={category.toString()}>
            <h2 className="text-3xl py-5 capitalize">{category}</h2>
            <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
              {productItems && productItems.filter(product => product.type.toString() === category).map((product: ProductItem) => {
                return <Item product={product} key={product._id} />
              })}
            </div>
          </div>
        })}
      </>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}