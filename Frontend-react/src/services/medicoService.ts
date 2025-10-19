import api from './api.js';

const MEDICO_API = '/medicos';

const medicoService = {
    // Medicos
    getAllMedicos: () => {
        return api.get(MEDICO_API);
    },

    getMedicoById: (id) => {
        return api.get(`${MEDICO_API}/${id}`);
    },

    createMedico: (medico) => {
        return api.post(MEDICO_API, medico);
    },

    updateMedico: (id, medico) => {
        return api.put(`${MEDICO_API}/${id}`, medico);
    },

    deleteMedico: (id) => {
        return api.delete(`${MEDICO_API}/${id}`);
    },

    // Especialidades
    getAllEspecialidades: () => {
        return api.get(`${MEDICO_API}/especialidades`);
    },

    getEspecialidadById: (id) => {
        return api.get(`${MEDICO_API}/especialidades/${id}`);
    },

    createEspecialidad: (especialidad) => {
        return api.post(`${MEDICO_API}/especialidades`, especialidad);
    },

    updateEspecialidad: (id, especialidad) => {
        return api.put(`${MEDICO_API}/especialidades/${id}`, especialidad);
    },

    deleteEspecialidad: (id) => {
        return api.delete(`${MEDICO_API}/especialidades/${id}`);
    },
};

export default medicoService;
