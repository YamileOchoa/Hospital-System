import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Importar tus componentes
import Home from "./components/common/Home";
import PacienteList from './components/pacientes/PacienteList';
import PacienteForm from './components/pacientes/PacienteForm';
import HistoriaClinica from './components/pacientes/HistoriaClinica';
import CitaList from './components/citas/CitaList';
import CitaForm from './components/citas/CitaForm';
import MedicoList from './components/medicos/MedicoList';
import MedicoForm from './components/medicos/MedicoForm';
import EspecialidadList from './components/medicos/EspecialidadList';
import ConsultaList from './components/consultas/ConsultaList';
import ConsultaForm from './components/consultas/ConsultaForm';
import FacturaList from './components/facturas/FacturaList';
import FacturaForm from './components/facturas/FacturaForm'; 

function App() {
    return (
        <Router>
            <div className="App d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pacientes" element={<PacienteList />} />
                        <Route path="/pacientes/nuevo" element={<PacienteForm />} />
                        <Route path="/pacientes/editar/:id" element={<PacienteForm />} />
                        <Route path="/pacientes/historia/:id" element={<HistoriaClinica />} />
                        <Route path="/citas" element={<CitaList />} />
                        <Route path="/citas/nueva" element={<CitaForm />} />
                        <Route path="/citas/editar/:id" element={<CitaForm />} />
                        <Route path="/medicos" element={<MedicoList />} />
                        <Route path="/medicos/nuevo" element={<MedicoForm />} />
                        <Route path="/medicos/editar/:id" element={<MedicoForm />} />
                        <Route path="/especialidades" element={<EspecialidadList />} />
                        <Route path="/consultas" element={<ConsultaList />} />
                        <Route path="/consultas/nueva" element={<ConsultaForm />} />
                        <Route path="/consultas/editar/:id" element={<ConsultaForm />} />
                        <Route path="/facturas" element={<FacturaList />} />
                        <Route path="/facturas/nueva" element={<FacturaForm />} />
                        <Route path="/facturas/editar/:id" element={<FacturaForm />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
