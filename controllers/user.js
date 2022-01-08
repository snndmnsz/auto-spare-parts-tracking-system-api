const { poolPromise } = require("../database/db");

exports.getALoginUser = async (req, res, next) => {
  const username = req.query.username;
  const password = req.query.password;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM Employee e WHERE e.Username='${username}' and e.Password='${password}'`
      );

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getAUser = async (req, res, next) => {
  const EmployeeID = parseInt(req.params.id);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Employee e WHERE e.EmployeeID=${EmployeeID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.updateAUser = async (req, res, next) => {
  const EmployeeID = parseInt(req.body.EmployeeID);
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Image = req.body.Image;

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`UPDATE Employee
        SET Name='${Name}', Surname='${Surname}',Email='${Email}', Username='${Username}', Password='${Password}', Image='${Image}'
        WHERE EmployeeID=${EmployeeID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postAUser = async (req, res, next) => {
  // const EmployeeID = parseInt(req.body.EmployeeID);
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Image = req.body.Image;
  const IsManager = req.body.IsManager;
  const IsSalesmen = req.body.IsSalesmen;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `INSERT INTO Employee (Name,Surname,Email,Username,Password,Image,IsManager,IsSalesmen) VALUES('${Name}','${Surname}','${Email}','${Username}','${Password}','${Image}','${IsManager}','${IsSalesmen}')`
      );

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM Employee e`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.deleteAUser = async (req, res, next) => {
  const EmployeeID = req.body.EmployeeID;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`DELETE FROM Employee  WHERE EmployeeID='${EmployeeID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.adminUpdateUser = async (req, res, next) => {
  const EmployeeID = parseInt(req.body.EmployeeID);
  const Name = req.body.Name;
  const Surname = req.body.Surname;
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const Image = req.body.Image;
  const IsManager = req.body.IsManager;
  const IsSalesmen = req.body.IsSalesmen;

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`UPDATE Employee
        SET Name='${Name}', Surname='${Surname}',Email='${Email}', Username='${Username}', Password='${Password}', Image='${Image}',IsManager='${IsManager}',IsSalesmen='${IsSalesmen}'
        WHERE EmployeeID=${EmployeeID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
