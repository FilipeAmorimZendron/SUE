import React, { useState } from 'react';
import Axios from 'axios';
import './FormularioRegistro.css';

function FormularioRegistro({ setShowRegister }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://localhost:4000/register', { 
        nome_usuario: nome, 
        email_usuario: email, 
        senha_usuario: senha 
      });
      if (response.data.success) {
        alert('Registro realizado com sucesso!');
        setShowRegister(false);
      } else {
        alert('Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div className="formulario-registro">
      <h2>Registrar</h2>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <div>
            <label htmlFor="nome">Nome</label>
            <input 
              type="text" 
              id="nome" 
              placeholder="Nome" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha" 
              placeholder="Senha" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required 
            />
          </div>
        </div>
        <div className="botao-container">
          <button type="submit">Registrar</button>
        </div>
      </form>
      <p>Já tem uma conta? <button onClick={() => setShowRegister(false)}>Login</button></p>
    </div>
  );
}

export default FormularioRegistro;
