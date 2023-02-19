module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("bd-todo", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
    });
  
    return Todo;
};