import React, { useState } from 'react';
import Axios from 'axios';

function FormularioDisciplina({ disciplinas, setDisciplinas }) {
  const [formData, setFormData] = useState({
    id_disciplina: '',
    nome_disciplina: '',
    carga_horaria: '',
    descricao_disciplina: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = () => {
    Axios.post("http://localhost:4000/editar_disciplina", {
      ...formData,
      action: "incluir",
    })
    .then((response) => {
      setDisciplinas([...disciplinas, response.data]);
      setFormData({
        id_disciplina: '',
        nome_disciplina: '',
        carga_horaria: '',
        descricao_disciplina: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao incluir disciplina:", error);
    });
  };

  const handleAtualizar = () => {
    Axios.post("http://localhost:4000/editar_disciplina", {
      ...formData,
      action: "alterar",
    })
    .then((response) => {
      setDisciplinas(disciplinas.map((disciplina) =>
        disciplina.id_disciplina === response.data.id_disciplina ? response.data : disciplina
      ));
      setFormData({
        id_disciplina: '',
        nome_disciplina: '',
        carga_horaria: '',
        descricao_disciplina: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao atualizar disciplina:", error);
    });
  };

  const handleCarregar = (disciplina) => {
    setFormData({
      id_disciplina: disciplina.id_disciplina,
      nome_disciplina: disciplina.nome_disciplina,
      carga_horaria: disciplina.carga_horaria,
      descricao_disciplina: disciplina.descricao_disciplina
    });
  };

  const handleExcluir = (id_disciplina) => {
    Axios.delete(`http://localhost:4000/excluir_disciplina/${id_disciplina}`)
      .then(() => {
        setDisciplinas(disciplinas.filter(disciplina => disciplina.id_disciplina !== id_disciplina));
      })
      .catch((error) => {
        console.error("Erro ao excluir disciplina:", error);
      });
  };

  return (
    <div>
      <h2>Cadastro de Disciplinas</h2>
      <form>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome_disciplina"
            value={formData.nome_disciplina}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Carga Horária:</label>
          <input
            type="text"
            name="carga_horaria"
            value={formData.carga_horaria}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            name="descricao_disciplina"
            value={formData.descricao_disciplina}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleIncluir}>Incluir</button>
        <button type="button" onClick={handleAtualizar}>Atualizar</button>
      </form>
      <h3>Relação de Disciplinas</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Carga Horária</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinas.length > 0 ? (
            disciplinas.map((disciplina) => (
              <tr key={disciplina.id_disciplina}>
                <td>{disciplina.id_disciplina}</td>
                <td>{disciplina.nome_disciplina}</td>
                <td>{disciplina.carga_horaria}</td>
                <td>{disciplina.descricao_disciplina}</td>
                <td>
                  <button type="button" onClick={() => handleExcluir(disciplina.id_disciplina)}>
                    Excluir
                  </button>
                  <button type="button" onClick={() => handleCarregar(disciplina)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>  
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FormularioDisciplina;
