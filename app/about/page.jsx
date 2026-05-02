import { Container, Typography, Box } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      <Box
        sx={{
          textAlign: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            background: "linear-gradient(135deg, #7c3aed, #db2777)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          About ShopZone
        </Typography>

        <Typography sx={{ color: "#64748b", maxWidth: 600, mx: "auto" }}>
          We are building a modern shopping experience that feels smooth,
          fast, and enjoyable.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
            background: "#fdf4ff",
          }}
        >
          <Typography fontWeight={900} mb={1}>
             Our Mission
          </Typography>

          <Typography sx={{ color: "#475569" }}>
            To provide a seamless shopping experience with modern UI,
            fast performance, and intuitive design.
          </Typography>
        </Box>

        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
            background: "#f0fdf4",
          }}
        >
          <Typography fontWeight={900} mb={1}>
             Our Vision
          </Typography>

          <Typography sx={{ color: "#475569" }}>
            To become a leading platform where users enjoy browsing and
            buying without friction.
          </Typography>
        </Box>

   
        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
            background: "#eff6ff",
          }}
        >
          <Typography fontWeight={900} mb={1}>
             Built With
          </Typography>

          <Typography sx={{ color: "#475569" }}>
            Next.js, MongoDB, Zustand, and Material UI for a modern
            scalable experience.
          </Typography>
        </Box>


        <Box
          sx={{
            p: 3,
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
            background: "#fff7ed",
          }}
        >
          <Typography fontWeight={900} mb={1}>
             Why This Project?
          </Typography>

          <Typography sx={{ color: "#475569" }}>
            This project is built to practice full-stack development,
            combining UI design with real backend logic.
          </Typography>
        </Box>
      </Box>

    </Container>
  );
}