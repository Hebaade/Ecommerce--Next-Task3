"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const COLORS = [
  "#fce7f3",
  "#dbeafe",
  "#fef9c3",
  "#ede9fe",
  "#dcfce7",
  "#ffedd5",
];

export default function ProductCard({ product, index = 0 }) {
  const { items, addItem } = useCartStore();
  const router = useRouter();

  const productId =
    product?._id?.toString() || product?._id || product?.id;

  if (!productId) return null;

  const color = COLORS[index % COLORS.length];

  const isInCart = items.some((item) => item.id === productId);

  const handleAddToCart = () => {
    if (isInCart) {
      router.push("/cart"); 
    } else {
      addItem({ ...product, id: productId });
    }
  };

  return (
    <Card
      sx={{
        border: "1.5px solid #e2e8f0",
        borderRadius: "20px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "280px",
        margin: "0 auto",
        overflow: "hidden",
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(124,58,237,0.15)",
        },
      }}
    >
      <Link href={`/products/${productId}`} style={{ textDecoration: "none" }}>
        <Box
          sx={{
            position: "relative",
            height: 180,
            backgroundColor: color,
            overflow: "hidden",
          }}
        >
          <Image
            src={product.thumbnail}
            alt={product.title || "product"}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{
              objectFit: "contain",
              padding: "20px",
            }}
          />

          {product.discountPercentage > 10 && (
            <Chip
              label={`-${Math.round(product.discountPercentage)}%`}
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                background:
                  "linear-gradient(135deg, #7c3aed, #db2777)",
                color: "white",
                fontWeight: 800,
                fontSize: "0.7rem",
              }}
            />
          )}
        </Box>
      </Link>

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
        }}
      >
        <Typography
          variant="caption"
          fontWeight={700}
          sx={{
            color: "#7c3aed",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {product.category}
        </Typography>

        <Link href={`/products/${productId}`} style={{ textDecoration: "none" }}>
          <Typography
            variant="body2"
            fontWeight={800}
            sx={{
              color: "#1e1b4b",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
              minHeight: "3em",
              maxHeight: "3em",
              "&:hover": { color: "#7c3aed" },
            }}
          >
            {product.title}
          </Typography>
        </Link>

        <Box
          sx={{
            height: 24,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Rating
            value={product.rating || 0}
            precision={0.1}
            size="small"
            readOnly
          />
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
            ({product.stock || 0})
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "auto",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={900}
            sx={{ color: "#1e1b4b" }}
          >
            ${product.price}
          </Typography>

          <Button
            size="small"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon fontSize="small" />}
            sx={{
              background: isInCart
                ? "#e5e7eb"
                : "linear-gradient(135deg, #7c3aed, #db2777)",
              color: isInCart ? "#111" : "white",
              borderRadius: "10px",
              px: 1.5,
              py: 0.5,
              fontSize: "0.75rem",
              fontWeight: 700,

              "&:hover": {
                background: isInCart
                  ? "#e5e7eb"
                  : "linear-gradient(135deg, #6d28d9, #be185d)",
              },
            }}
          >
            {isInCart ? "View Cart →" : "Add"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}