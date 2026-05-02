"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Container, Typography, Box, Button, TextField,
  Paper, Alert, Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function EditProductPage({ params }) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    thumbnail: "",
    discountPercentage: "0",
    rating: "0",
  });

  useEffect(() => {
    const loadProduct = async () => {
      const { id } = await params;

      const res = await fetch(`/api/products/${id}`);
      const product = await res.json();

      setForm({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        category: product.category || "",
        brand: product.brand || "",
        thumbnail: product.thumbnail || "",
        discountPercentage: product.discountPercentage?.toString() || "0",
        rating: product.rating?.toString() || "0",
      });

      setLoading(false);
    };

    loadProduct();
  }, [params]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { id } = await params;

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        discountPercentage: parseFloat(form.discountPercentage),
        rating: parseFloat(form.rating),
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Failed to update product.");
      setSaving(false);
    }
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: "white",
      "& fieldset": { borderColor: "#E5E5E5" },
      "&:hover fieldset": { borderColor: "#bbb" },
      "&.Mui-focused fieldset": { borderColor: "#4ecdc4" },
    },
  };

  const pastel = {
    bg: "#FAFAFF",
    card: "#FFFFFF",
    mint: "#B8F2E6",
    blue: "#CDE7FF",
    pink: "#F7C8E0",
    yellow: "#FFD6A5",
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Skeleton variant="rounded" height={500} />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6, backgroundColor: pastel.bg }}>

    
      <Link href="/admin" style={{ textDecoration: "none" }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 3,
          color: "#333",
          fontWeight: 700,
        }}>
          <ArrowBackIcon fontSize="small" />
          Back to Admin
        </Box>
      </Link>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: "18px",
          backgroundColor: pastel.card,
          border: "1px solid #E6E6E6",
        }}
      >

        <Typography variant="h5" fontWeight={900} sx={{ mb: 1 }}>
          Edit Product
        </Typography>

        <Typography sx={{ mb: 3 }} color="text.secondary">
          Update product information
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}


        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >

        
          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField fullWidth label="Title"
              name="title" value={form.title}
              onChange={handleChange} sx={inputSx}
            />
          </Box>

         
          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField fullWidth multiline rows={3}
              label="Description" name="description"
              value={form.description}
              onChange={handleChange} sx={inputSx}
            />
          </Box>

          <TextField label="Price" name="price"
            type="number" value={form.price}
            onChange={handleChange} sx={inputSx}
          />

          <TextField label="Stock" name="stock"
            type="number" value={form.stock}
            onChange={handleChange} sx={inputSx}
          />

          <TextField label="Category" name="category"
            value={form.category} onChange={handleChange}
            sx={inputSx}
          />

          <TextField label="Brand" name="brand"
            value={form.brand} onChange={handleChange}
            sx={inputSx}
          />

          <TextField label="Discount %" name="discountPercentage"
            type="number" value={form.discountPercentage}
            onChange={handleChange} sx={inputSx}
          />

          <TextField label="Rating" name="rating"
            type="number" value={form.rating}
            onChange={handleChange} sx={inputSx}
          />

          
          <Box sx={{ gridColumn: "1 / -1" }}>
            <TextField fullWidth label="Thumbnail URL"
              name="thumbnail" value={form.thumbnail}
              onChange={handleChange} sx={inputSx}
            />
          </Box>

    
          {form.thumbnail && (
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Box sx={{
                width: 120,
                height: 120,
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #ddd",
                backgroundColor: pastel.blue,
                mt: 1,
              }}>
                <img
                  src={form.thumbnail}
                  alt="preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Box>
          )}

          <Box sx={{ gridColumn: "1 / -1" }}>
            <Button
              type="submit"
              fullWidth
              disabled={saving}
              startIcon={<SaveIcon />}
              sx={{
                mt: 2,
                backgroundColor: pastel.mint,
                color: "#000",
                fontWeight: 800,
                py: 1.5,
                borderRadius: "12px",
                border: "1px solid #000",
                "&:hover": { backgroundColor: pastel.blue },
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>

        </Box>
      </Paper>
    </Container>
  );
}