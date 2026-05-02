"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useSession, signOut } from "@/lib/auth-client";

import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Badge, Box, Container, Drawer, List, ListItem,
  ListItemText, Divider,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" }
  ];

  if (session?.user) {
    links.push({ href: "/admin", label: "Admin" });
  }

  return (
    <>
      <AppBar position="sticky" sx={{
        backgroundColor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
        color: "black",
      }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>

        
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{
                  background: "linear-gradient(135deg, #7c3aed, #db2777)",
                  color: "white", px: 1.5, py: 0.5,
                  borderRadius: "10px", fontWeight: 900, fontSize: "1.1rem",
                  boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
                }}>
                  Shop
                </Box>
                <Typography fontWeight={900} fontSize="1.4rem" sx={{ color: "#1e1b4b" }}>
                  Zone
                </Typography>
              </Box>
            </Link>

        
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {links.map(({ href, label }) => (
                <Link key={href} href={href} style={{ textDecoration: "none" }}>
                  <Typography fontWeight={700} sx={{
                    color: "#475569",
                    "&:hover": { color: "#7c3aed" },
                    transition: "color 0.2s",
                  }}>
                    {label}
                  </Typography>
                </Link>
              ))}
            </Box>

            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

             
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>

            
              <Link href="/cart">
                <IconButton sx={{
                  backgroundColor: "#fce7f3",
                  borderRadius: "12px",
                  border: "1.5px solid #fbcfe8",
                  "&:hover": { backgroundColor: "#fce7f3", transform: "translateY(-2px)" },
                }}>
                  <Badge badgeContent={totalItems} color="error">
                    <ShoppingCartIcon sx={{ color: "#db2777" }} />
                  </Badge>
                </IconButton>
              </Link>

              {session?.user ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                  <Box sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center", gap: 1,
                    backgroundColor: "#f5f3ff",
                    border: "1.5px solid #ddd6fe",
                    borderRadius: "10px",
                    px: 1.5, py: 0.5,
                  }}>
                    <Box sx={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #db2777)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Typography sx={{ color: "white", fontSize: "0.75rem", fontWeight: 900 }}>
                        {session.user.name?.[0]?.toUpperCase()}
                      </Typography>
                    </Box>
                    <Typography fontWeight={700} fontSize="0.9rem" sx={{ color: "#1e1b4b" }}>
                      {session.user.name}
                    </Typography>
                  </Box>

              
                  <IconButton
                    onClick={() => signOut()}
                    sx={{
                      backgroundColor: "#fee2e2",
                      borderRadius: "12px",
                      border: "1.5px solid #fecaca",
                      "&:hover": { backgroundColor: "#fee2e2", transform: "translateY(-2px)" },
                    }}
                  >
                    <LogoutIcon fontSize="small" sx={{ color: "#dc2626" }} />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                  <Link href="/login">
                    <Button sx={{
                      color: "#1e1b4b", fontWeight: 800,
                      border: "none", boxShadow: "none",
                      "&:hover": { backgroundColor: "#f5f3ff" },
                    }}>
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button sx={{
                      background: "linear-gradient(135deg, #7c3aed, #db2777)",
                      color: "white", fontWeight: 800,
                      borderRadius: "12px", border: "none",
                      boxShadow: "0 4px 12px rgba(124,58,237,0.35)",
                      px: 2.5,
                      "&:hover": {
                        background: "linear-gradient(135deg, #6d28d9, #be185d)",
                        transform: "translateY(-2px)",
                      },
                    }}>
                      Register
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: "0 20px 20px 0" } }}
      >
        <Box sx={{ width: 260, p: 3 }}>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Box sx={{
              background: "linear-gradient(135deg, #7c3aed, #db2777)",
              color: "white", px: 1.5, py: 0.5,
              borderRadius: "10px", fontWeight: 900,
            }}>
              Shop
            </Box>
            <Typography fontWeight={900} sx={{ color: "#1e1b4b" }}>Zone</Typography>
          </Box>

          {session?.user && (
            <Box sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              backgroundColor: "#f5f3ff", borderRadius: "12px",
              p: 1.5, mb: 2, border: "1.5px solid #ddd6fe",
            }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Typography sx={{ color: "white", fontSize: "0.85rem", fontWeight: 900 }}>
                  {session.user.name?.[0]?.toUpperCase()}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={800} fontSize="0.9rem" sx={{ color: "#1e1b4b" }}>
                  {session.user.name}
                </Typography>
                <Typography fontSize="0.75rem" sx={{ color: "#94a3b8" }}>
                  {session.user.email}
                </Typography>
              </Box>
            </Box>
          )}

          <List disablePadding>
            {links.map(({ href, label }) => (
              <ListItem
                key={href}
                onClick={() => setOpen(false)}
                sx={{
                  borderRadius: "10px", mb: 0.5,
                  "&:hover": { backgroundColor: "#f5f3ff" },
                  cursor: "pointer",
                }}
              >
                <Link href={href} style={{ textDecoration: "none", width: "100%" }}>
                  <ListItemText
                    primary={label}
                    primaryTypographyProps={{ fontWeight: 700, color: "#475569" }}
                  />
                </Link>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {session?.user ? (
            <Button
              fullWidth
              onClick={() => { signOut(); setOpen(false); }}
              startIcon={<LogoutIcon />}
              sx={{
                backgroundColor: "#fee2e2", color: "#dc2626",
                fontWeight: 700, borderRadius: "12px",
                border: "1.5px solid #fecaca",
                "&:hover": { backgroundColor: "#fecaca" },
                boxShadow: "none",
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <Button fullWidth onClick={() => setOpen(false)} sx={{
                  border: "1.5px solid #e2e8f0", color: "#1e1b4b",
                  fontWeight: 700, borderRadius: "12px", boxShadow: "none",
                }}>
                  Login
                </Button>
              </Link>
              <Link href="/register" style={{ textDecoration: "none" }}>
                <Button fullWidth onClick={() => setOpen(false)} sx={{
                  background: "linear-gradient(135deg, #7c3aed, #db2777)",
                  color: "white", fontWeight: 800, borderRadius: "12px",
                  border: "none", boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
                }}>
                  Register
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}