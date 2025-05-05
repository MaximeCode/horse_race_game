import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      data-theme="night">
      <body>{children}</body>
    </html>
  );
}
