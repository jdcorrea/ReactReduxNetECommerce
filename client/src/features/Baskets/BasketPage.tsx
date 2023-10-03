import agent from "@app/api/agent"
import Loading from "@app/layout/Loading"
import { Basket } from "@app/models/basket"
import { useEffect, useState } from "react"
import Typography from '@mui/material/Typography'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"


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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">${(item.price * item.quantity / 100).toFixed(2)}</TableCell>
              <TableCell align="right">
                <IconButton color='error'>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasketPage