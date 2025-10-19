import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pacienteService from "../../services/pacienteService";

const PacienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [paciente, setPaciente] = useState({
    dni: "",
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    sexo: "M",
    direccion: "",
    telefono: "",
    correo: "",
    estado: "activo",
  });

  useEffect(() => {
    if (id) {
      cargarPaciente(id);
    }
  }, [id]);

  const cargarPaciente = async (pacienteId) => {
    try {
      const response = await pacienteService.getById(pacienteId);
      if (response.data) {
        setPaciente(response.data);
      }
    } catch (error) {
      setMessage("Error al cargar paciente");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await pacienteService.update(id, paciente);
        setMessage("✅ Paciente actualizado correctamente");
      } else {
        await pacienteService.create(paciente);
        setMessage("✅ Paciente creado correctamente");
      }
      setTimeout(() => navigate("/pacientes"), 1500);
    } catch (error) {
      setMessage("❌ Error al guardar paciente");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">{id ? "Editar Paciente" : "Nuevo Paciente"}</h4>
        </div>

        <div className="card-body">
          {message && (
            <div
              className={`alert ${
                message.includes("Error") ? "alert-danger" : "alert-success"
              } text-center`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">
                  DNI <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="dni"
                  value={paciente.dni}
                  onChange={handleChange}
                  maxLength="8"
                  required
                  className="form-control"
                  disabled={!!id}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Nombres <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="nombres"
                  value={paciente.nombres}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Apellidos <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="apellidos"
                  value={paciente.apellidos}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">
                  Fecha de Nacimiento <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={paciente.fechaNacimiento}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">
                  Sexo <span className="text-danger">*</span>
                </label>
                <select
                  name="sexo"
                  value={paciente.sexo}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={paciente.direccion}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={paciente.telefono}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={paciente.correo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Estado</label>
                <select
                  name="estado"
                  value={paciente.estado}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-success px-4">
                💾 Guardar
              </button>
              <button
                type="button"
                className="btn btn-danger px-4"
                onClick={() => navigate("/pacientes")}
              >
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PacienteForm;
