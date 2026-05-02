import Image from "next/image";
import Link from "next/link";
import {
  Container, Typography, Box, Chip, Rating,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddToCartButton from "@/components/AddToCartButton";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const revalidate = 60; 

async function getProduct(id) {
  try {
    const client = await clientPromise;
    const db = client.db("shopzone");

    let product = null;

    if (ObjectId.isValid(id)) {
      product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    }

    if (!product) {
      product = await db.collection("products").findOne({ id: parseInt(id) });
    }

    if (!product) return null;

    return JSON.parse(JSON.stringify({ ...product, _id: product._id.toString() }));
  } catch (err) {
    return null;
  }
}

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db("shopzone");
  const products = await db.collection("products").find({}, { projection: { _id: 1 } }).limit(50).toArray();
  return products.map((p) => ({ id: p._id.toString() }));
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography fontWeight={900}>Product not found</Typography>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Typography sx={{ mt: 2, color: "#7c3aed", fontWeight: 700 }}>← Back</Typography>
        </Link>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Link href="/products" style={{ textDecoration: "none" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4, color: "#475569", "&:hover": { color: "#7c3aed" }, transition: "color 0.2s" }}>
          <ArrowBackIcon fontSize="small" />
          <Typography fontWeight={700}>Back to Products</Typography>
        </Box>
      </Link>

      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 6, alignItems: "start",
      }}>
        <Box>
          <Box sx={{
            position: "relative", height: 380,
            borderRadius: "24px", border: "1.5px solid #e2e8f0",
            backgroundColor: "#fdf4ff", overflow: "hidden", mb: 2,
          }}>
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "contain", padding: "30px" }}
            />
          </Box>

          {product.images?.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap" }}>
              {product.images.slice(0, 5).map((img, i) => (
                <Box key={i} sx={{
                  position: "relative", width: 70, height: 70,
                  borderRadius: "12px", border: "1.5px solid #e2e8f0",
                  overflow: "hidden", backgroundColor: "white",
                }}>
                  <Image src={img} alt="" fill sizes="80px" style={{ objectFit: "contain", padding: "6px" }} />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box>
          <Chip label={product.category} sx={{
            mb: 2, backgroundColor: "#ede9fe", color: "#5b21b6", fontWeight: 800,
          }} />

          <Typography variant="h4" fontWeight={900} sx={{ mb: 1, color: "#1e1b4b" }}>
            {product.title}
          </Typography>

          <Typography sx={{ color: "#64748b", mb: 3, lineHeight: 1.7 }}>
            {product.description}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Rating value={product.rating} precision={0.1} readOnly size="small" />
              <Typography fontWeight={700} sx={{ color: "#1e1b4b" }}>{product.rating}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InventoryIcon fontSize="small" sx={{ color: "#94a3b8" }} />
              <Typography fontWeight={700} sx={{ color: "#1e1b4b" }}>{product.stock} in stock</Typography>
            </Box>
            {product.brand && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocalOfferIcon fontSize="small" sx={{ color: "#94a3b8" }} />
                <Typography fontWeight={700} sx={{ color: "#1e1b4b" }}>{product.brand}</Typography>
              </Box>
            )}
          </Box>

          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            backgroundColor: "#faf5ff", border: "1.5px solid #e9d5ff",
            borderRadius: "16px", p: 2.5, mb: 3,
          }}>
            <Typography fontSize="2.2rem" fontWeight={900} sx={{ color: "#1e1b4b" }}>
              ${product.price}
            </Typography>
            {product.discountPercentage > 0 && (
              <Chip
                label={`-${Math.round(product.discountPercentage)}% OFF`}
                sx={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", color: "white", fontWeight: 900 }}
              />
            )}
          </Box>

          <AddToCartButton product={product} />
        </Box>
      </Box>
    </Container>
  );
}