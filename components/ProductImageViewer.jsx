"use client";

import { useState } from "react";
import Image from "next/image";
import { Box } from "@mui/material";

export default function ProductImageViewer({ product }) {
  const images = [product.thumbnail, ...(product.images || [])];
  const [active, setActive] = useState(images[0]);

  return (
    <Box>

      <Box
        sx={{
          position: "relative",
          height: 420,
          borderRadius: "18px",
          overflow: "hidden",
          backgroundColor: "#fff",
          border: "1px solid #eee",
        }}
      >
        <Image
          src={active}
          alt="product"
          fill
          style={{ objectFit: "contain", padding: 40 }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          mt: 2,
          flexWrap: "wrap",
        }}
      >
        {images.slice(0, 5).map((img, i) => (
          <Box
            key={i}
            onClick={() => setActive(img)}
            sx={{
              width: 70,
              height: 70,
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer",
              border:
                active === img ? "2px solid #7c3aed" : "1px solid #e5e7eb",
              transform: active === img ? "scale(1.05)" : "scale(1)",
              transition: "0.2s",
              backgroundColor: "#fff",
            }}
          >
            <Image
              src={img}
              width={70}
              height={70}
              alt=""
              style={{ objectFit: "contain", padding: 6 }}
            />
          </Box>
        ))}
      </Box>

    </Box>
  );
}