import { Product } from "app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "@app/api/agent";

function Catalog() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agent.Catalog.list()
      .then(response => setProducts(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <h3>Loading...</h3>

  return (
    <>
      <ProductList products={products}/>
    </>
   )
}

export default Catalog