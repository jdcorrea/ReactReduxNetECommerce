import { useAppSelector } from "@app/store/configureStore";
import { currencyFormat } from "@app/util/util";
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";

export default function BasketSummary() {
    const FREE_DELIVERY_MINIMUM_VALUE = 10000;
    const DELIVERY_FEE_VALUE = 500;

    const { basket } = useAppSelector(state => state.basket);
    const subtotal = basket?.items.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subtotal < FREE_DELIVERY_MINIMUM_VALUE ? DELIVERY_FEE_VALUE : 0 ?? 0;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}