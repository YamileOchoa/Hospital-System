import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import facturaService from "../../services/facturaService";
import pacienteService from "../../services/pacienteService";

// Definición de tipos para mejorar la legibilidad y evitar errores
// Hacemos todas las propiedades opcionales (?) o flexibles para manejar respuestas de API inconsistentes.
interface Paciente {
  idPaciente?: number | string; // Permitimos string o number para el ID
  nombres?: string; // En plural (como viene de la API)
  apellidos?: string; // En plural (como viene de la API)
  nombre?: string; // Mantener singular como fallback
  apellido?: string; // Mantener singular como fallback
  firstName?: string; // Por si la API usa nombres en inglés
  lastName?: string;
}

interface FacturaState {
  idPaciente: string;
  fechaEmision: string;
  total: number;
  estado: string;
}

const FacturaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [pacientes, setPacientes] = useState<Paciente[]>([]);

  const [factura, setFactura] = useState<FacturaState>({
    idPaciente: "",
    fechaEmision: "",
    total: 0,
    estado: "pendiente",
  });

  // Cargar pacientes para el select
  useEffect(() => {
    const cargarPacientes = async () => {
      try {
        const response = await pacienteService.getAll();

        // 🔍 DEPURACIÓN: Ver toda la respuesta
        console.log("=== DEPURACIÓN PACIENTES ===");
        console.log("Response completo:", response);
        console.log("response.data:", response.data);
        console.log("Tipo de response.data:", typeof response.data);
        console.log("¿response.data es array?:", Array.isArray(response.data));

        // 🚨 Intentar múltiples ubicaciones donde puede estar el array
        let pacientesArray = null;

        // Opción 1: El array está directamente en response.data
        if (Array.isArray(response.data)) {
          pacientesArray = response.data;
          console.log("✅ Array encontrado en: response.data");
        }
        // Opción 2: El array está en response.data.content (paginación Spring Boot)
        else if (
          response.data?.content &&
          Array.isArray(response.data.content)
        ) {
          pacientesArray = response.data.content;
          console.log("✅ Array encontrado en: response.data.content");
        }
        // Opción 3: El array está en response.data.data
        else if (response.data?.data && Array.isArray(response.data.data)) {
          pacientesArray = response.data.data;
          console.log("✅ Array encontrado en: response.data.data");
        }
        // Opción 4: Puede estar más anidado
        else if (
          response.data?.data?.content &&
          Array.isArray(response.data.data.content)
        ) {
          pacientesArray = response.data.data.content;
          console.log("✅ Array encontrado en: response.data.data.content");
        } else {
          console.error(
            "❌ No se encontró un array de pacientes en ninguna ubicación esperada"
          );
          console.log(
            "Claves disponibles en response.data:",
            response.data ? Object.keys(response.data) : "null"
          );
        }

        if (pacientesArray && Array.isArray(pacientesArray)) {
          console.log("Total de pacientes encontrados:", pacientesArray.length);

          if (pacientesArray.length > 0) {
            console.log("Primer paciente completo:", pacientesArray[0]);
            console.log(
              "Propiedades del primer paciente:",
              Object.keys(pacientesArray[0])
            );

            // Verificar qué propiedades de nombre tiene
            const primerPaciente = pacientesArray[0];
            console.log("Verificación de propiedades:");
            console.log("- idPaciente:", primerPaciente.idPaciente);
            console.log("- nombres:", primerPaciente.nombres);
            console.log("- apellidos:", primerPaciente.apellidos);
            console.log("- nombre:", primerPaciente.nombre);
            console.log("- apellido:", primerPaciente.apellido);
          } else {
            console.warn(
              "⚠️ El array está vacío - No hay pacientes en la base de datos"
            );
            setMessage(
              "No hay pacientes registrados. Por favor, registre pacientes primero."
            );
          }

          setPacientes(pacientesArray as Paciente[]);
        } else {
          console.error("❌ No se pudo extraer un array válido de pacientes");
          setPacientes([]);
          setMessage(
            "Error: No se pudieron cargar los pacientes. Revise la consola para más detalles."
          );
        }
      } catch (error: any) {
        console.error("❌ Error completo al cargar pacientes:", error);
        console.error("Detalles del error:", {
          message: error.message,
          response: error.response,
          status: error.response?.status,
        });
        setMessage(
          `Error al cargar pacientes: ${
            error.response?.data?.message ||
            error.message ||
            "Error desconocido"
          }`
        );
      }
    };
    cargarPacientes();
  }, []);

  // Cargar factura si hay id (para modo edición)
  useEffect(() => {
    if (id) {
      const cargarFactura = async () => {
        try {
          const response = await facturaService.getById(id);
          if (response.data) {
            setFactura({
              ...response.data,
              // Convertir idPaciente a string para que el <select> funcione correctamente
              idPaciente: response.data.idPaciente
                ? String(response.data.idPaciente)
                : "",
              // Asegurar que fechaEmision esté en formato 'YYYY-MM-DD' si viene con timestamp
              fechaEmision: response.data.fechaEmision
                ? response.data.fechaEmision.split("T")[0]
                : "",
            });
          }
        } catch (error) {
          setMessage("Error al cargar factura");
          console.error("Error al cargar factura:", error);
        }
      };
      cargarFactura();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFactura((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!factura.idPaciente) {
      setMessage("Debe seleccionar un paciente.");
      return;
    }

    try {
      let facturaId = id ? Number(id) : undefined;
      const payload = {
        ...factura,
        // Enviar idPaciente como número al backend
        idPaciente: Number(factura.idPaciente),
        total: Number(factura.total), // Asegurar que el total es un número
      };

      if (facturaId) {
        await facturaService.update(facturaId, payload);
      } else {
        const response = await facturaService.create(payload);
        facturaId = response.data.idFactura; // capturar ID generado
      }

      setMessage("Factura guardada correctamente");

      // Descargar PDF automáticamente
      if (facturaId) {
        await facturaService.descargarFactura(facturaId, "pdf");
      }

      setTimeout(() => navigate("/facturas"), 1500);
    } catch (error) {
      console.error(error);
      setMessage("Error al guardar factura");
    }
  };

  // Función auxiliar para obtener el nombre del paciente
  const obtenerNombrePaciente = (p: Paciente): string => {
    // Priorizar "nombres" y "apellidos" en plural (como viene de tu API)
    const nombre = p.nombres || p.nombre || p.firstName || "";
    const apellido = p.apellidos || p.apellido || p.lastName || "";

    // Si hay nombre y apellido, mostrar ambos
    if (nombre && apellido) {
      return `${nombre} ${apellido}`;
    }
    // Si solo hay nombre
    else if (nombre) {
      return nombre;
    }
    // Si solo hay apellido
    else if (apellido) {
      return apellido;
    }
    // Si no hay nada, mostrar solo el ID
    else {
      return `ID: ${p.idPaciente}`;
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">{id ? "Editar Factura" : "Nueva Factura"}</h4>
        </div>
        <div className="card-body">
          {message && (
            <div
              className={`alert ${
                message.includes("Error") || message.includes("Debe")
                  ? "alert-danger"
                  : "alert-success"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="row g-3">
            {/* Select de pacientes */}
            <div className="col-md-6">
              <label className="form-label">Paciente *</label>
              <select
                name="idPaciente"
                value={factura.idPaciente}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">-- Seleccione un paciente --</option>

                {pacientes.length === 0 && (
                  <option value="" disabled>
                    No hay pacientes disponibles
                  </option>
                )}

                {pacientes.map((p, index) => (
                  <option
                    // Usamos el index como fallback si idPaciente es null o undefined
                    key={p.idPaciente || index}
                    value={p.idPaciente ? String(p.idPaciente) : ""}
                  >
                    {obtenerNombrePaciente(p)}
                  </option>
                ))}
              </select>
              {pacientes.length === 0 && (
                <small className="text-muted">
                  Revise la consola del navegador (F12) para ver los detalles de
                  la carga de pacientes
                </small>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">Fecha Emisión *</label>
              <input
                type="date"
                name="fechaEmision"
                value={factura.fechaEmision}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Total (S/.) *</label>
              <input
                type="number"
                name="total"
                value={factura.total}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Estado *</label>
              <select
                name="estado"
                value={factura.estado}
                onChange={handleChange}
                className="form-select"
              >
                <option value="pendiente">Pendiente</option>
                <option value="pagado">Pagado</option>
              </select>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/facturas")}
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

export default FacturaForm;
