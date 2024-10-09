const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();
const path = require("path");
const Sequelize = require("sequelize");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
port = 4000;

const Aluno = require("./database/Aluno");
const Curso = require("./database/Curso")
const Disciplina = require("./database/Disciplina");
const Coordenador = require("./database/Coordenador");
const Matricula = require("./database/Matricula");
const Pagamentos = require("./database/Pagamentos");
const Professor = require("./database/Professor");
const Turma = require("./database/Turma");
const Usuario = require('./database/Usuario'); 

const connection = require("./database/database");


//Iniciando
const start = async () => {
  try {
    await connection.authenticate();
    console.log("Conexão estabelecida com sucesso.");

    await connection.sync({ force: false });
    console.log("Tabelas sincronizadas.");
  } catch (error) {
    console.error("Não foi possivel conectar ao banco de dados: ", error);
  }
};

start();


//ROTAS DE ALUNOS-----------------------------------------------------------
// Rota para adicionar ou editar um aluno
router.post('/editar_aluno', async (req, res) => {
  const { action, id_aluno, CPF_aluno, nome_aluno, endereco_aluno, telefone_aluno, CEP_aluno } = req.body;

  try {
    if (action === 'incluir') {
      const novoAluno = await Aluno.create({ CPF_aluno, nome_aluno, endereco_aluno, telefone_aluno, CEP_aluno });
      return res.status(201).json(novoAluno);
    }

    if (action === 'alterar') {
      const aluno = await Aluno.findByPk(id_aluno);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado.' });
      }
      aluno.CPF_aluno = CPF_aluno;
      aluno.nome_aluno = nome_aluno;
      aluno.endereco_aluno = endereco_aluno;
      aluno.telefone_aluno = telefone_aluno;
      aluno.CEP_aluno = CEP_aluno;
      await aluno.save();
      return res.status(200).json(aluno);
    }
  } catch (error) {
    console.error("Erro ao editar aluno:", error);
    return res.status(500).json({ error: 'Erro ao editar aluno.' });
  }
});

// Rota para excluir um aluno
router.delete('/excluir_aluno/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
    await Aluno.destroy({ where: { id_aluno: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    return res.status(500).json({ error: 'Erro ao excluir aluno.' });
  }
});

// Rota para buscar todos os alunos
router.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos);
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    res.status(500).json({ error: 'Erro ao buscar alunos.' });
  }
});


//ROTAS DE DISCIPLINAS-----------------------------------------------------------
// Rota para adicionar ou editar uma disciplina
router.post('/editar_disciplina', async (req, res) => {
  const { action, id_disciplina, nome_disciplina, carga_horaria, descricao_disciplina } = req.body;

  try {
    if (action === 'incluir') {
      const novaDisciplina = await Disciplina.create({ nome_disciplina, carga_horaria, descricao_disciplina });
      return res.status(201).json(novaDisciplina);
    }

    if (action === 'alterar') {
      const disciplina = await Disciplina.findByPk(id_disciplina);
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada.' });
      }
      disciplina.nome_disciplina = nome_disciplina;
      disciplina.carga_horaria = carga_horaria;
      disciplina.descricao_disciplina = descricao_disciplina;
      await disciplina.save();
      return res.status(200).json(disciplina);
    }
  } catch (error) {
    console.error("Erro ao editar disciplina:", error);
    return res.status(500).json({ error: 'Erro ao editar disciplina.' });
  }
});

// Rota para excluir uma disciplina
router.delete('/excluir_disciplina/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const disciplina = await Disciplina.findByPk(id);
    if (!disciplina) {
      return res.status(404).json({ error: 'Disciplina não encontrada.' });
    }
    await Disciplina.destroy({ where: { id_disciplina: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir disciplina:", error);
    return res.status(500).json({ error: 'Erro ao excluir disciplina.' });
  }
});

// Rota para buscar todas as disciplinas
router.get('/disciplinas', async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll({
      order: [["id_disciplina", "DESC"]],
    });
    res.status(200).json(disciplinas);
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    res.status(500).json({ error: 'Erro ao buscar disciplinas.' });
  }
});


