import DadaHeader from "./components/DadaHeader";
import PropTypes from "prop-types";

export default function DadaLayout({ children }) {
  return (
    <>
      <DadaHeader />

      {/* Fond vert prenant toute la page sauf le header */}
      <div className="bg-green-600 min-h-[calc(100vh-108px)] flex flex-col items-center py-12 px-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-max shadow-lg">
          {children}
        </div>
      </div>
    </>
  );
}

DadaLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
