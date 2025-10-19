import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHospital,
  FaUserInjured,
  FaCalendarAlt,
  FaUserMd,
  FaStethoscope,
  FaFileInvoice,
} from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{
        backgroundColor: "#1e293b",
      }}
    >
      <div className="container">
        <NavLink
          to="/"
          className="navbar-brand d-flex align-items-center text-white"
          style={{ fontWeight: 700 }}
        >
          <FaHospital className="me-2 fs-4 text-info" />
          <span>Hospital System</span>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(255,255,255,0.3)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/pacientes", label: "Pacientes", icon: FaUserInjured },
              { to: "/citas", label: "Citas", icon: FaCalendarAlt },
              { to: "/medicos", label: "Médicos", icon: FaUserMd },
              { to: "/consultas", label: "Consultas", icon: FaStethoscope },
              { to: "/facturas", label: "Facturación", icon: FaFileInvoice },
            ].map(({ to, label, icon: Icon }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav-link d-flex align-items-center ${
                      isActive
                        ? "fw-bold text-info"
                        : "text-light opacity-75 hover-opacity-100"
                    }`
                  }
                  style={{
                    transition: "color 0.2s ease",
                    marginLeft: "0.8rem",
                  }}
                >
                  <Icon className="me-2" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
