import React, { useState } from 'react';
import Axios from 'axios';

function FormularioMatricula({ matriculas, setMatriculas }) {
  const [formData, setFormData] = useState({
    id_matricula: '',
    id_aluno: '',
    id_curso: '',
    data_matricula: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = () => {
    Axios.post("http://localhost:4000/editar_matricula", {
      ...formData,
      action: "incluir",
    })
    .then((response) => {
      setMatriculas([...matriculas, response.data]);
      setFormData({ id_matricula: '', id_aluno: '', id_curso: '', data_matricula: '' });
    })
    .catch((error) => {
      console.error("Erro ao incluir matrícula:", error);
    });
  };

  const handleAtualizar = () => {
    Axios.post("http://localhost:4000/editar_matricula", {
      ...formData,
      action: "alterar",
    })
    .then((response) => {
      setMatriculas(matriculas.map((matricula) =>
        matricula.id_matricula === response.data.id_matricula ? response.data : matricula
      ));
      setFormData({ id_matricula: '', id_aluno: '', id_curso: '', data_matricula: '' });
    })
    .catch((error) => {
      console.error("Erro ao atualizar matrícula:", error);
    });
  };

  const handleExcluir = (id_matricula) => {
    Axios.delete(`http://localhost:4000/excluir_matricula/${id_matricula}`)
      .then(() => {
        setMatriculas(matriculas.filter(matricula => matricula.id_matricula !== id_matricula));
      })
      .catch((error) => {
        console.error("Erro ao excluir matrícula:", error);
      });
  };

  return (
    <div>
      <h2>Cadastro de Matrículas</h2>
      <form>
        {/* Campos para id_aluno, id_curso e data_matricula */}
        <div>
          <label>ID do Aluno:</label>
          <input
            type="text"
            name="id_aluno"
            value={formData.id_aluno}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>ID do Curso:</label>
          <input
            type="text"
            name="id_curso"
            value={formData.id_curso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Data da Matrícula:</label>
          <input
            type="date"
            name="data_matricula"
            value={formData.data_matricula}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleIncluir}>Incluir</button>
        <button type="button" onClick={handleAtualizar}>Atualizar</button>
      </form>
      <h3>Relação de Matrículas</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Aluno</th>
            <th>Curso</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map((matricula) => (
            <tr key={matricula.id_matricula}>
              <td>{matricula.id_matricula}</td>
              <td>{matricula.Aluno ? matricula.Aluno.nome_aluno : 'N/A'}</td>
              <td>{matricula.Curso ? matricula.Curso.nome_curso : 'N/A'}</td>
              <td>{new Date(matricula.data_matricula).toLocaleDateString()}</td>
              <td>
                <button type="button" onClick={() => handleExcluir(matricula.id_matricula)}>
                  Excluir
                </button>
                <button type="button" onClick={() => handleCarregar(matricula)}>
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

export default FormularioMatricula;
