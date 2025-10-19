import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import medicoService from "../../services/medicoService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const MedicoList = () => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    cargarMedicos();
  }, []);

  const cargarMedicos = async () => {
    try {
      const response = await medicoService.getAllMedicos();
      setMedicos(response.data);
      setLoading(false);
    } catch (error) {
      setMessage("Error al cargar médicos");
      setLoading(false);
    }
  };

  const eliminarMedico = async (id) => {
    if (window.confirm("¿Seguro que desea eliminar este médico?")) {
      try {
        await medicoService.deleteMedico(id);
        setMessage("Médico eliminado correctamente");
        cargarMedicos();
      } catch (error) {
        setMessage("Error al eliminar médico");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">🩺 Cargando médicos...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          {/* Encabezado */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary m-0">👨‍⚕️ Gestión de Médicos</h2>
            <Link to="/medicos/nuevo" className="btn btn-primary">
              <FaPlus className="me-2" /> Nuevo Médico
            </Link>
          </div>

          {/* Alertas */}
          {message && (
            <div
              className={`alert ${
                message.includes("Error") ? "alert-danger" : "alert-success"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          {/* Tabla */}
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Colegiatura</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {medicos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-muted py-4">
                      Sin médicos registrados.
                    </td>
                  </tr>
                ) : (
                  medicos.map((medico) => (
                    <tr key={medico.idMedico}>
                      <td>{medico.idMedico}</td>
                      <td>{medico.nombres}</td>
                      <td>{medico.apellidos}</td>
                      <td>{medico.colegiatura}</td>
                      <td>{medico.telefono}</td>
                      <td>{medico.correo}</td>
                      <td>
                        <span
                          className={`badge ${
                            medico.estado.toLowerCase() === "activo"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {medico.estado}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/medicos/editar/${medico.idMedico}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => eliminarMedico(medico.idMedico)}
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

export default MedicoList;
