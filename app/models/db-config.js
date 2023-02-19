module.exports = {
    HOST: "127.0.0.1",
    USER: "mysql",
    PASSWORD: "mysql",
    DB: "node_test",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};