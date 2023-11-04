import toast from "react-hot-toast";
import useCartStore from "../stores/cartStore";

const useDeleteItem = () => {
  const { deleteItemInCart } = useCartStore();

  const deleteItem = (id: number) => {
    deleteItemInCart(id);
    toast.success("Item deleted");
  };

  return deleteItem;
};

export default useDeleteItem;