"use client";

import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        background: "linear-gradient(135deg, #ede9fe, #fce7f3)",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 5 }}>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "2fr 1fr 1fr",
            },
            gap: 4,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={900}
              sx={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              ShopZone
            </Typography>

            <Typography sx={{ color: "#64748b", maxWidth: 400 }}>
              Your favorite place to discover amazing products with smooth
              experience and modern design.
            </Typography>
          </Box>

          <Box>
            <Typography fontWeight={800} mb={1}>
              Quick Links
            </Typography>

            {[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
              { label: "About", href: "/about" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    color: "#475569",
                    mb: 0.5,
                    "&:hover": { color: "#7c3aed" },
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Box>

          <Box>
            <Typography fontWeight={800} mb={1}>
              Follow Us
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              {[FacebookIcon, InstagramIcon, TwitterIcon, GitHubIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    "&:hover": {
                      backgroundColor: "#fce7f3",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider />

        <Typography
         
          sx={{ mt: 3, color: "#64748b", fontSize: "0.9rem" , textAlign: "center" }}
        >
          © {new Date().getFullYear()} ShopZone. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}