import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import citaService from "../../services/citaService";
import medicoService from "../../services/medicoService";
import pacienteService from "../../services/pacienteService";

const CitaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [cita, setCita] = useState({
    idPaciente: "",
    idMedico: "",
    fecha: "",
    hora: "",
    motivo: "",
    estado: "programada",
  });

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    // Cargar pacientes y médicos para los selects
    pacienteService.getAll().then((res) => setPacientes(res.data));
    medicoService.getAllMedicos().then((res) => setMedicos(res.data));

    if (id) {
      citaService.getById(id).then((response) => {
        setCita(response.data);
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setCita((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await citaService.update(id, cita);
        setMessage("Cita actualizada correctamente");
      } else {
        await citaService.create(cita);
        setMessage("Cita creada correctamente");
      }
      setTimeout(() => navigate("/citas"), 1500);
    } catch (error) {
      setMessage("Error al guardar la cita");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4 text-center">
            {id ? "Editar Cita" : "Nueva Cita"}
          </h2>

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

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Paciente *</label>
                <select
                  name="idPaciente"
                  value={cita.idPaciente}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">-- Selecciona un paciente --</option>
                  {pacientes.map((p: any) => (
                    <option key={p.idPaciente} value={p.idPaciente}>
                      {p.nombres} {p.apellidos}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Médico *</label>
                <select
                  name="idMedico"
                  value={cita.idMedico}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">-- Selecciona un médico --</option>
                  {medicos.map((m: any) => (
                    <option key={m.idMedico} value={m.idMedico}>
                      {m.nombres} {m.apellidos}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Fecha *</label>
                <input
                  type="date"
                  name="fecha"
                  value={cita.fecha}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hora *</label>
                <input
                  type="time"
                  name="hora"
                  value={cita.hora}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Motivo *</label>
              <textarea
                name="motivo"
                value={cita.motivo}
                onChange={handleChange}
                required
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label">Estado *</label>
              <select
                name="estado"
                value={cita.estado}
                onChange={handleChange}
                className="form-select"
              >
                <option value="programada">Programada</option>
                <option value="atendida">Atendida</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => navigate("/citas")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CitaForm;
