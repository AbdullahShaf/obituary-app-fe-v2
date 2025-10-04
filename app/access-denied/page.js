"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AccessDeniedContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const isGeoBlocked = reason === "geo";

  return (
    <div style={{ 
      padding: "2rem", 
      textAlign: "center", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: "#f8f9fa"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "3rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px"
      }}>
        <h1 style={{ 
          fontSize: "2rem", 
          marginBottom: "1rem", 
          color: "#dc3545" 
        }}>
          {isGeoBlocked ? "Dostop ni dovoljen" : "Access Denied"}
        </h1>
        
        {isGeoBlocked ? (
          <div>
            <p style={{ 
              fontSize: "1.1rem", 
              marginBottom: "1rem", 
              color: "#6c757d" 
            }}>
              Ta storitev trenutno ni na voljo v vaši regiji.
            </p>
            <p style={{ 
              fontSize: "0.9rem", 
              color: "#6c757d" 
            }}>
              This service is currently not available in your region.
            </p>
          </div>
        ) : (
          <p style={{ 
            fontSize: "1.1rem", 
            color: "#6c757d" 
          }}>
            You do not have permission to view this page.
          </p>
        )}
      </div>
    </div>
  );
}

export default function AccessDenied() {
  return (
    <Suspense fallback={
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        Loading...
      </div>
    }>
      <AccessDeniedContent />
    </Suspense>
  );
}
