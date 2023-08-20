import "../globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata = {
  title: "Jalla Mulhouse | Linge de maison et décoration",
  description: "Spécialiste du linge de maison et de la décoration depuis 2001",
};

export default async function RootLayout({
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
          <Footer />
        </div>
      </body>
    </html>
  );
}
