const { poolPromise } = require("../database/db");

exports.getAllCustomers = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from Customer");

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getCustomerById = async (req, res, next) => {
  const customerId = req.params.id;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`select * from Customer c where c.CustomerID=${customerId}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.putNewCustomer = async (req, res, next) => {
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const BirthDate = req.body.BirthDate;
  const Gender = req.body.Gender;
  const PhoneNumber = req.body.PhoneNumber;
  const CustomerSince = req.body.CustomerSince;
  const IsOrganization = req.body.IsOrganization;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO Customer (FirstName, LastName, Email, BirthDate, Gender, PhoneNumber, CustomerSince, IsOrganization)  
        VALUES ('${FirstName}','${LastName}','${Email}','${BirthDate}','${Gender}','${PhoneNumber}','${CustomerSince}','${IsOrganization}')`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.updateACustomer = async (req, res, next) => {
  const CustomerID = parseInt(req.body.CustomerID);
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const BirthDate = req.body.BirthDate;
  const Gender = req.body.Gender;
  const PhoneNumber = req.body.PhoneNumber;
  const IsOrganization = req.body.IsOrganization;

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`UPDATE Customer
      SET FirstName='${FirstName}',LastName='${LastName}', Email='${Email}', BirthDate='${BirthDate}', Gender='${Gender}', PhoneNumber='${PhoneNumber}',IsOrganization='${IsOrganization}'
      WHERE CustomerID=${CustomerID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.deleteACustomer = async (req, res, next) => {
  const CustomerID = parseInt(req.body.CustomerID);

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`DELETE FROM Customer WHERE CustomerID=${CustomerID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
