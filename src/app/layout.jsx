import "./globals.css";
import PropTypes from "prop-types";
import Header from "./Components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {/* Header */}
        <header className="bg-black w-full py-6 flex flex-col space-y-3 justify-center items-center">
          <Header />
          <p className="text-wheat text-xl">
            Les jeux d'hier dans l'univers de demain !
          </p>
        </header>
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
