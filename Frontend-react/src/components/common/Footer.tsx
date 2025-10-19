import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 border-top mt-auto">
      <div className="container">
        <p className="mb-1">
          &copy; 2025 <strong>Hospital System</strong>. Todos los derechos
          reservados.
        </p>
        <p className="mb-0 text-secondary small">
          Desarrollado con <span className="text-info fw-bold">React</span> y{" "}
          <span className="text-success fw-bold">Spring Boot</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
