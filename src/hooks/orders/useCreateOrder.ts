import { useMutation } from "react-query"
import { IDataOrder } from "../../types/types";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import useCartStore from "../../stores/cartStore";
import { useCartPrice } from "./useCartPrice";
import useStore from "../../stores/store";

export const useCreateOrder = () => {
    const { carts, resetCart } = useCartStore((state) => state);
    const { handleSuccessModal } = useStore((state) => state);
    const { totalPrice } = useCartPrice(carts);

    return useMutation({
        mutationFn: async (data: IDataOrder) => {
            const response = await axiosInstance.post("/orders", { ...data, carts, totalPrice, status: false });

            return response.data.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            resetCart();
            handleSuccessModal();
        },
        onError: () => {
            toast.error("Error, order failed");
        }
    });
}