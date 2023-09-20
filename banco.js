const Sequelize = require("sequelize")
const sequelize = new Sequelize("p1_lab_desenvolvimento_multiplataforma", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

  sequelize.authenticate() 
    .then(() => { 
      console.log('Conexão estabelecida com sucesso.'); 
    }) 
    .catch(err => { 
      console.error('Erro ao se conectar com o banco de dados:', err); 
    }); 

    
module.exports = {
    Sequelize: Sequelize, 
    sequelize: sequelize
}
