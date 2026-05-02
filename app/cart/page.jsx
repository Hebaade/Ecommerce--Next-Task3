"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import {
  Container, Box, Typography, Button,
  IconButton, Paper, Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const pastel = {
    bg: "#FAFAFF",
    card: "#FFFFFF",
    blue: "#CDE7FF",
    pink: "#F7C8E0",
    mint: "#B8F2E6",
    yellow: "#FFD6A5",
    border: "#E6E6E6",
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      

        <Typography variant="h4" fontWeight={900}>
          Your cart is empty
        </Typography>

        <Link href="/products">
          <Button sx={{
            mt: 3,
            backgroundColor: pastel.mint,
            color: "#000",
            fontWeight: 800,
            border: "1px solid #000"
          }}>
            Start Shopping →
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5, backgroundColor: pastel.bg }}>

      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 4
      }}>
        <Typography variant="h4" fontWeight={900}>
          Your Cart
        </Typography>

        <Button onClick={clearCart} color="error">
          Clear all
        </Button>
      </Box>

      <Box sx={{
        display: "flex",
        gap: 3,
        flexDirection: { xs: "column", md: "row" }
      }}>

        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: 2 }}>

          {items.map((item) => (
            <Paper
              key={item.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: "16px",
                border: `1px solid ${pastel.border}`,
              }}
            >

              <Box sx={{
                width: 90,
                height: 90,
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: pastel.yellow,
              }}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>

                <Typography fontWeight={800}>
                  {item.title}
                </Typography>

                <Typography fontSize="0.75rem" color="text.secondary">
                  {item.category}
                </Typography>

                <Box sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }>
                      <RemoveIcon />
                    </IconButton>

                    <Typography fontWeight={800}>
                      {item.quantity}
                    </Typography>

                    <IconButton onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }>
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography fontWeight={900}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>

                    <IconButton onClick={() => removeItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>

                </Box>

              </Box>
            </Paper>
          ))}

        </Box>

        <Box sx={{ flex: 1 }}>

          <Paper sx={{ p: 3, borderRadius: "18px" }}>

            <Typography variant="h5" fontWeight={900}>
              Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal</Typography>
              <Typography fontWeight={900}>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>

            <Button
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: pastel.mint,
                color: "#000",
                fontWeight: 800,
                border: "1px solid #000",
              }}
            >
              Checkout
            </Button>

          </Paper>

        </Box>

      </Box>
    </Container>
  );
}