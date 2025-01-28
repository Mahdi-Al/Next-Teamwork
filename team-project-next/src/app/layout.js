"use client";
import Header from "@/components/header";
import "./globals.css";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light"); // State for theme

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Apply theme class to the body
  useEffect(() => {
    document.body.className = theme; // Set the body class to the current theme
  }, [theme]);

  return (
    <html lang="en">
      <body className={theme}>
        {" "}
        {/* Apply theme class to body */}
        <div className="container">
          <Header toggleTheme={toggleTheme} theme={theme} />{" "}
          {/* Pass toggle function and current theme to Header */}
          <div className="content">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
