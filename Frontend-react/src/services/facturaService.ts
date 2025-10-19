// src/services/facturaService.ts
import api from "./api";

export interface Factura {
  idFactura: number;
  idPaciente: number;
  fechaEmision: string;
  total: number;
  estado: "pendiente" | "pagado";
}

export interface DetalleFactura {
  idDetalleFactura: number;
  idFactura: number;
  concepto: string;
  monto: number;
}

const facturaService = {
  getAll: () => api.get<Factura[]>("/facturas"),
  getById: (id: number) => api.get<Factura>(`/facturas/${id}`),
  create: (factura: Partial<Factura>) => api.post("/facturas", factura),
  update: (id: number, factura: Partial<Factura>) =>
    api.put(`/facturas/${id}`, factura),
  delete: (id: number) => api.delete(`/facturas/${id}`),
  getDetalles: (idFactura: number) =>
    api.get<DetalleFactura[]>(`/facturas/${idFactura}/detalles`),
  addDetalle: (idFactura: number, detalle: Partial<DetalleFactura>) =>
    api.post(`/facturas/${idFactura}/detalles`, detalle),

  // 🔽 PDF / Word
  descargarFactura: async (id: number, formato: "pdf" | "docx" = "pdf") => {
    if (formato === "pdf") {
      const response = await api.get(`/facturas/${id}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `factura_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      alert("Descarga en Word aún no implementada");
    }
  },
};

export default facturaService;
