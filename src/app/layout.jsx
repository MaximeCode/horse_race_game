"use client";

import "./globals.css";
import ToastAlert from "./Components/ToastAlert";
import { LoadingProvider } from "./utils/LoadingContext";
import LayoutContent from "./Components/LayoutContent";

import PropTypes from "prop-types";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <LoadingProvider>
          <ToastAlert />

          <LayoutContent>{children}</LayoutContent>
        </LoadingProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
