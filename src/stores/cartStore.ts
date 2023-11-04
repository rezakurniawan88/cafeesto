import { create } from "zustand";
import { IDataMenu } from "../types/types";

type TUseCartStore = {
  carts: IDataMenu[];
  addToCart: (selectedItem: IDataMenu) => void;
  handleQuantity: (id: number, qty: number) => void;
  deleteItemInCart: (id: number) => void;
  resetCart: () => void;
}

const useCartStore = create<TUseCartStore>((set) => ({
    carts: [],
    addToCart: (selectedItem) => set((state) => ({ carts: [...state.carts, selectedItem] })),
    handleQuantity: (id, qty) =>
      set((state) => {
        const updatedCarts = state.carts.map((cart) =>
          cart.id === id
            ? {
                ...cart,
                menuQty: Math.max(0, cart.menuQty + qty),
              }
            : cart
        );
    
        const itemToDelete = updatedCarts.find((cart) => cart.id === id);
        if (itemToDelete?.menuQty === 0) {
          return {
            carts: updatedCarts.filter((cart) => cart.id !== id),
          };
        }
    
        return { carts: updatedCarts };
    }),
    deleteItemInCart: (id) => 
      set((state) => ({
        carts: state.carts.filter((item) => item.id !== id),
    })),
    resetCart: () => 
      set(() => ({carts: []})),
  }));

export default useCartStore;