import React from "react";
import { ImageResponse } from "next/og";
import APP_BASE_URL from "@/config/appConfig";
import API_BASE_URL from "@/config/apiConfig";
import sharp from "sharp";

export const runtime = "nodejs";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:opsz,wght@8..144,100..1000&display=swap&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slugKey = searchParams.get("slugKey");
  const fontData = await fetch(
    new URL("/fonts/GreatVibes-Regular.ttf", req.url)
  ).then((res) => res.arrayBuffer());

  const obituary = await fetch(
    `${API_BASE_URL}/obituary/memory?slugKey=${slugKey}`
  ).then(async (res) => {
    const data = await res.json();
    return data.obituary;
  });

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

  const name = `${obituary?.name} ${obituary?.sirName}`;
  const location = `Trebelno`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "1200px",
          height: "630px",
          display: "flex", // ✅ Required for multiple children
          flexDirection: "column", // stack card + footer vertically
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={`${APP_BASE_URL}/fb-post-bg.png`}
          alt="Memory page hero background"
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
            gap: "45px",
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
              width: "175px",
              height: "216px",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex", // ✅ required if img inside
              border: "4px solid white",
            }}
          >
            <img
              src={convertedImageUrl}
              alt="Obituary"
              width={175}
              height={216}
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
              justifyContent: "space-between",
              height: "98%",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "48px",
                color: "#414B5A",
                fontFamily: "GreatVibes",
              }}
            >
              Za vedno v naših srcih
            </div>
            <div
              style={{
                fontSize: "64px",
                fontWeight: 500,
                color: "#292424",
                display: "flex",
                fontFamily: "Roboto Flex",
                letterSpacing: "-0.01em",
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "40px",
                  color: "#3C3E41",
                  display: "flex",
                  fontFamily: "Roboto Flex",
                  letterSpacing: "-0.01em",
                }}
              >
                {location}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GreatVibes",
          data: fontData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Roboto Flex",
          data: await loadGoogleFont("Roboto Flex", name),
          style: "normal",
          weight: 500,
        },
        {
          name: "Roboto Flex",
          data: await loadGoogleFont("Roboto Flex", location),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
