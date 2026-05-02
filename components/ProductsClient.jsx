"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

import MuiTextField from "@mui/material/TextField";

import {
  Select, MenuItem, FormControl, InputLabel,
  Box, Button, Typography, InputAdornment, Skeleton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function ProductsClient() {
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const limit = 12;


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);


  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories);
  }, []);


  useEffect(() => {
    if (!mounted) return;

    setLoading(true);

    const params = new URLSearchParams({
      limit,
      skip: page * limit,
      ...(search && { search }),
      ...(category && { category }),
    });

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, [search, category, page, mounted]);

  if (!mounted) return null;

  return (
    <>

      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap", alignItems: "center" }}>
        
        <MuiTextField
  placeholder="Search products..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setPage(0);
  }}
  sx={{
    flex: 1,
    minWidth: 240,
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      backgroundColor: "#fff",
      border: "1px solid #e5e7eb",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
      "& fieldset": { border: "none" },
      "&:hover": { border: "1px solid #c4b5fd" },
      "&.Mui-focused": {
        border: "1px solid #7c3aed",
        boxShadow: "0 0 0 3px rgba(124,58,237,0.15)",
      },
    },
  }}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: "#94a3b8" }} />
        </InputAdornment>
      ),
    },
  }}
/>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(0);
            }}
            sx={{
              borderRadius: "16px",
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              "& fieldset": { border: "none" },
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" sx={{ height: 360, borderRadius: "20px" }} />
            ))
          : products.map((product, i) => (
              <Box key={product._id} sx={{ display: "flex" }}>
                <ProductCard product={product} index={i} />
              </Box>
            ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 6, alignItems: "center" }}>
        <Button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          sx={{
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#fff",
            color: "#1e1b4b",
          }}
        >
          ← Prev
        </Button>

        <Typography fontWeight={800}>Page {page + 1}</Typography>

        <Button
          disabled={products.length < limit}
          onClick={() => setPage((p) => p + 1)}
          sx={{
            borderRadius: "12px",
            background: "linear-gradient(135deg, #7c3aed, #db2777)",
            color: "white",
          }}
        >
          Next →
        </Button>
      </Box>
    </>
  );
}