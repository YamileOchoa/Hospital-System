import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import pacienteService from "../../services/pacienteService";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap

const HistoriaClinica = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [historia, setHistoria] = useState(null);
  const [antecedentes, setAntecedentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [nuevoAntecedente, setNuevoAntecedente] = useState({
    tipo: "alergias",
    descripcion: "",
  });

  useEffect(() => {
    cargarHistoria();
  }, [id]);

  const cargarHistoria = async () => {
    try {
      const response = await pacienteService.getHistoriaClinica(id);
      if (response.data) {
        setHistoria(response.data);
        const antecedentesResp = await pacienteService.getAntecedentes(
          response.data.idHistoria
        );
        setAntecedentes(antecedentesResp.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoAntecedente({ ...nuevoAntecedente, [name]: value });
  };

  const agregarAntecedente = async (e) => {
    e.preventDefault();
    try {
      await pacienteService.addAntecedente(
        historia.idHistoria,
        nuevoAntecedente
      );
      setNuevoAntecedente({ tipo: "alergias", descripcion: "" });
      setShowForm(false);
      cargarHistoria();
    } catch (error) {
      console.error("Error al agregar antecedente", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 fs-4">
        🩺 Cargando historia clínica...
      </div>
    );
  }

  if (!historia) {
    return (
      <div className="alert alert-info mt-4 text-center">
        No se encontró historia clínica para este paciente.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="card-title text-primary">📋 Historia Clínica</h2>
          <h6 className="card-subtitle mb-3 text-muted">
            ID: {historia.idHistoria}
          </h6>

          <div className="mb-3">
            <p>
              <strong>📅 Fecha Apertura:</strong> {historia.fechaApertura}
            </p>
            <p>
              <strong>🩸 Observaciones:</strong> {historia.observaciones}
            </p>
          </div>

          <button
            className={`btn ${showForm ? "btn-secondary" : "btn-primary"} mb-3`}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancelar" : "Agregar Antecedente"}
          </button>

          {showForm && (
            <form
              className="card p-3 mb-3 border-primary"
              onSubmit={agregarAntecedente}
            >
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                  name="tipo"
                  value={nuevoAntecedente.tipo}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="alergias">Alergias</option>
                  <option value="enfermedades previas">
                    Enfermedades Previas
                  </option>
                  <option value="cirugías">Cirugías</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  value={nuevoAntecedente.descripcion}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  rows="3"
                  placeholder="Describe brevemente el antecedente..."
                />
              </div>

              <button type="submit" className="btn btn-success">
                💾 Guardar Antecedente
              </button>
            </form>
          )}

          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {antecedentes.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      Sin antecedentes médicos registrados.
                    </td>
                  </tr>
                ) : (
                  antecedentes.map((ant) => (
                    <tr key={ant.idAntecedente}>
                      <td>{ant.idAntecedente}</td>
                      <td>{ant.tipo}</td>
                      <td>{ant.descripcion}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <button
            className="btn btn-outline-secondary mt-3"
            onClick={() => navigate("/pacientes")}
          >
            ← Volver a Pacientes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoriaClinica;
