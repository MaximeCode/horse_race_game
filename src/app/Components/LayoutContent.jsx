"use client";

import PropTypes from "prop-types";
import React from "react";

import { useLoading } from "@/app/utils/LoadingContext";

export default function LayoutContent({ children }) {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <div className="absolute top-10 left-10 z-50">
          <span className="loading loading-spinner loading-xl text-success"></span>
        </div>
      )}

      {children}
    </>
  );
}
LayoutContent.propTypes = {
  children: PropTypes.node.isRequired,
};
