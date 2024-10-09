import React, { useState } from 'react';
import Axios from 'axios';

function FormularioCoordenador({ coordenadores, setCoordenadores }) {
  const [formData, setFormData] = useState({
    id_coordenador: '',
    CPF_coordenador: '',
    nome_coordenador: '',
    telefone_coordenador: '',
    endereco_coordenador: '',
    CEP_coordenador: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = () => {
    Axios.post("http://localhost:4000/editar_coordenador", {
      ...formData,
      action: "incluir",
    })
    .then((response) => {
      setCoordenadores([...coordenadores, response.data]);
      setFormData({
        id_coordenador: '',
        CPF_coordenador: '',
        nome_coordenador: '',
        telefone_coordenador: '',
        endereco_coordenador: '',
        CEP_coordenador: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao incluir coordenador:", error);
    });
  };

  const handleAtualizar = () => {
    Axios.post("http://localhost:4000/editar_coordenador", {
      ...formData,
      action: "alterar",
    })
    .then((response) => {
      setCoordenadores(coordenadores.map((coordenador) =>
        coordenador.id_coordenador === response.data.id_coordenador ? response.data : coordenador
      ));
      setFormData({
        id_coordenador: '',
        CPF_coordenador: '',
        nome_coordenador: '',
        telefone_coordenador: '',
        endereco_coordenador: '',
        CEP_coordenador: ''
      });
    })
    .catch((error) => {
      console.error("Erro ao atualizar coordenador:", error);
    });
  };

  const handleCarregar = (coordenador) => {
    setFormData({
      id_coordenador: coordenador.id_coordenador,
      CPF_coordenador: coordenador.CPF_coordenador,
      nome_coordenador: coordenador.nome_coordenador,
      telefone_coordenador: coordenador.telefone_coordenador,
      endereco_coordenador: coordenador.endereco_coordenador,
      CEP_coordenador: coordenador.CEP_coordenador
    });
  };

  const handleExcluir = (id_coordenador) => {
    Axios.delete(`http://localhost:4000/excluir_coordenador/${id_coordenador}`)
      .then(() => {
        setCoordenadores(coordenadores.filter(coordenador => coordenador.id_coordenador !== id_coordenador));
      })
      .catch((error) => {
        console.error("Erro ao excluir coordenador:", error);
      });
  };

  return (
    <div>
      <h2>Cadastro de Coordenadores</h2>
      <form>
        <div>
          <label>CPF:</label>
          <input
            type="text"
            name="CPF_coordenador"
            value={formData.CPF_coordenador}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome_coordenador"
            value={formData.nome_coordenador}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input
            type="text"
            name="telefone_coordenador"
            value={formData.telefone_coordenador}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco_coordenador"
            value={formData.endereco_coordenador}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CEP:</label>
          <input
            type="text"
            name="CEP_coordenador"
            value={formData.CEP_coordenador}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleIncluir}>Incluir</button>
        <button type="button" onClick={handleAtualizar}>Atualizar</button>
      </form>
      <h3>Relação de Coordenadores</h3>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>CPF</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>CEP</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {coordenadores.map((coordenador) => (
            <tr key={coordenador.id_coordenador}>
              <td>{coordenador.id_coordenador}</td>
              <td>{coordenador.CPF_coordenador}</td>
              <td>{coordenador.nome_coordenador}</td>
              <td>{coordenador.telefone_coordenador}</td>
              <td>{coordenador.endereco_coordenador}</td>
              <td>{coordenador.CEP_coordenador}</td>
              <td>
                <button type="button" onClick={() => handleExcluir(coordenador.id_coordenador)}>Excluir</button>
                <button type="button" onClick={() => handleCarregar(coordenador)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormularioCoordenador;

