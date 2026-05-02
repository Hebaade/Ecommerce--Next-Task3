"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Container, Typography, Box, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Chip, TextField, InputAdornment, Skeleton,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });
  const [deleting, setDeleting] = useState(false);
  const limit = 10;

  const fetchProducts = () => {
    setLoading(true);

    const params = new URLSearchParams({
      limit,
      skip: page * limit,
      ...(search && { search }),
    });

    fetch(`/api/products?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products || []);
        setTotal(data.total || 0);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleDelete = async () => {
    setDeleting(true);
    await fetch(`/api/products/${deleteDialog.product._id}`, {
      method: "DELETE",
    });

    setDeleteDialog({ open: false, product: null });
    setDeleting(false);
    fetchProducts();
  };


  const pastel = {
    bg: "#FAFAFF",
    mint: "#B8F2E6",
    pink: "#F7C8E0",
    blue: "#CDE7FF",
    yellow: "#FFD6A5",
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5, backgroundColor: pastel.bg, minHeight: "100vh" }}>


      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={900}>
            Admin Panel
          </Typography>
          <Typography color="text.secondary">
            Manage your products ({total} total)
          </Typography>
        </Box>

        <Link href="/admin/add">
          <Button
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: pastel.mint,
              color: "#000",
              fontWeight: 800,
              border: "1px solid #000",
            }}
          >
            Add Product
          </Button>
        </Link>
      </Box>

      <TextField
  fullWidth
  placeholder="Search products..."
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setPage(0);
  }}
  sx={{
    mb: 3,
    backgroundColor: "white",
  }}
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    },
  }}
/>
      <TableContainer component={Paper}>
        <Table>

          <TableHead>
            <TableRow sx={{ backgroundColor: pastel.blue }}>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? [...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(6)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : products.map((product) => (
                  <TableRow key={product._id}>

                    <TableCell>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          backgroundColor: pastel.yellow,
                        }}
                      >
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          fill
                          sizes="60px"
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>{product.title}</TableCell>

                    <TableCell>
                      <Chip
                        label={product.category}
                        sx={{ backgroundColor: pastel.pink }}
                      />
                    </TableCell>

                    <TableCell>${product.price}</TableCell>

                    <TableCell>
                      <Chip
                        label={product.stock}
                        sx={{
                          backgroundColor:
                            product.stock > 10 ? pastel.mint : pastel.pink,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Link href={`/admin/edit/${product._id}`}>
                          <IconButton sx={{ backgroundColor: pastel.yellow }}>
                            <EditIcon />
                          </IconButton>
                        </Link>

                        <IconButton
                          onClick={() =>
                            setDeleteDialog({ open: true, product })
                          }
                          sx={{ backgroundColor: pastel.pink }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>

                  </TableRow>
                ))}
          </TableBody>

        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4, alignItems: "center" }}>
        <Button
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          sx={{ backgroundColor: pastel.pink, color: "#000" }}
        >
          ← Prev
        </Button>

        <Typography fontWeight={800}>
          Page {page + 1} of {Math.ceil(total / limit)}
        </Typography>

        <Button
          disabled={products.length < limit}
          onClick={() => setPage((p) => p + 1)}
          sx={{ backgroundColor: pastel.blue, color: "#000" }}
        >
          Next →
        </Button>
      </Box>

      <Dialog open={deleteDialog.open}>
        <DialogTitle>Delete Product?</DialogTitle>

        <DialogContent>
          Are you sure you want to delete{" "}
          <b>{deleteDialog.product?.title}</b>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, product: null })}>
            Cancel
          </Button>

          <Button onClick={handleDelete} disabled={deleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}