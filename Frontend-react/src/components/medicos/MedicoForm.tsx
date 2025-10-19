import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import medicoService from "../../services/medicoService";

const MedicoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Datos del médico
  const [medico, setMedico] = useState({
    nombres: "",
    apellidos: "",
    colegiatura: "",
    telefono: "",
    correo: "",
    estado: "activo",
  });

  // Especialidades
  const [especialidades, setEspecialidades] = useState([]);
  const [idEspecialidad, setIdEspecialidad] = useState("");

  useEffect(() => {
    cargarEspecialidades();
    if (id) cargarMedico(id);
  }, [id]);

  // Cargar médico si se está editando
  const cargarMedico = async (idMedico) => {
    try {
      const response = await medicoService.getMedicoById(idMedico);
      if (response.data) {
        setMedico(response.data);
        if (response.data.especialidad)
          setIdEspecialidad(response.data.especialidad.idEspecialidad);
      }
    } catch (error) {
      setAlertType("danger");
      setMessage("Error al cargar médico");
    }
  };

  // Cargar especialidades
  const cargarEspecialidades = async () => {
    try {
      const response = await medicoService.getAllEspecialidades();
      setEspecialidades(response.data);
    } catch (error) {
      console.error("Error al cargar especialidades", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedico({ ...medico, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idEspecialidad) {
      setAlertType("warning");
      setMessage("Seleccione una especialidad");
      return;
    }

    const medicoData = {
      ...medico,
      especialidad: { idEspecialidad: parseInt(idEspecialidad) },
    };

    try {
      if (id) {
        await medicoService.updateMedico(id, medicoData);
        setAlertType("success");
        setMessage("✅ Médico actualizado correctamente");
      } else {
        await medicoService.createMedico(medicoData);
        setAlertType("success");
        setMessage("✅ Médico creado correctamente");
      }

      // Redirigir después de 1.5s
      setTimeout(() => navigate("/medicos"), 1500);
    } catch (error) {
      console.error("Error al guardar médico:", error);

      // Captura mensaje del backend (por ejemplo, "La colegiatura ya está registrada")
      if (error.response && error.response.data) {
        const backendMsg = error.response.data.message || error.response.data;
        setAlertType("danger");
        setMessage(`⚠️ ${backendMsg}`);
      } else {
        setAlertType("danger");
        setMessage("❌ Error al guardar médico. Intente nuevamente.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">{id ? "Editar Médico" : "Nuevo Médico"}</h4>
        </div>
        <div className="card-body">
          {message && (
            <div className={`alert alert-${alertType}`} role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Nombres y Apellidos */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombres *</label>
                <input
                  type="text"
                  name="nombres"
                  value={medico.nombres}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Apellidos *</label>
                <input
                  type="text"
                  name="apellidos"
                  value={medico.apellidos}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            {/* Colegiatura, Teléfono, Correo */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label">Colegiatura *</label>
                <input
                  type="text"
                  name="colegiatura"
                  value={medico.colegiatura}
                  onChange={handleChange}
                  required
                  className="form-control"
                  disabled={!!id}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={medico.telefono}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={medico.correo}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Estado */}
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                name="estado"
                value={medico.estado}
                onChange={handleChange}
                className="form-select"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Especialidad */}
            <div className="mb-4">
              <label className="form-label">Especialidad *</label>
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  value={idEspecialidad}
                  onChange={(e) => setIdEspecialidad(e.target.value)}
                  required
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((esp) => (
                    <option key={esp.idEspecialidad} value={esp.idEspecialidad}>
                      {esp.nombre}
                    </option>
                  ))}
                </select>
                {/* Botón para agregar nueva especialidad */}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => navigate("/especialidades")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="d-flex justify-content-end gap-2">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/medicos")}
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

export default MedicoForm;
