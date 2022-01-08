const sql = require("mssql");
const config = require("./dbConfig");

const poolPromise = new sql.ConnectionPool(config.sqlConfig)
  .connect()
  .then((pool) => {
    console.log("[DATABASE] MsSql Connected!");
    return pool;
  })
  .catch((err) => console.log(err));

module.exports = {
  sql,
  poolPromise,
};
