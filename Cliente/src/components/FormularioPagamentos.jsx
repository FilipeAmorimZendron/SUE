import React, { useState } from 'react';
import Axios from 'axios';

function FormularioPagamentos({ pagamentos, setPagamentos }) {
  const [formData, setFormData] = useState({
    id_pagamento: '',
    valor: '',
    descricao: '',
    data_pagamento: '',
    id_aluno: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncluir = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/editar_pagamento", {
        ...formData,
        action: "incluir",
      });
      setPagamentos([...pagamentos, response.data]);
      resetForm();
    } catch (error) {
      console.error("Erro ao incluir pagamento:", error);
    }
  };

  const handleAtualizar = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/editar_pagamento", {
        ...formData,
        action: "alterar",
      });
      const updatedPagamentos = pagamentos.map((pagamento) =>
        pagamento.id_pagamento === response.data.id_pagamento ? response.data : pagamento
      );
      setPagamentos(updatedPagamentos);
      resetForm();
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
    }
  };

  const handleCarregar = (pagamento) => {
    setFormData({
      id_pagamento: pagamento.id_pagamento,
      valor: pagamento.valor,
      descricao: pagamento.descricao,
      data_pagamento: pagamento.data_pagamento.split('T')[0],
      id_aluno: pagamento.id_aluno
    });
  };

  const handleExcluir = async (id_pagamento) => {
    try {
      await Axios.delete(`http://localhost:4000/excluir_pagamento/${id_pagamento}`);
      setPagamentos(pagamentos.filter(pagamento => pagamento.id_pagamento !== id_pagamento));
    } catch (error) {
      console.error("Erro ao excluir pagamento:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id_pagamento: '',
      valor: '',
      descricao: '',
      data_pagamento: '',
      id_aluno: ''
    });
  };

  return (
    <div>
      <h2>Gerenciar Pagamentos</h2>
      <input
        type="number"
        name="valor"
        placeholder="Valor"
        value={formData.valor}
        onChange={handleChange}
      />
      <input
        type="text"
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
      />
      <input
        type="date"
        name="data_pagamento"
        value={formData.data_pagamento}
        onChange={handleChange}
      />
      <input
        type="text"
        name="id_aluno"
        placeholder="ID do Aluno"
        value={formData.id_aluno}
        onChange={handleChange}
      />
      <button onClick={handleIncluir}>Incluir Pagamento</button>
      <button onClick={handleAtualizar}>Atualizar Pagamento</button>

      <h3>Lista de Pagamentos</h3>
      <ul>
        {pagamentos.map((pagamento) => (
          <li key={pagamento.id_pagamento}>
            {`ID: ${pagamento.id_pagamento} - Aluno: ${pagamento.Aluno?.nome_aluno || 'Desconhecido'} - Valor: R$${pagamento.valor} - Descrição: ${pagamento.descricao} - Data: ${new Date(pagamento.data_pagamento).toLocaleDateString()}`}
            <button onClick={() => handleCarregar(pagamento)}>Editar</button>
            <button onClick={() => handleExcluir(pagamento.id_pagamento)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormularioPagamentos;

