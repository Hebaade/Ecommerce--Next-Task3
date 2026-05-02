"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckIcon from "@mui/icons-material/Check";

export default function AddToCartButton({ product }) {
  const { items, addItem } = useCartStore();

  const id = product._id || product.id;

  const isInCart = items.some((item) => item.id === id);

  const handleAdd = () => {
    if (!isInCart) {
      addItem(product);
    }
  };

  return (
    <Button
      fullWidth
      onClick={handleAdd}
      startIcon={isInCart ? <CheckIcon /> : <ShoppingCartIcon />}
      disabled={isInCart} 
      sx={{
        background: isInCart
          ? "#e5e7eb"
          : "linear-gradient(135deg, #7c3aed, #db2777)",
        color: isInCart ? "#111" : "white",
        fontWeight: 900,
        fontSize: "1.05rem",
        py: 1.5,
        borderRadius: "16px",
        boxShadow: isInCart
          ? "none"
          : "0 6px 20px rgba(124,58,237,0.35)",

        "&:hover": {
          background: isInCart
            ? "#e5e7eb"
            : "linear-gradient(135deg, #6d28d9, #be185d)",
        },
      }}
    >
      {isInCart ? "Added to Cart ✓" : "Add to Cart"}
    </Button>
  );
}