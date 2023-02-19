module.exports = app => {
    const todo = require("../controllers/todo-controller");
  
    var router = require("express").Router();
  
    // Создание новой задачи
    router.post("/", todo.create);
  
    // Получить все задачи
    router.get("/", todo.findAll);

    // Получить задачи по id
    router.get("/:id", todo.findOne);
  
    // Обновить задачи по id
    router.put("/:id", todo.update);
  
    // Удалить задачу по id
    router.delete("/:id", todo.delete);
  
    // Удалить все задачи
    router.delete("/", todo.deleteAll);
  
    app.use('/api/todo', router);
};