const { poolPromise } = require("../database/db");

exports.getAllParts = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("select * from Part");

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getCurrency = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM currency");

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getBrandById = async (req, res, next) => {
  const brandID = req.params.id;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`select * from Brand b where b.ID='${brandID}' `);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getPartsInStoragebyID = async (req, res, next) => {
  const barcodeNumber = req.params.barcode;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Storage s WHERE s.BarcodNumber='${barcodeNumber}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.findCarById = async (req, res, next) => {
  const carId = req.params.id;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Car c WHERE c.CarID='${carId}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getBills = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM Bill
    order by PaymentID`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getInvoice = async (req, res, next) => {
  const BillID = req.params.id;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`select  b.BillID, b.PaymentID, b.Name + ' ' +  b.Surname FullName, b.TotalCost, b.PaymentDate ,p.CustomerID,
    pio.OrderID, pio.PartID, pio.Quantity, pio.ActualSalesPrice,pt.Price,pt.PartName
from Bill b inner join Payment p on p.PaymentID=b.PaymentID right join PartsInOrders pio on pio.OrderID=p.OrderID left join Part pt on pt.PartID=pio.PartID
where b.BillID='${BillID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.deleteABill = async (req, res, next) => {
  const PaymentID = parseInt(req.body.PaymentID);

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`DELETE FROM Bill WHERE PaymentID=${PaymentID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM ManagerMessages`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postAPartToStorage = async (req, res, next) => {
  const BarcodNumber = req.body.BarcodNumber;
  const Quantity = parseInt(req.body.Quantity);
  const RackPlace = req.body.RackPlace;
  const ShelveNumber = parseInt(req.body.ShelveNumber);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO Storage (BarcodNumber, Quantity, RackPlace,ShelveNumber)
      VALUES ('${BarcodNumber}',${Quantity},'${RackPlace}',${ShelveNumber})`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postAMessages = async (req, res, next) => {
  const ManagerID = parseInt(req.body.ManagerID);
  const MessageType = req.body.MessageType;
  const Message = req.body.Message;
  const MessageDate = req.body.MessageDate;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO ManagerMessages (ManagerID, MessageType, Date,Message)
      VALUES (${ManagerID},'${MessageType}','${MessageDate}','${Message}')`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.deleteAMessages = async (req, res, next) => {
  const MessageID = parseInt(req.body.MessageID);

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`DELETE FROM ManagerMessages WHERE MessageID=${MessageID}`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getCreateBillForOrder = async (req, res, next) => {
  const OrderID = req.params.orderId;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`SELECT o.OrderID, o.CustomerID, o.EmployeeID, o.OrderDate ,c.FirstName, c.LastName, c.Email, c.BirthDate,
    c.Gender, c.PhoneNumber, c.CustomerSince, c.IsOrganization
    FROM Orders o inner join Customer c on c.CustomerID=o.CustomerID
    WHERE o.OrderID='${OrderID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getPaymentMethods = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM PaymentMethodStatus`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.createAPayment = async (req, res, next) => {
  const CustomerID = parseInt(req.body.CustomerID);
  const OrderID = req.body.OrderID;
  const PaymentMethodStatus = parseInt(req.body.PaymentMethodStatus);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO Payment(CustomerID, OrderID, PaymentMethodStatus) 
              VALUES(${CustomerID},'${OrderID}',${PaymentMethodStatus})`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM Payment`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.deleteAPayment = async (req, res, next) => {
  const OrderID = req.body.OrderID;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`DELETE FROM Payment WHERE OrderID='${OrderID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.createABill = async (req, res, next) => {
  const BillId = req.body.BillId;
  const PaymentID = parseInt(req.body.PaymentID);
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const PhoneNumber = req.body.PhoneNumber;
  const TotalCost = parseFloat(req.body.TotalCost);
  const PaymentDate = req.body.PaymentDate;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO  Bill(BillID, PaymentID, Name, Surname, PhoneNumber, TotalCost, PaymentDate) 
      VALUES('${BillId}', ${PaymentID}, '${FirstName}', '${LastName}', '${PhoneNumber}', ${TotalCost}, '${PaymentDate}')`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
