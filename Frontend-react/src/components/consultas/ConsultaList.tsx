import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import consultaService from "../../services/consultaService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ConsultaList = () => {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    cargarConsultas();
  }, []);

  const cargarConsultas = async () => {
    try {
      const response = await consultaService.getAll();
      setConsultas(response.data);
      setLoading(false);
    } catch (error) {
      setMessage("Error al cargar consultas");
      setLoading(false);
    }
  };

  const eliminarConsulta = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar esta consulta?")) {
      try {
        await consultaService.delete(id);
        setMessage("Consulta eliminada correctamente");
        cargarConsultas();
      } catch (error) {
        setMessage("Error al eliminar consulta");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-muted">Cargando consultas...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          {/* Encabezado */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary m-0">
              🩺 Gestión de Consultas
            </h2>
            <Link to="/consultas/nueva" className="btn btn-primary">
              <FaPlus className="me-2" /> Nueva Consulta
            </Link>
          </div>

          {/* Alertas */}
          {message && (
            <div
              className={`alert ${
                message.includes("Error") ? "alert-danger" : "alert-success"
              } alert-dismissible fade show`}
              role="alert"
            >
              {message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Tabla */}
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>ID Cita</th>
                  <th>ID Médico</th>
                  <th>ID Paciente</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Motivo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {consultas.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-4 text-muted">
                      No hay consultas registradas.
                    </td>
                  </tr>
                ) : (
                  consultas.map((consulta) => (
                    <tr key={consulta.idConsulta}>
                      <td>{consulta.idConsulta}</td>
                      <td>{consulta.idCita}</td>
                      <td>{consulta.idMedico}</td>
                      <td>{consulta.idPaciente}</td>
                      <td>{consulta.fecha}</td>
                      <td>{consulta.hora}</td>
                      <td>{consulta.motivoConsulta}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/consultas/editar/${consulta.idConsulta}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() =>
                              eliminarConsulta(consulta.idConsulta)
                            }
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultaList;
