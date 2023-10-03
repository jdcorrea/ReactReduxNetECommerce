import agent from "@app/api/agent"
import Loading from "@app/layout/Loading"
import { Basket } from "@app/models/basket"
import { useEffect, useState } from "react"
import Typography from '@mui/material/Typography'


function BasketPage() {
  const [loading, setLoading] = useState(true)
  const [basket, setBasket] = useState<Basket | null>(null)

  useEffect(() => {
    agent.Basket.get()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [])
  
  if (loading) return <Loading message='Loading Basket...' />

  if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

  return (
    <h1>Buyer ID = {basket.buyerId}</h1>
  )
}

export default BasketPage