import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build A Society — Xây dựng xã hội",
  description:
    "Game mô phỏng quá trình hình thành nhà nước theo lý luận Marx – Lenin.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
