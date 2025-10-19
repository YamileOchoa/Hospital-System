import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const secciones = [
    {
      titulo: "Pacientes",
      ruta: "/pacientes",
      color: "#2E86DE",
      descripcion: "Gestionar pacientes",
    },
    {
      titulo: "Médicos",
      ruta: "/medicos",
      color: "#28B463",
      descripcion: "Gestionar médicos",
    },
    {
      titulo: "Citas",
      ruta: "/citas",
      color: "#17A2B8",
      descripcion: "Agendar y ver citas",
    },
    {
      titulo: "Consultas",
      ruta: "/consultas",
      color: "#F1C40F",
      descripcion: "Registros médicos",
    },
    {
      titulo: "Facturas",
      ruta: "/facturas",
      color: "#C0392B",
      descripcion: "Control financiero",
    },
  ];

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-dark mb-3">
          Sistema de Gestión Hospitalaria
        </h1>
        <p className="lead text-secondary">
          Panel de control centralizado para la gestión eficiente de tu
          institución médica
        </p>
      </div>

      {/* Módulos principales */}
      <div className="container">
        <div className="row g-4">
          {secciones.map((sec) => (
            <div key={sec.titulo} className="col-md-6 col-lg-4">
              <div
                className="card shadow h-100 border-0 text-center"
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onClick={() => navigate(sec.ruta)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {/* Cabecera sin iconos */}
                <div
                  className="py-4 text-white fw-bold"
                  style={{
                    backgroundColor: sec.color,
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                  }}
                >
                  {sec.titulo}
                </div>

                {/* Cuerpo de la tarjeta */}
                <div className="card-body">
                  <p className="text-muted mb-4">{sec.descripcion}</p>
                  <button
                    className="btn btn-dark btn-sm px-4 rounded-pill fw-semibold"
                    style={{
                      backgroundColor: sec.color,
                      borderColor: sec.color,
                    }}
                  >
                    Acceder →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer informativo */}
      <div className="container mt-5">
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-3">
            <p className="mb-0 text-muted small">
              <strong>Última actualización:</strong>{" "}
              {new Date().toLocaleString("es-ES")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
