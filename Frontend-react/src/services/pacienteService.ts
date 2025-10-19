import api from './api.js';

const PACIENTE_API = '/pacientes';

const pacienteService = {
    // Obtener todos los pacientes
    getAll: () => {
        return api.get(PACIENTE_API);
    },

    // Obtener paciente por ID
    getById: (id) => {
        return api.get(`${PACIENTE_API}/${id}`);
    },

    // Obtener paciente por DNI
    getByDni: (dni) => {
        return api.get(`${PACIENTE_API}/dni/${dni}`);
    },

    // Crear nuevo paciente
    create: (paciente) => {
        return api.post(PACIENTE_API, paciente);
    },

    // Actualizar paciente
    update: (id, paciente) => {
        return api.put(`${PACIENTE_API}/${id}`, paciente);
    },

    // Eliminar paciente
    delete: (id) => {
        return api.delete(`${PACIENTE_API}/${id}`);
    },

    // Obtener historia clinica
    getHistoriaClinica: (idPaciente) => {
        return api.get(`${PACIENTE_API}/${idPaciente}/historia-clinica`);
    },

    // Obtener antecedentes medicos
    getAntecedentes: (idHistoria) => {
        return api.get(`${PACIENTE_API}/historia/${idHistoria}/antecedentes`);
    },

    // Agregar antecedente medico
    addAntecedente: (idHistoria, antecedente) => {
        return api.post(`${PACIENTE_API}/historia/${idHistoria}/antecedentes`, antecedente);
    },
};

export default pacienteService;
