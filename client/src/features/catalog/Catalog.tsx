import { Product } from "app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import axios from 'axios'

function Catalog() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
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