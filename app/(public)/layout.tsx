import "../globals.css";

export const metadata = {
  title: "Jalla Mulhouse | Linge de maison et décoration",
  description: "Spécialiste du linge de maison et de la décoration depuis 2001",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
