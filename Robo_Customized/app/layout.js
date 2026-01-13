import "./globals.css";

export const metadata = {
  title: "AI Image Editor",
  description: "Simple AI-powered image editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