// ROTAS DE COORDENADORES -----------------------------------------------------------
// Rota para adicionar ou editar um coordenador
router.post('/editar_coordenador', async (req, res) => {
  const { action, id_coordenador, CPF_coordenador, nome_coordenador, telefone_coordenador, endereco_coordenador, CEP_coordenador } = req.body;

  try {
    if (action === 'incluir') {
      const novoCoordenador = await Coordenador.create({ 
        CPF_coordenador, 
        nome_coordenador, 
        telefone_coordenador, 
        endereco_coordenador, 
        CEP_coordenador 
      });
      return res.status(201).json(novoCoordenador);
    }

    if (action === 'alterar') {
      const coordenador = await Coordenador.findByPk(id_coordenador);
      if (!coordenador) {
        return res.status(404).json({ error: 'Coordenador não encontrado.' });
      }
      coordenador.CPF_coordenador = CPF_coordenador;
      coordenador.nome_coordenador = nome_coordenador;
      coordenador.telefone_coordenador = telefone_coordenador;
      coordenador.endereco_coordenador = endereco_coordenador;
      coordenador.CEP_coordenador = CEP_coordenador;
      await coordenador.save();
      return res.status(200).json(coordenador);
    }
  } catch (error) {
    console.error("Erro ao editar coordenador:", error);
    return res.status(500).json({ error: 'Erro ao editar coordenador.' });
  }
});

// Rota para excluir um coordenador
router.delete('/excluir_coordenador/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      return res.status(404).json({ error: 'Coordenador não encontrado.' });
    }
    await Coordenador.destroy({ where: { id_coordenador: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir coordenador:", error);
    return res.status(500).json({ error: 'Erro ao excluir coordenador.' });
  }
});

// Rota para buscar todos os coordenadores
router.get('/coordenadores', async (req, res) => {
  try {
    const coordenadores = await Coordenador.findAll({
      order: [["id_coordenador", "DESC"]],
    });
    res.status(200).json(coordenadores);
  } catch (error) {
    console.error("Erro ao buscar coordenadores:", error);
    res.status(500).json({ error: 'Erro ao buscar coordenadores.' });
  }
});


//ROTAS DE CURSO ------------------------------------------------------------
// Rota para adicionar ou editar um curso
router.post('/editar_curso', async (req, res) => {
  const { action, id_curso, nome_curso, descricao, carga_horaria } = req.body;

  try {
    if (action === 'incluir') {
      const novoCurso = await Curso.create({ nome_curso, descricao, carga_horaria });
      return res.status(201).json(novoCurso);
    }

    if (action === 'alterar') {
      const curso = await Curso.findByPk(id_curso);
      if (!curso) {
        return res.status(404).json({ error: 'Curso não encontrado.' });
      }
      curso.nome_curso = nome_curso;
      curso.descricao = descricao;
      curso.carga_horaria = carga_horaria; // Certifique-se de que esse campo está sendo atualizado
      await curso.save();
      return res.status(200).json(curso);
    }
  } catch (error) {
    console.error("Erro ao editar curso:", error);
    return res.status(500).json({ error: 'Erro ao editar curso.' });
  }
});

// Rota para excluir um curso
router.delete('/excluir_curso/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ error: 'Curso não encontrado.' });
    }
    await Curso.destroy({ where: { id_curso: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir curso:", error);
    return res.status(500).json({ error: 'Erro ao excluir curso.' });
  }
});

// Rota para buscar todos os cursos
router.get('/cursos', async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      order: [["id_curso", "DESC"]],
    });
    res.status(200).json(cursos);
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
    res.status(500).json({ error: 'Erro ao buscar cursos.' });
  }
});


