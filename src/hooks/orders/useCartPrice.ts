import { useState, useEffect} from "react";
import { IDataMenu } from "../../types/types";

export const useCartPrice = (carts: IDataMenu[]) => {
    const [subTotal, setSubTotal] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const getSubTotal = () => {
            const total = carts.reduce((acc, cart) => {
                return acc + cart.price * cart.menuQty;
            }, 0)
            setSubTotal(total);
        }

        getSubTotal();
    }, [carts]);


    useEffect(() => {
        const getTotalPrice = () => {
            const pajak = subTotal * 10 / 100;
            setTotalPrice(subTotal + pajak);
        }

        getTotalPrice();
    }, [subTotal]);


    return { subTotal, totalPrice };
}