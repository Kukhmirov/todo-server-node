const db = require("../models");
const Todo = db.todo;
const Op = db.Sequelize.Op;

// Создать и сохранить базу данных
exports.create = (req, res) => {
  // Валидация данных
if (!req.body.title) {
    res.status(400).send({
        message: "Content can not be empty!"
    });

    return;
}

  // Создаем новый туду
  const todo = {
    title: req.body.title,
    description: req.body.description,
  };

  // Сохранить таск в базу данных
  Todo.create(todo)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Tod."
            });
        });
};

// Поиск по данным
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Todo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving todo."
            });
        });
};

// Поиск в Todo по id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Todo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                message: `Cannot find Tod with id=${id}.`
                });
            }
            })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Todo with id=${id}`
            });
        });
};

// Обновить Todo выбраной задачи
exports.update = (req, res) => {
    const id = req.params.id;

    Todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                message: "Todo was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating Todo with id=${id}`
            });
        });
};

// Удалить выбранную задачу по id
exports.delete = (req, res) => {
    const id = req.params.id;

    Todo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Todo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete Todo with id=${id}`
            });
        });
};

// Удалить все задачи
exports.deleteAll = (req, res) => {
    Todo.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({message: `${nums} Todo were deleted successfully!`});
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving todo."
        });
    });
};
