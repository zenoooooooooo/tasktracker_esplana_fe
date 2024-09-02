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

      <body suppressHydrationWarning={true}>
        <SnackbarProvider>{children} </SnackbarProvider>
      </body>
    </html>
  );
}
