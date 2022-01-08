const { poolPromise } = require("../database/db");

exports.getActiveOrders = async (req, res, next) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "select * from OrderStatus os where os.OrderStatus in ('Awaiting Payment','Payment Received')"
      );

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.findPartsInOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM PartsInOrders psio WHERE psio.OrderID='${orderId}'`
      );

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.createAnOrder = async (req, res, next) => {
  const CustomerID = req.body.CustomerID;
  const OrderID = req.body.OrderID;
  const EmployeeID = req.body.EmployeeID;
  const OrderDate = req.body.OrderDate;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `INSERT INTO Orders (OrderID,CustomerID,EmployeeID,OrderDate) VALUES('${OrderID}',${CustomerID},${EmployeeID},'${OrderDate}')`
      );

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.createOrderStatus = async (req, res, next) => {
  const OrderID = req.body.OrderID;
  const OrderPriority = req.body.OrderPriority;
  const OrderStatus = req.body.OrderStatus;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `INSERT INTO OrderStatus (OrderID,OrderPriority,OrderStatus) VALUES('${OrderID}','${OrderPriority}','${OrderStatus}')`
      );

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postPartsInToOrder = async (req, res, next) => {
  const OrderID = req.body.OrderID;
  const PartID = req.body.PartID;
  const PartSupplierID = 1;
  const Quantity = parseInt(req.body.Quantity);
  const ActualSalesPrice = parseFloat(req.body.ActualSalesPrice);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO PartsInOrders (OrderID, PartID, PartSupplierID, Quantity, ActualSalesPrice)  
      VALUES('${OrderID}','${PartID}',${PartSupplierID},${Quantity},${ActualSalesPrice})`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postDeliverOrder = async (req, res, next) => {
  const OrderID = req.body.OrderID;

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`UPDATE OrderStatus
      SET OrderStatus='Completed'
      WHERE OrderID='${OrderID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postCancelOrder = async (req, res, next) => {
  const OrderID = req.body.OrderID;
  const orderStatus = req.body.orderStatus;

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`UPDATE OrderStatus
      SET OrderStatus='${orderStatus}'
      WHERE OrderID='${OrderID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

