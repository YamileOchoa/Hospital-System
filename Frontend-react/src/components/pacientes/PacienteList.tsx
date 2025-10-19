import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pacienteService from "../../services/pacienteService";
import { FaEdit, FaTrash, FaPlus, FaHistory } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const PacienteList = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async () => {
    try {
      const response = await pacienteService.getAll();
      setPacientes(response.data);
      setLoading(false);
    } catch (error) {
      setMessage("Error al cargar pacientes");
      setLoading(false);
    }
  };

  const eliminarPaciente = async (id: number) => {
    if (window.confirm("¿Seguro que desea eliminar este paciente?")) {
      try {
        await pacienteService.delete(id);
        setMessage("Paciente eliminado correctamente");
        cargarPacientes();
      } catch (error) {
        setMessage("Error al eliminar paciente");
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando pacientes...</span>
        </div>
        <p className="text-muted">Cargando pacientes...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary m-0">
              🧍‍♂️ Gestión de Pacientes
            </h2>
            <Link to="/pacientes/nuevo" className="btn btn-success">
              <FaPlus className="me-2" /> Nuevo Paciente
            </Link>
          </div>

          {/* Mensajes */}
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
                  <th>DNI</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Fecha Nacimiento</th>
                  <th>Sexo</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-muted py-4">
                      No hay pacientes registrados.
                    </td>
                  </tr>
                ) : (
                  pacientes.map((paciente) => (
                    <tr key={paciente.idPaciente}>
                      <td>{paciente.idPaciente}</td>
                      <td>{paciente.dni}</td>
                      <td>{paciente.nombres}</td>
                      <td>{paciente.apellidos}</td>
                      <td>{paciente.fechaNacimiento}</td>
                      <td>{paciente.sexo}</td>
                      <td>{paciente.telefono}</td>
                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            paciente.estado === "activo"
                              ? "bg-success"
                              : "bg-secondary"
                          }`}
                        >
                          {paciente.estado}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/pacientes/historia/${paciente.idPaciente}`}
                            className="btn btn-outline-info btn-sm"
                            title="Ver historia"
                          >
                            <FaHistory />
                          </Link>
                          <Link
                            to={`/pacientes/editar/${paciente.idPaciente}`}
                            className="btn btn-outline-warning btn-sm"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() =>
                              eliminarPaciente(paciente.idPaciente)
                            }
                            className="btn btn-outline-danger btn-sm"
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

export default PacienteList;
