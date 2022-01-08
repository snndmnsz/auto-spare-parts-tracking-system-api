const { poolPromise } = require("../database/db");

exports.getAPart = async (req, res, next) => {
  const partID = req.params.id;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM Part p WHERE p.PartID='${partID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.postAPart = async (req, res, next) => {
  const PartID = req.body.PartID;
  const PartName = req.body.PartName;
  const Year = parseInt(req.body.Year);
  const IsSecondHand = req.body.IsSecondHand;
  const BrandID = parseInt(req.body.BrandID);
  const BarcodNumber = req.body.BarcodNumber;
  const Price = parseFloat(req.body.Price);
  const CurrencyStatus = parseInt(req.body.CurrencyStatus);
  const Details = req.body.Details;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO Part (PartID, PartName, Year,IsSecondHand, BrandID, BarcodNumber, Price, CurrencyStatus, Details)
      VALUES ('${PartID}','${PartName}',${Year},'${IsSecondHand}',${BrandID},'${BarcodNumber}',${Price},${CurrencyStatus},'${Details}')`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.createAPart = async (req, res, next) => {
  const PartID = req.body.PartID;
  const PartName = req.body.PartName;
  const Year = parseInt(req.body.Year);
  const IsSecondHand = req.body.IsSecondHand;
  const BrandID = parseInt(req.body.BrandID);
  const BarcodNumber = req.body.BarcodNumber;
  const Price = parseFloat(req.body.Price);
  const CurrencyStatus = parseInt(req.body.CurrencyStatus);
  const Details = req.body.Details;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query(`INSERT INTO Part (PartID, PartName, Year,IsSecondHand, BrandID, BarcodNumber, Price, CurrencyStatus, Details)
      VALUES ('${PartID}','${PartName}',${Year},'${IsSecondHand}',${BrandID},'${BarcodNumber}',${Price},${CurrencyStatus},'${Details}')`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.getPartsForCar = async (req, res, next) => {
  const partID = req.params.id;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`SELECT * FROM PartsForCar ps WHERE ps.PartID='${partID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.deleteAPart = async (req, res, next) => {
  const PartID = req.body.PartID;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(`DELETE FROM Part  WHERE PartID='${PartID}'`);

    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

exports.updateAPart = async (req, res, next) => {
  const PartID = req.body.PartID;
  const PartName = req.body.PartName;
  const Year = parseInt(req.body.Year);
  const IsSecondHand = req.body.IsSecondHand;
  const BrandID = parseInt(req.body.BrandID);
  const BarcodNumber = req.body.BarcodNumber;
  const Price = parseFloat(req.body.Price);
  const CurrencyStatus = parseInt(req.body.CurrencyStatus);
  const Details = req.body.Details;

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`UPDATE Part
    SET PartName='${PartName}', Year=${Year},IsSecondHand='${IsSecondHand}', BrandID=${BrandID}, BarcodNumber='${BarcodNumber}', Price=${Price}, CurrencyStatus=${CurrencyStatus},Details='${Details}'
    WHERE PartID='${PartID}'`);
    res.status(201).json(result.recordset);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
