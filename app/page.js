import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Box, Container, Typography, Button } from "@mui/material";
import clientPromise from "@/lib/mongodb";

async function getFeaturedProducts() {
  const client = await clientPromise;
  const db = client.db("shopzone");
  const products = await db.collection("products").find({}).limit(8).toArray();
  return products.map((p) => ({ ...p, _id: p._id.toString() }));
}

async function getCategories() {
  const client = await clientPromise;
  const db = client.db("shopzone");
  const categories = await db.collection("products").distinct("category");
  return categories.sort();
}

const CAT_COLORS = [
  "#f9c6d0", "#c6e2f9", "#fef3c7", "#ddd6fe",
  "#bbf7d0", "#fde68a", "#fbcfe8", "#bfdbfe",
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>

      <Box sx={{
        position: "relative",
        background: "linear-gradient(135deg, #fdf4ff 0%, #fce7f3 50%, #ede9fe 100%)",
        border: "3px solid #e2e8f0",
        borderRadius: "32px",
        p: { xs: 4, md: 8 },
        mb: 8,
        overflow: "hidden",
      }}>
        <Box sx={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", backgroundColor: "#fbcfe8", opacity: 0.4 }} />
        <Box sx={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", backgroundColor: "#ddd6fe", opacity: 0.5 }} />

        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
          <Typography variant="h1" fontWeight={900} sx={{ mb: 3 }}>
            Shop Everything
          </Typography>

          <Typography sx={{ mb: 5, color: "#64748b" }}>
            Discover thousands of curated products across every category.
          </Typography>

          <Link href="/products">
            <Button sx={{ background: "#7c3aed", color: "white", px: 4, py: 1.5 }}>
              Shop Now →
            </Button>
          </Link>
        </Box>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
          Browse Categories
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
              lg: "repeat(7, 1fr)",
            },
            gap: 2,
          }}
        >
          {categories.slice(0, 14).map((cat, i) => (
            <Link key={cat} href={`/products?category=${cat}`} style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  backgroundColor: CAT_COLORS[i % CAT_COLORS.length],
                  border: "2px solid rgba(0,0,0,0.1)",
                  borderRadius: "16px",
                  p: 2,
                  textAlign: "center",
                  fontWeight: 800,
                  color: "#1e1b4b",
                  transition: "0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  },
                }}
              >
                {cat}
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 4 }}>
          Featured Products
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
            justifyItems: "center",
          }}
        >
          {products.map((product, i) => (
            <Box key={product._id} sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <ProductCard product={product} index={i} />
            </Box>
          ))}
        </Box>
      </Box>

    </Container>
  );
}