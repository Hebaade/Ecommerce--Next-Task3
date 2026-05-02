"use client";
import { useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box, Container, Typography, TextField,
  Button, Alert, Paper, Divider
} from "@mui/material";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signUp.email({ name, email, password });
    if (error) { setError(error.message); setLoading(false); }
    else router.push("/");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google" });
    } catch (err) {
      setError("Google sign up failed");
      setGoogleLoading(false);
    }
  };

  const pastel = {
    bg: "#FAFAFF", card: "#FFFFFF", border: "#E6E6E6",
    mint: "#B8F2E6", blue: "#CDE7FF", pink: "#F7C8E0", accent: "#CDE7FF",
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px", backgroundColor: "#fff",
      "& fieldset": { borderColor: pastel.border },
      "&:hover fieldset": { borderColor: "#bbb" },
      "&.Mui-focused fieldset": { borderColor: "#999" },
    },
  };

  return (
    <Container maxWidth="sm" sx={{
      py: 8, backgroundColor: pastel.bg,
      minHeight: "100vh", display: "flex", alignItems: "center",
    }}>
      <Paper elevation={0} sx={{
        width: "100%", p: 5, borderRadius: "18px",
        backgroundColor: pastel.card, border: `1px solid ${pastel.border}`,
      }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h5" fontWeight={900}>
            Join ShopZone
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Create your free account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>{error}</Alert>
        )}

        <Button
          fullWidth onClick={handleGoogle} disabled={googleLoading}
          sx={{
            backgroundColor: "#fff", color: "#000", fontWeight: 700,
            border: `1px solid ${pastel.border}`, mb: 3, py: 1.4,
            borderRadius: "12px", "&:hover": { backgroundColor: pastel.accent },
          }}
          startIcon={
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6C12.4 13.2 17.7 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.9 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.9c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.3-10.1 7.3-17.1z"/>
              <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6C1 16.5 0 20.1 0 24s1 7.5 2.7 10.7l7.8-6z"/>
              <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.6-5.9c-2 1.4-4.6 2.2-7.6 2.2-6.3 0-11.6-3.7-13.5-9l-7.8 6C6.7 42.6 14.7 48 24 48z"/>
            </svg>
          }
        >
          {googleLoading ? "Connecting..." : "Continue with Google"}
        </Button>

        <Divider sx={{ mb: 3 }}>
          <Typography fontWeight={700} fontSize="0.8rem" color="text.secondary">OR</Typography>
        </Divider>

        <Box component="form" onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name" value={name}
            onChange={(e) => setName(e.target.value)}
            required fullWidth sx={inputSx}
          />
          <TextField
            label="Email" type="email" value={email}
            onChange={(e) => setEmail(e.target.value)}
            required fullWidth sx={inputSx}
          />
          <TextField
            label="Password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            required fullWidth sx={inputSx}
            slotProps={{ htmlInput: { minLength: 8 } }}  
          />
          <Button
            type="submit" disabled={loading} fullWidth
            sx={{
              mt: 1, backgroundColor: pastel.mint, color: "#000",
              fontWeight: 800, py: 1.5, borderRadius: "12px",
              border: "1px solid #000",
              "&:hover": { backgroundColor: pastel.blue },
            }}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </Button>
        </Box>

        <Typography sx={{ textAlign: "center", mt: 3, fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ textDecoration: "none" }}>
            <Box component="span" sx={{ fontWeight: 800, color: "#666" }}>
              Sign in
            </Box>
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}