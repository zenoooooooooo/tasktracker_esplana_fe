"use client";
import "./globals.css";
import { SnackbarProvider } from "notistack";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Task Tracker</title>
      <SnackbarProvider>
        <body suppressHydrationWarning={true}>{children}</body>
      </SnackbarProvider>
    </html>
  );
}