//ROTAS PARA MATRICULA
// Rota para buscar todas as matrículas
router.get('/matriculas', async (req, res) => {
  try {
    const matriculas = await Matricula.findAll({
      include: [
        { model: Aluno, as: 'Aluno' },
        { model: Curso, as: 'Curso' }
      ],
      order: [["id_matricula", "DESC"]],
    });
    res.status(200).json(matriculas);
  } catch (error) {
    console.error("Erro ao buscar matrículas:", error);
    res.status(500).json({ error: 'Erro ao buscar matrículas.' });
  }
});

// Rota para editar matrícula
router.post('/editar_matricula', async (req, res) => {
  const { action, id_matricula, id_aluno, id_curso, data_matricula } = req.body;

  try {
    if (action === 'incluir') {
      const novaMatricula = await Matricula.create({ id_aluno, id_curso, data_matricula });

      // Carregar dados do aluno e do curso
      const matriculaComDetalhes = await Matricula.findByPk(novaMatricula.id_matricula, {
        include: [
          { model: Aluno, as: 'Aluno' },
          { model: Curso, as: 'Curso' }
        ]
      });
      
      return res.status(201).json(matriculaComDetalhes);
    }

    if (action === 'alterar') {
      const matricula = await Matricula.findByPk(id_matricula);
      if (!matricula) {
        return res.status(404).json({ error: 'Matrícula não encontrada.' });
      }

      // Atualiza os campos
      matricula.id_aluno = id_aluno;
      matricula.id_curso = id_curso;
      matricula.data_matricula = data_matricula;
      await matricula.save();

      // Carregar dados do aluno e do curso
      const matriculaComDetalhes = await Matricula.findByPk(id_matricula, {
        include: [
          { model: Aluno, as: 'Aluno' },
          { model: Curso, as: 'Curso' }
        ]
      });

      return res.status(200).json(matriculaComDetalhes);
    }
  } catch (error) {
    console.error("Erro ao editar matrícula:", error);
    return res.status(500).json({ error: 'Erro ao editar matrícula.' });
  }
});

// Rota para excluir uma matrícula
router.delete('/excluir_matricula/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const matricula = await Matricula.findByPk(id);
    if (!matricula) {
      return res.status(404).json({ error: 'Matrícula não encontrada.' });
    }
    await Matricula.destroy({ where: { id_matricula: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir matrícula:", error);
    return res.status(500).json({ error: 'Erro ao excluir matrícula.' });
  }
});


//ROTAS DE PAGAMENTOS-------------------------------------------------
// Rota para buscar todos os pagamentos
router.get('/pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamentos.findAll({
      include: [{ model: Aluno, as: 'Aluno' }],
      order: [["id_pagamento", "DESC"]],
    });
    res.status(200).json(pagamentos);
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
    res.status(500).json({ error: 'Erro ao buscar pagamentos.' });
  }
});

// Rota para editar pagamento
router.post('/editar_pagamento', async (req, res) => {
  const { action, id_pagamento, valor, descricao, data_pagamento, id_aluno } = req.body;

  try {
    if (action === 'incluir') {
      const novoPagamento = await Pagamentos.create({ valor, descricao, data_pagamento, id_aluno });
      
      const pagamentoComAluno = await Pagamentos.findByPk(novoPagamento.id_pagamento, {
        include: [{ model: Aluno, as: 'Aluno' }],
      });

      return res.status(201).json(pagamentoComAluno);
    }

    if (action === 'alterar') {
      const pagamento = await Pagamentos.findByPk(id_pagamento);
      if (!pagamento) {
        return res.status(404).json({ error: 'Pagamento não encontrado.' });
      }

      pagamento.valor = valor;
      pagamento.descricao = descricao;
      pagamento.data_pagamento = data_pagamento;
      pagamento.id_aluno = id_aluno;
      await pagamento.save();

      const pagamentoAtualizado = await Pagamentos.findByPk(id_pagamento, {
        include: [{ model: Aluno, as: 'Aluno' }],
      });

      return res.status(200).json(pagamentoAtualizado);
    }
  } catch (error) {
    console.error("Erro ao editar pagamento:", error);
    return res.status(500).json({ error: 'Erro ao editar pagamento.' });
  }
});

