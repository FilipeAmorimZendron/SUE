import React, { useState } from 'react';
import './FormularioLogin.css';

function FormularioLogin({ setLoggedIn, setShowRegister, handleLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, senha); // Chama a função de login do App.js
  };

  return (
    <div className="formulario-login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Não tem uma conta? <button onClick={() => setShowRegister(true)}>Registrar</button>
      </p>
    </div>
  );
}

export default FormularioLogin;
