import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function FormularioTurma({ turmas, setTurmas }) {
  const [formData, setFormData] = useState({
    id_turma: '',
    sala: '',
    horario: '',
    periodo: '',
  });

  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/turmas");
        setTurmas(response.data);
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      }
    };

    fetchTurmas();
  }, [setTurmas]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = () => {
    Axios.post("http://localhost:4000/editar_turma", {
      ...formData,
      action: "incluir",
    })
    .then((response) => {
      setTurmas([...turmas, response.data]);
      setFormData({ id_turma: '', sala: '', horario: '', periodo: '' });
    })
    .catch((error) => {
      console.error("Erro ao incluir turma:", error);
    });
  };

  const handleAtualizar = () => {
    Axios.post("http://localhost:4000/editar_turma", {
      ...formData,
      action: "alterar",
    })
    .then((response) => {
      const updatedTurmas = turmas.map((turma) =>
        turma.id_turma === response.data.id_turma ? response.data : turma
      );
      setTurmas(updatedTurmas);
      setFormData({ id_turma: '', sala: '', horario: '', periodo: '' });
    })
    .catch((error) => {
      console.error("Erro ao atualizar turma:", error);
    });
  };

  const handleCarregar = (turma) => {
    setFormData({ ...turma });
  };

  const handleExcluir = (id_turma) => {
    Axios.delete(`http://localhost:4000/excluir_turma/${id_turma}`)
      .then(() => {
        setTurmas(turmas.filter(turma => turma.id_turma !== id_turma));
      })
      .catch((error) => {
        console.error("Erro ao excluir turma:", error);
      });
  };

  return (
    <div>
      <h2>Gerenciar Turmas</h2>
      <input
        type="text"
        name="sala"
        placeholder="Sala"
        value={formData.sala}
        onChange={handleChange}
      />
      <input
        type="text"
        name="horario"
        placeholder="Horário"
        value={formData.horario}
        onChange={handleChange}
      />
      <input
        type="text"
        name="periodo"
        placeholder="Período"
        value={formData.periodo}
        onChange={handleChange}
      />
      <button onClick={handleIncluir}>Incluir Turma</button>
      <button onClick={handleAtualizar}>Atualizar Turma</button>

      <h3>Lista de Turmas</h3>
      <ul>
        {turmas.map((turma) => (
          <li key={turma.id_turma}>
            {`ID: ${turma.id_turma} - Sala: ${turma.sala} - Horário: ${turma.horario} - Período: ${turma.periodo}`}
            <button onClick={() => handleCarregar(turma)}>Editar</button>
            <button onClick={() => handleExcluir(turma.id_turma)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormularioTurma;

