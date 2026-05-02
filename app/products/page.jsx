import { Suspense } from "react";
import { Container, Typography } from "@mui/material";
import ProductsClient from "@/components/ProductsClient";

export const revalidate = 60;

export default function ProductsPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={900} sx={{ mb: 1, color: "#1e1b4b" }}>
        All Products
      </Typography>
      <Typography sx={{ color: "#94a3b8", mb: 4 }}>
        Discover our full collection
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsClient />
      </Suspense>
    </Container>
  );
}