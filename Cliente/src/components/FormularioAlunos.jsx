import React, { useState } from 'react';
import Axios from 'axios';

function FormularioAlunos({ alunos, setAlunos }) {
  const [formData, setFormData] = useState({
    id_aluno: '',
    CPF_aluno: '',
    nome_aluno: '',
    endereco_aluno: '',
    telefone_aluno: '',
    CEP_aluno: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = () => {
    Axios.post("http://localhost:4000/editar_aluno", {
      ...formData,
      action: "incluir",
    })
    .then((response) => {
      setAlunos([...alunos, response.data]);
      setFormData({
        id_aluno: '',
        CPF_aluno: '',
        nome_aluno: '',
        endereco_aluno: '',
        telefone_aluno: '',
        CEP_aluno: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao incluir aluno:", error);
    });
  };

  const handleAtualizar = () => {
    Axios.post("http://localhost:4000/editar_aluno", {
      ...formData,
      action: "alterar",
    })
    .then((response) => {
      setAlunos(alunos.map((aluno) =>
        aluno.id_aluno === response.data.id_aluno ? response.data : aluno
      ));
      setFormData({
        id_aluno: '',
        CPF_aluno: '',
        nome_aluno: '',
        endereco_aluno: '',
        telefone_aluno: '',
        CEP_aluno: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao atualizar aluno:", error);
    });
  };

  const handleCarregar = (aluno) => {
    setFormData({
      id_aluno: aluno.id_aluno,
      CPF_aluno: aluno.CPF_aluno,
      nome_aluno: aluno.nome_aluno,
      endereco_aluno: aluno.endereco_aluno,
      telefone_aluno: aluno.telefone_aluno,
      CEP_aluno: aluno.CEP_aluno
    });
  };

  const handleExcluir = (id_aluno) => {
    Axios.delete(`http://localhost:4000/excluir_aluno/${id_aluno}`)
      .then(() => {
        setAlunos(alunos.filter(aluno => aluno.id_aluno !== id_aluno));
      })
      .catch((error) => {
        console.error("Erro ao excluir aluno:", error);
      });
  };

  return (
    <div>
      <h2>Cadastro de Alunos</h2>
      <form>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="CPF_aluno"
            value={formData.CPF_aluno || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome_aluno"
            value={formData.nome_aluno || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco_aluno"
            value={formData.endereco_aluno || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone_aluno"
            value={formData.telefone_aluno || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            name="CEP_aluno"
            value={formData.CEP_aluno || ''}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleIncluir}>Incluir</button>
        <button type="button" onClick={handleAtualizar}>Atualizar</button>
      </form>
      <h3>Relação de Alunos</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
            <th>CEP</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id_aluno}>
              <td>{aluno.id_aluno}</td>
              <td>{aluno.CPF_aluno}</td>
              <td>{aluno.nome_aluno}</td>
              <td>{aluno.endereco_aluno}</td>
              <td>{aluno.telefone_aluno}</td>
              <td>{aluno.CEP_aluno}</td>
              <td>
                <button type="button" onClick={() => handleExcluir(aluno.id_aluno)}>
                  Excluir
                </button>
                <button type="button" onClick={() => handleCarregar(aluno)}>
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormularioAlunos;
