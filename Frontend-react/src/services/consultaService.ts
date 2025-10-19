import api from './api.js';

const CONSULTA_API = '/consultas';

const consultaService = {
    getAll: () => {
        return api.get(CONSULTA_API);
    },

    getById: (id) => {
        return api.get(`${CONSULTA_API}/${id}`);
    },

    getByPaciente: (idPaciente) => {
        return api.get(`${CONSULTA_API}/paciente/${idPaciente}`);
    },

    getByMedico: (idMedico) => {
        return api.get(`${CONSULTA_API}/medico/${idMedico}`);
    },

    create: (consulta) => {
        return api.post(CONSULTA_API, consulta);
    },

    update: (id, consulta) => {
        return api.put(`${CONSULTA_API}/${id}`, consulta);
    },

    delete: (id) => {
        return api.delete(`${CONSULTA_API}/${id}`);
    },

    // Diagnosticos
    getDiagnosticos: (idConsulta) => {
        return api.get(`${CONSULTA_API}/${idConsulta}/diagnosticos`);
    },

    addDiagnostico: (idConsulta, diagnostico) => {
        return api.post(`${CONSULTA_API}/${idConsulta}/diagnosticos`, diagnostico);
    },
};

export default consultaService;
