import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import medicoService from "../../services/medicoService";

const EspecialidadList = () => {
  const navigate = useNavigate(); // ✅ Definir navigate
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    cargarEspecialidades();
  }, []);

  const cargarEspecialidades = async () => {
    try {
      const response = await medicoService.getAllEspecialidades();
      setEspecialidades(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage("Error al cargar especialidades");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setMessage("El nombre es obligatorio");
      return;
    }

    try {
      await medicoService.createEspecialidad({ nombre, descripcion });
      setMessage("Especialidad creada correctamente");
      setNombre("");
      setDescripcion("");
      cargarEspecialidades(); // refresca la lista
    } catch (error) {
      setMessage("Error al crear especialidad");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando especialidades...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Mensaje de alerta */}
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

      {/* Formulario para agregar especialidad */}
      <div className="card mb-4 shadow-sm p-3">
        <h5 className="mb-3 text-primary">Agregar Nueva Especialidad</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar Especialidad
          </button>
        </form>
      </div>

      {/* Tabla de especialidades */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-muted py-4">
                  No hay especialidades registradas.
                </td>
              </tr>
            ) : (
              especialidades.map((esp) => (
                <tr key={esp.idEspecialidad}>
                  <td>{esp.idEspecialidad}</td>
                  <td>{esp.nombre}</td>
                  <td>{esp.descripcion}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Botón para regresar */}
      <button
        type="button"
        className="btn btn-outline-primary mt-3"
        onClick={() => navigate("/medicos/nuevo")}
      >
        Regresar
      </button>
    </div>
  );
};

export default EspecialidadList;
