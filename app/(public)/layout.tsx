import "../globals.css";
import Header from "./components/Header";

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
      <body>
        <div className="flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
