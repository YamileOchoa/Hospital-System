import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import consultaService from "../../services/consultaService";

const ConsultaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [consulta, setConsulta] = useState({
    idCita: "",
    idMedico: "",
    idPaciente: "",
    fecha: "",
    hora: "",
    motivoConsulta: "",
    observaciones: "",
  });

  useEffect(() => {
    if (id) {
      cargarConsulta(id);
    }
  }, [id]);

  const cargarConsulta = async (consultaId: string) => {
    try {
      const response = await consultaService.getById(consultaId);
      if (response.data) {
        setConsulta(response.data);
      }
    } catch (error) {
      setMessage("Error al cargar consulta");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setConsulta({ ...consulta, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await consultaService.update(id, consulta);
        setMessage("Consulta actualizada correctamente");
      } else {
        await consultaService.create(consulta);
        setMessage("Consulta creada correctamente");
      }
      setTimeout(() => {
        navigate("/consultas");
      }, 1500);
    } catch (error) {
      setMessage("Error al guardar consulta");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            {id ? "Editar Consulta" : "Nueva Consulta"}
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
              <div className="col-md-4">
                <label className="form-label">ID Cita *</label>
                <input
                  type="number"
                  name="idCita"
                  value={consulta.idCita}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">ID Médico *</label>
                <input
                  type="number"
                  name="idMedico"
                  value={consulta.idMedico}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">ID Paciente *</label>
                <input
                  type="number"
                  name="idPaciente"
                  value={consulta.idPaciente}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Fecha *</label>
                <input
                  type="date"
                  name="fecha"
                  value={consulta.fecha}
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
                  value={consulta.hora}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Motivo de la Consulta *</label>
              <textarea
                name="motivoConsulta"
                value={consulta.motivoConsulta}
                onChange={handleChange}
                required
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label">Observaciones</label>
              <textarea
                name="observaciones"
                value={consulta.observaciones}
                onChange={handleChange}
                className="form-control"
                rows={3}
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => navigate("/consultas")}
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

export default ConsultaForm;
