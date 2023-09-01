import React from "react";
import { PropagateLoader } from "react-spinners";

function LoaderBox({ loader = true }) {
  return (
    <section className="main-content">
      <div className="row d-flex justify-content-center">
        <PropagateLoader color="blue" loading={loader} />
      </div>
    </section>
  );
}

export default LoaderBox;
