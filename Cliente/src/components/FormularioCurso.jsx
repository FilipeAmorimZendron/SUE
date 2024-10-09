import React, { useState } from 'react';
import Axios from 'axios';

function FormularioCurso({ cursos, setCursos }) {
  const [formData, setFormData] = useState({
    id_curso: '',
    nome_curso: '',
    descricao: '',
    carga_horaria: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = () => {
    Axios.post("http://localhost:4000/editar_curso", {
      ...formData,
      action: "incluir",
    })
    .then((response) => {
      setCursos([...cursos, response.data]);
      setFormData({ id_curso: '', nome_curso: '', descricao: '', carga_horaria: '' });
    })
    .catch((error) => {
      console.error("Erro ao incluir curso:", error);
    });
  };

  const handleAtualizar = () => {
    Axios.post("http://localhost:4000/editar_curso", {
      ...formData,
      action: "alterar",
    })
    .then((response) => {
      setCursos(cursos.map((curso) =>
        curso.id_curso === response.data.id_curso ? response.data : curso
      ));
      setFormData({ id_curso: '', nome_curso: '', descricao: '', carga_horaria: '' });
    })
    .catch((error) => {
      console.error("Erro ao atualizar curso:", error);
    });
  };

  const handleExcluir = (id_curso) => {
    Axios.delete(`http://localhost:4000/excluir_curso/${id_curso}`)
      .then(() => {
        setCursos(cursos.filter(curso => curso.id_curso !== id_curso));
      })
      .catch((error) => {
        console.error("Erro ao excluir curso:", error);
      });
  };

  const handleCarregar = (curso) => {
    setFormData({
      id_curso: curso.id_curso,
      nome_curso: curso.nome_curso,
      descricao: curso.descricao,
      carga_horaria: curso.carga_horaria,
    });
  };

  return (
    <div>
      <h2>Cadastro de Cursos</h2>
      <form>
        <div>
          <label>Nome do Curso:</label>
          <input
            type="text"
            name="nome_curso"
            value={formData.nome_curso}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Carga Horária:</label>
          <input
            type="number"
            name="carga_horaria"
            value={formData.carga_horaria}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleIncluir}>Incluir</button>
        <button type="button" onClick={handleAtualizar}>Atualizar</button>
      </form>
      <h3>Relação de Cursos</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Curso</th>
            <th>Descrição</th>
            <th>Carga Horária</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <tr key={curso.id_curso}>
                <td>{curso.id_curso}</td>
                <td>{curso.nome_curso}</td>
                <td>{curso.descricao}</td>
                <td>{curso.carga_horaria}</td>
                <td>
                  <button type="button" onClick={() => handleExcluir(curso.id_curso)}>
                    Excluir
                  </button>
                  <button type="button" onClick={() => handleCarregar(curso)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum curso encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FormularioCurso;
