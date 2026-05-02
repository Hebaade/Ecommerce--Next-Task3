import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const id = product._id || product.id; 

        const existing = get().items.find((i) => i.id === id);

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                ...product,
                id, 
                quantity: 1,
              },
            ],
          });
        }
      },

      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);