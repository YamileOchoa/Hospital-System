import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import facturaService from "../../services/facturaService";
import pacienteService from "../../services/pacienteService";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaFilePdf,
  FaFileWord,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Paciente {
  idPaciente?: number | string;
  nombres?: string;
  apellidos?: string;
  nombre?: string;
  apellido?: string;
}

interface Factura {
  idFactura: number;
  idPaciente: number;
  fechaEmision: string;
  total: number;
  estado: string;
}

interface FacturaConPaciente extends Factura {
  nombrePaciente?: string;
}

const FacturaList: React.FC = () => {
  const [facturas, setFacturas] = useState<FacturaConPaciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [mostrarGraficos, setMostrarGraficos] = useState(false);

  useEffect(() => {
    cargarFacturas();
  }, []);

  const cargarFacturas = async () => {
    try {
      setLoading(true);

      // Cargar facturas
      const responseFacturas = await facturaService.getAll();
      const facturasData = responseFacturas.data;

      // Cargar pacientes
      const responsePacientes = await pacienteService.getAll();
      const pacientesArray =
        responsePacientes.data?.content ||
        responsePacientes.data?.data ||
        responsePacientes.data;

      // Crear un mapa de pacientes por ID para búsqueda rápida
      const pacientesMap = new Map<number | string, Paciente>();
      if (Array.isArray(pacientesArray)) {
        pacientesArray.forEach((p: Paciente) => {
          if (p.idPaciente) {
            pacientesMap.set(p.idPaciente, p);
          }
        });
      }

      // Combinar facturas con nombres de pacientes
      const facturasConNombres = facturasData.map((factura: Factura) => {
        const paciente = pacientesMap.get(factura.idPaciente);
        let nombrePaciente = `ID: ${factura.idPaciente}`;

        if (paciente) {
          const nombres = paciente.nombres || paciente.nombre || "";
          const apellidos = paciente.apellidos || paciente.apellido || "";

          if (nombres && apellidos) {
            nombrePaciente = `${nombres} ${apellidos}`;
          } else if (nombres) {
            nombrePaciente = nombres;
          } else if (apellidos) {
            nombrePaciente = apellidos;
          }
        }

        return {
          ...factura,
          nombrePaciente,
        };
      });

      setFacturas(facturasConNombres);
    } catch (error) {
      console.error("Error al cargar facturas:", error);
      setMessage("Error al cargar facturas");
    } finally {
      setLoading(false);
    }
  };

  const eliminarFactura = async (id: number) => {
    if (!window.confirm("¿Seguro que desea eliminar esta factura?")) return;
    try {
      await facturaService.delete(id);
      setMessage("Factura eliminada correctamente");
      setTimeout(() => setMessage(""), 3000);
      cargarFacturas();
    } catch (error) {
      console.error(error);
      setMessage("Error al eliminar factura");
    }
  };

  const descargarFactura = async (
    id: number,
    formato: "pdf" | "docx" = "pdf"
  ) => {
    try {
      await facturaService.descargarFactura(id, formato);
      setMessage(`Factura descargada en formato ${formato.toUpperCase()}`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Error al descargar factura");
    }
  };

  // Calcular estadísticas
  const calcularEstadisticas = () => {
    const totalIngresos = facturas.reduce((sum, f) => sum + f.total, 0);
    const facturasPagadas = facturas.filter((f) => f.estado === "pagado");
    const facturasPendientes = facturas.filter((f) => f.estado === "pendiente");
    const ingresosPagados = facturasPagadas.reduce(
      (sum, f) => sum + f.total,
      0
    );
    const ingresosPendientes = facturasPendientes.reduce(
      (sum, f) => sum + f.total,
      0
    );

    // Agrupar por mes
    const facturasPorMes = facturas.reduce((acc: any, factura) => {
      const fecha = new Date(factura.fechaEmision);
      const mes = fecha.toLocaleString("es-ES", {
        month: "short",
        year: "numeric",
      });

      if (!acc[mes]) {
        acc[mes] = { mes, total: 0, cantidad: 0, pagado: 0, pendiente: 0 };
      }

      acc[mes].total += factura.total;
      acc[mes].cantidad += 1;

      if (factura.estado === "pagado") {
        acc[mes].pagado += factura.total;
      } else {
        acc[mes].pendiente += factura.total;
      }

      return acc;
    }, {});

    const datosMensuales = Object.values(facturasPorMes);

    // Datos para el gráfico de pastel
    const datosEstado = [
      { name: "Pagado", value: ingresosPagados, color: "#28a745" },
      { name: "Pendiente", value: ingresosPendientes, color: "#ffc107" },
    ];

    return {
      totalIngresos,
      cantidadFacturas: facturas.length,
      ingresosPagados,
      ingresosPendientes,
      datosMensuales,
      datosEstado,
    };
  };

  const stats = calcularEstadisticas();

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando facturas...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Tarjetas de resumen */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-primary text-white">
            <div className="card-body">
              <h6 className="card-title">Total Ingresos</h6>
              <h3 className="mb-0">S/ {stats.totalIngresos.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-success text-white">
            <div className="card-body">
              <h6 className="card-title">Pagado</h6>
              <h3 className="mb-0">S/ {stats.ingresosPagados.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-warning text-dark">
            <div className="card-body">
              <h6 className="card-title">Pendiente</h6>
              <h3 className="mb-0">S/ {stats.ingresosPendientes.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 bg-info text-white">
            <div className="card-body">
              <h6 className="card-title">Total Facturas</h6>
              <h3 className="mb-0">{stats.cantidadFacturas}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Botón para mostrar/ocultar gráficos */}
      <div className="mb-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setMostrarGraficos(!mostrarGraficos)}
        >
          <FaChartLine className="me-2" />
          {mostrarGraficos ? "Ocultar" : "Mostrar"} Gráficos
        </button>
      </div>

      {/* Gráficos */}
      {mostrarGraficos && (
        <div className="row mb-4">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Ingresos Mensuales</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.datosMensuales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pagado" fill="#28a745" name="Pagado" />
                    <Bar dataKey="pendiente" fill="#ffc107" name="Pendiente" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title mb-4">Estado de Facturas</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stats.datosEstado}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stats.datosEstado.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title mb-4">Tendencia de Ingresos</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.datosMensuales}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#0d6efd"
                      strokeWidth={2}
                      name="Total"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de facturas */}
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary mb-0">Gestión de Facturas</h2>
            <Link to="/facturas/nueva" className="btn btn-primary">
              <FaPlus className="me-2" /> Nueva Factura
            </Link>
          </div>

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

          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Paciente</th>
                  <th>Fecha Emisión</th>
                  <th>Total (S/)</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {facturas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-muted py-4">
                      Sin facturas registradas.
                    </td>
                  </tr>
                ) : (
                  facturas.map((factura) => (
                    <tr key={factura.idFactura}>
                      <td>{factura.idFactura}</td>
                      <td>{factura.nombrePaciente}</td>
                      <td>{factura.fechaEmision}</td>
                      <td>{factura.total.toFixed(2)}</td>
                      <td>
                        <span
                          className={`badge ${
                            factura.estado === "pagado"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {factura.estado}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/facturas/editar/${factura.idFactura}`}
                            className="btn btn-sm btn-outline-warning"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => eliminarFactura(factura.idFactura)}
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>

                          <button
                            onClick={() =>
                              descargarFactura(factura.idFactura, "pdf")
                            }
                            className="btn btn-sm btn-outline-info"
                            title="Descargar PDF"
                          >
                            <FaFilePdf />
                          </button>

                          <button
                            onClick={() =>
                              descargarFactura(factura.idFactura, "docx")
                            }
                            className="btn btn-sm btn-outline-primary"
                            title="Descargar Word"
                          >
                            <FaFileWord />
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

export default FacturaList;
