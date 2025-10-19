import api from './api.js';

const CITA_API = '/citas';

const citaService = {
    getAll: () => {
        return api.get(CITA_API);
    },

    getById: (id) => {
        return api.get(`${CITA_API}/${id}`);
    },

    getByPaciente: (idPaciente) => {
        return api.get(`${CITA_API}/paciente/${idPaciente}`);
    },

    getByMedico: (idMedico) => {
        return api.get(`${CITA_API}/medico/${idMedico}`);
    },

    getByFecha: (fecha) => {
        return api.get(`${CITA_API}/fecha/${fecha}`);
    },

    create: (cita) => {
        return api.post(CITA_API, cita);
    },

    update: (id, cita) => {
        return api.put(`${CITA_API}/${id}`, cita);
    },

    cambiarEstado: (id, estado) => {
        return api.patch(`${CITA_API}/${id}/estado`, { estado });
    },

    delete: (id) => {
        return api.delete(`${CITA_API}/${id}`);
    },
};

export default citaService;
