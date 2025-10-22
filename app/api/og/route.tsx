import React from "react";
import { ImageResponse } from "next/og";
import API_BASE_URL, { APP_BASE_URL } from "@/config/apiConfig";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

function loadFont(fontFileName: string) {
  const fontPath = path.join(process.cwd(), "public/fonts", fontFileName);
  return fs.readFileSync(fontPath);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slugKey = searchParams.get("slugKey");
  const greatVibesFont = loadFont("GreatVibes-Regular.ttf");
  const robotoMediumFont = loadFont("roboto-flex-regular.ttf");
  const robotoRegularFont = loadFont("roboto-flex-regular.ttf");

  const obituary = await fetch(
    `${API_BASE_URL}/obituary/memory?slugKey=${slugKey}`
  )
    .then(async (res) => {
      const data = await res.json();
      return data.obituary;
    })
    .catch((error) => {
      console.error("Failed to fetch obituary data:", error);
      return null;
    });

  if (!obituary) {
    return new Response("Not found", { status: 404 });
  }

  const imageUrl = `${APP_BASE_URL}/user5.jpeg`;

  if (!obituary) {
    return new Response("Not found", { status: 404 });
  }

  const name = `${obituary?.name} ${obituary?.sirName}`;
  const location = `${obituary?.location}`;

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
            gap: "47px",
            padding: "15px 15px",
            borderRadius: "16px",
            width: "1002px",
            position: "absolute",
            top: "4%",
            right: "2.7%",
            height: "266px",
            backgroundColor: "rgba(255,255,255,0.4)",
            border: "2px solid #ffffff",
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
              boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <img
              src={imageUrl}
              alt="Obituary"
              width={175}
              height={216}
              style={{
                borderRadius: "12px",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Right text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "216px",
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
                fontSize: "56px",
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
          data: greatVibesFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Roboto Flex",
          data: robotoMediumFont,
          weight: 500,
          style: "normal",
        },
        {
          name: "Roboto Flex",
          data: robotoRegularFont,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );
}