// Rota para excluir um pagamento
router.delete('/excluir_pagamento/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const pagamento = await Pagamentos.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ error: 'Pagamento não encontrado.' });
    }
    await Pagamentos.destroy({ where: { id_pagamento: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir pagamento:", error);
    return res.status(500).json({ error: 'Erro ao excluir pagamento.' });
  }
});

//ROTAS PROFESSOR
// Rota para buscar todos os professores
router.get('/professores', async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    res.status(500).json({ error: 'Erro ao buscar professores.' });
  }
});

// Rota para incluir um professor
router.post('/editar_professor', async (req, res) => {
  const { action, id_professor, CPF_professor, nome_professor, telefone_professor, endereço_professor, CEP_professor } = req.body;

  try {
    if (action === 'incluir') {
      const novoProfessor = await Professor.create({ CPF_professor, nome_professor, telefone_professor, endereço_professor, CEP_professor });
      return res.status(201).json(novoProfessor);
    }

    if (action === 'alterar') {
      const professor = await Professor.findByPk(id_professor);
      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado.' });
      }
      professor.CPF_professor = CPF_professor;
      professor.nome_professor = nome_professor;
      professor.telefone_professor = telefone_professor;
      professor.endereço_professor = endereço_professor;
      professor.CEP_professor = CEP_professor;
      await professor.save();
      return res.status(200).json(professor);
    }
  } catch (error) {
    console.error("Erro ao editar professor:", error);
    return res.status(500).json({ error: 'Erro ao editar professor.' });
  }
});

// Rota para excluir um professor
router.delete('/excluir_professor/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ error: 'Professor não encontrado.' });
    }
    await Professor.destroy({ where: { id_professor: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir professor:", error);
    return res.status(500).json({ error: 'Erro ao excluir professor.' });
  }
});


//ROTAS PARA TURMA
// Rota para buscar todas as turmas
router.get('/turmas', async (req, res) => {
  try {
    const turmas = await Turma.findAll();
    res.status(200).json(turmas);
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
    res.status(500).json({ error: 'Erro ao buscar turmas.' });
  }
});

// Rota para editar turma
router.post('/editar_turma', async (req, res) => {
  const { action, id_turma, sala, horario, periodo } = req.body;

  try {
    if (action === 'incluir') {
      const novaTurma = await Turma.create({ sala, horario, periodo });
      return res.status(201).json(novaTurma);
    }

    if (action === 'alterar') {
      const turma = await Turma.findByPk(id_turma);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada.' });
      }
      turma.sala = sala;
      turma.horario = horario;
      turma.periodo = periodo;
      await turma.save();
      return res.status(200).json(turma);
    }
  } catch (error) {
    console.error("Erro ao editar turma:", error);
    return res.status(500).json({ error: 'Erro ao editar turma.' });
  }
});

// Rota para excluir uma turma
router.delete('/excluir_turma/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const turma = await Turma.findByPk(id);
    if (!turma) {
      return res.status(404).json({ error: 'Turma não encontrada.' });
    }
    await Turma.destroy({ where: { id_turma: id } });
    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao excluir turma:", error);
    return res.status(500).json({ error: 'Erro ao excluir turma.' });
  }
});


//ROTAS DE USUARIO
// Rota de login
app.post('/login', async (req, res) => {
  const { email_usuario, senha_usuario } = req.body;
  // Verifique o usuário no banco de dados
  const usuario = await Usuario.findOne({ where: { email_usuario, senha_usuario } });
  if (usuario) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

// Rota de registro
app.post('/register', async (req, res) => {
  const { nome_usuario, email_usuario, senha_usuario } = req.body;
  // Crie um novo usuário no banco de dados
  try {
    await Usuario.create({ nome_usuario, email_usuario, senha_usuario });
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false });
  }
});
app.use("/", router); // Isso irá registrar o router no app principal

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});