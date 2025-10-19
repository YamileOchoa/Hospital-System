import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import citaService from "../../services/citaService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const CitaList = () => {
  const [citas, setCitas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    try {
      const response = await citaService.getAll();
      setCitas(response.data);
      setLoading(false);
    } catch (error) {
      setMessage("Error al cargar citas");
      setLoading(false);
    }
  };

  const eliminarCita = async (id: number) => {
    if (window.confirm("¿Seguro que desea eliminar esta cita?")) {
      try {
        await citaService.delete(id);
        setMessage("Cita eliminada correctamente");
        cargarCitas();
      } catch (error) {
        setMessage("Error al eliminar cita");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-muted">Cargando citas...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          {/* Título y botón */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary m-0">📅 Gestión de Citas</h2>
            <Link to="/citas/nueva" className="btn btn-primary">
              <FaPlus className="me-2" /> Nueva Cita
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
                  <th>Paciente ID</th>
                  <th>Médico ID</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Motivo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {citas.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-4 text-muted">
                      No hay citas registradas.
                    </td>
                  </tr>
                ) : (
                  citas.map((cita) => (
                    <tr key={cita.idCita}>
                      <td>{cita.idCita}</td>
                      <td>{cita.idPaciente}</td>
                      <td>{cita.idMedico}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>{cita.motivo}</td>
                      <td>
                        <span
                          className={`badge px-3 py-2 text-capitalize ${
                            cita.estado === "programada"
                              ? "bg-info"
                              : cita.estado === "atendida"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {cita.estado}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/citas/editar/${cita.idCita}`}
                            className="btn btn-outline-warning btn-sm"
                            title="Editar cita"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => eliminarCita(cita.idCita)}
                            className="btn btn-outline-danger btn-sm"
                            title="Eliminar cita"
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

export default CitaList;
