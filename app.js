const express = require("express");
const app = express();
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");
const post = require("./models/post");

app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.render("main");
});

// Funções de formatação
function formatString(str) {
  // Implemente a lógica de formatação aqui
  return str;
}

function formatInteger(num) {
  // Implemente a lógica de formatação aqui
  return num;
}

// Restante do código...

app.get("/consulta", function (req, res) {
  post
    .findAll()
    .then(function (post) {
      const formattedPosts = post.map((post) => {
        return {
          ...post,
          disciplina: formatString(post.disciplina),
          nota1: formatInteger(post.nota1),
          nota2: formatInteger(post.nota2),          
          nota3: formatInteger(post.nota3),          
        };
      });
      res.render("consulta", { post: formattedPosts });
    })
    .catch(function (erro) {
      console.log("Erro ao carregar dados do banco: " + erro);
    });
});

app.get("/editar/:id", function (req, res) {
  post
    .findAll({ where: { id: req.params.id } })
    .then(function (post) {
      res.render("editar", { post });
    })
    .catch(function (erro) {
      console.log("Erro ao carregar dados do banco: " + erro);
    });
});

app.get("/excluir/:id", function (req, res) {
  post
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => {
      res.redirect("/consulta");
    })
    .catch((erro) => {
      console.log("Erro ao excluir os dados: " + erro);
    });
});

app.post("/cadastrar", function (req, res) {
  post
    .create({
      disciplina: req.body.disciplina,
      nota1: req.body.nota1,
      nota2: req.body.nota2,
      nota3: req.body.nota3,
    })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (erro) {
      res.send("Falha ao cadastrar os dados: " + erro);
    });
});
app.post("/atualizar", function (req, res) {
  post
    .update(
      {
        disciplina: req.body.disciplina,
        nota1: req.body.nota1,
        nota2: req.body.nota2,
        nota3: req.body.nota3,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
    .then(function () {
      res.redirect("/consulta");
    });
});

app.post("/excluir", function (req, res) {
  Agendamentos.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then(() => {
      res.redirect("/consulta");
    })
    .catch((erro) => {
      console.log("Erro ao excluir os dados: " + erro);
    });
});

app.listen(8081, function () {
  console.log("Servidor ativo!");
});