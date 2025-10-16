import React from "react";
import { ImageResponse } from "next/og";
import APP_BASE_URL from "@/config/appConfig";
import API_BASE_URL from "@/config/apiConfig";
import sharp from "sharp";

export const runtime = "nodejs";

function formatObituaryDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

function calculateAge(birthDate?: string, deathDate?: string) {
  if (!birthDate || !deathDate) return "";
  const birth = new Date(birthDate);
  const death = new Date(deathDate);
  let age = death.getFullYear() - birth.getFullYear();
  if (
    death.getMonth() < birth.getMonth() ||
    (death.getMonth() === birth.getMonth() && death.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slugKey = searchParams.get("slugKey");

  const obituary = await fetch(
    `${API_BASE_URL}/obituary/memory?slugKey=${slugKey}`
  ).then(async (res) => {
    const data = await res.json();
    return data.obituary;
  });

  const formattedBirthDate = formatObituaryDate(obituary?.birthDate);
  const formattedDeathDate = formatObituaryDate(obituary?.deathDate);

  const age = calculateAge(obituary?.birthDate, obituary?.deathDate);

  const imageUrl = obituary?.image || `${APP_BASE_URL}/user5.jpeg`;

  let convertedImageUrl = imageUrl;
  try {
    const imageRes = await fetch(imageUrl);
    const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
    const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();
    const base64 = jpegBuffer.toString("base64");
    convertedImageUrl = `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error("Image conversion failed:", error);
  }
  if (!obituary) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "auto",
          display: "flex", // ✅ Required for multiple children
          flexDirection: "column", // stack card + footer vertically
          justifyContent: "center",
          alignItems: "center",
          objectFit: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={`${APP_BASE_URL}/fb-posting-hero-bg.png`}
          alt="Memory page hero background"
          className="mobile:hidden h-auto mobile:h-[315px] w-full object-cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
        {/* Card container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            padding: "30px 50px",
            borderRadius: "16px",
            width: "100%",
            position: "absolute",
            top: "0",
          }}
        >
          {/* Left image */}
          <div
            style={{
              width: "180px",
              height: "250px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              display: "flex", // ✅ required if img inside
            }}
          >
            <img
              src={convertedImageUrl}
              alt="Obituary"
              width={180}
              height={250}
              style={{
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
          </div>

          {/* Right text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "36px",
                fontWeight: 400,
                color: "#414141",
                marginBottom: "10px",
                fontFamily: "Great Vibes, cursive",
              }}
            >
              Za vedno v naših srcih
            </div>

            <div
              style={{
                fontSize: "54px",
                fontWeight: 600,
                color: "#1E2125",
                marginBottom: "10px",
                display: "flex",
              }}
            >
              {obituary?.name} {obituary?.sirName}
            </div>

            <div
              style={{
                fontSize: "28px",
                color: "#414141",
                marginBottom: "8px",
                display: "flex",
              }}
            >
              {formattedBirthDate && formattedDeathDate
                ? `${formattedBirthDate} – ${formattedDeathDate} (${age} let)`
                : formattedDeathDate}
            </div>

            <div
              style={{
                fontSize: "28px",
                color: "#414141",
                display: "flex",
              }}
            >
              {obituary?.location}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            cursor: "pointer",
            justifyContent: "center",
            gap: "16px", // equivalent to mobile gap-3 (0.75rem)
            borderRadius: "6px",
            border: "1px solid #ffffff",
            alignItems: "center",
            width: "auto",
            height: "48px",
            background:
              "linear-gradient(to right, #FFFFFF, rgba(255, 255, 255, 0.3))",
            bottom: "12%",
            right: "3%",
            paddingLeft: "22px",
            paddingRight: "22px",
          }}
        >
          <p
            style={{
              fontFamily: "Roboto Flex",
              color: "#3C3E41",
              fontSize: "22px",
            }}
          >
            Vpis v žalno knjigo in informacije o pogrebu so tukaj
          </p>
          <img
            src={`${APP_BASE_URL}/previous_img.png`}
            style={{
              transform: "rotate(180deg)",
              height: "22.34px",
              width: "15.23px",
              marginTop: "4px",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            position: "absolute",
            bottom: "10px",
            left: "20px",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              color: "rgba(0,0,0,0.5)",
            }}
          >
            osmrtnica.com
          </p>
        </div>
      </div>
    )
  );
}
