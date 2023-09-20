const db = require("./banco");

const Cadastro_notas_materias = db.sequelize.define("cadastro_notas_materias", {
    disciplina: {
        type: db.Sequelize.ENUM('Portugues', 'Matematica', 'Biologia', 'Quimica', 'Ciencias')
    },
    nota1: {
        type: db.Sequelize.INTEGER
    },
    nota2: {
        type: db.Sequelize.INTEGER
    },
    nota3: {
        type: db.Sequelize.INTEGER
    }


}, {
    timestamps: false
}
)

//Cadastro_notas_materias.sync({force: true})

module.exports = Cadastro_notas_materias