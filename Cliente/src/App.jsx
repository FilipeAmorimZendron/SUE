import React, { useState, useEffect } from "react";
import Axios from "axios";
import FormularioLogin from "./components/FormularioLogin";
import FormularioRegistro from "./components/FormularioRegistro";
import FormularioDisciplina from "./components/FormularioDisciplina";
import FormularioAlunos from "./components/FormularioAlunos";
import FormularioCoordenador from "./components/FormularioCoordenador";
import FormularioMatricula from "./components/FormularioMatricula";
import FormularioCurso from "./components/FormularioCurso";
import FormularioPagamentos from "./components/FormularioPagamentos";
import FormularioTurma from "./components/FormularioTurma";
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [disciplinas, setDisciplinas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [coordenadores, setCoordenadores] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [pagamentos, setPagamentos] = useState([]);
  const [turmas, setTurmas] = useState([]);

  const [showDisciplinas, setShowDisciplinas] = useState(false);
  const [showAlunos, setShowAlunos] = useState(false);
  const [showCoordenadores, setShowCoordenadores] = useState(false);
  const [showMatriculas, setShowMatriculas] = useState(false);
  const [showCursos, setShowCursos] = useState(false);
  const [showPagamentos, setShowPagamentos] = useState(false);
  const [showTurmas, setShowTurmas] = useState(false); 

  // para manter na tela quando atualiza (LOCALstorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  // Função para buscar dados
  useEffect(() => {
    const fetchData = async (route, setState) => {
      try {
        const response = await Axios.get(`http://localhost:4000/${route}`);
        setState(response.data);
      } catch (error) {
        console.error(`Erro ao buscar ${route}:`, error);
      }
    };

    if (loggedIn) {
      fetchData('disciplinas', setDisciplinas);
      fetchData('alunos', setAlunos);
      fetchData('coordenadores', setCoordenadores);
      fetchData('matriculas', setMatriculas);
      fetchData('cursos', setCursos);
      fetchData('pagamentos', setPagamentos);
      fetchData('turmas', setTurmas);
    }
  }, [loggedIn]);

  // Funções para mostrar formulários
  const handleMenuClick = (menu) => {
    setShowDisciplinas(menu === 'disciplinas');
    setShowAlunos(menu === 'alunos');
    setShowCoordenadores(menu === 'coordenadores');
    setShowMatriculas(menu === 'matriculas');
    setShowCursos(menu === 'cursos');
    setShowPagamentos(menu === 'pagamentos');
    setShowTurmas(menu === 'turmas');
  };

  // Função de login
  const handleLogin = async (email, senha) => {
    try {
      const response = await Axios.post('http://localhost:4000/login', {
        email_usuario: email,
        senha_usuario: senha,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); // Salva o token
        setLoggedIn(true); // Atualiza o estado de login
        alert('Login realizado com sucesso!');
      } else {
        alert('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    setLoggedIn(false); // Atualiza o estado de login
  };

  return (
    <div>
      {!loggedIn ? (
        showRegister ? (
          <FormularioRegistro setShowRegister={setShowRegister} setLoggedIn={setLoggedIn} />
        ) : (
          <FormularioLogin setLoggedIn={setLoggedIn} setShowRegister={setShowRegister} handleLogin={handleLogin} />
        )
      ) : (
        <div>
          <div className="main-menu">
            <h1>Bem-vindo ao Sistema de Gestão</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => handleMenuClick('disciplinas')}>Gerenciar Disciplinas</button>
            <button onClick={() => handleMenuClick('alunos')}>Gerenciar Alunos</button>
            <button onClick={() => handleMenuClick('coordenadores')}>Gerenciar Coordenadores</button>
            <button onClick={() => handleMenuClick('matriculas')}>Gerenciar Matrículas</button>
            <button onClick={() => handleMenuClick('cursos')}>Gerenciar Cursos</button>
            <button onClick={() => handleMenuClick('pagamentos')}>Gerenciar Pagamentos</button>
            <button onClick={() => handleMenuClick('turmas')}>Gerenciar Turmas</button>
          </div>
          {showDisciplinas && <FormularioDisciplina disciplinas={disciplinas} setDisciplinas={setDisciplinas} />}
          {showAlunos && <FormularioAlunos alunos={alunos} setAlunos={setAlunos} />}
          {showCoordenadores && <FormularioCoordenador coordenadores={coordenadores} setCoordenadores={setCoordenadores} />}
          {showMatriculas && <FormularioMatricula matriculas={matriculas} setMatriculas={setMatriculas} />}
          {showCursos && <FormularioCurso cursos={cursos} setCursos={setCursos} />}
          {showPagamentos && <FormularioPagamentos pagamentos={pagamentos} setPagamentos={setPagamentos} alunos={alunos} />}
          {showTurmas && <FormularioTurma turmas={turmas} setTurmas={setTurmas} />}
        </div>
      )}
    </div>
  );
}

export default App;
