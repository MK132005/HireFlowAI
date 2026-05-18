const db = require("../db");

const addEmployee = (req, res) => {
  // add employee code
};

const getEmployees = (req, res) => {
  // get employee code
};

const verifyDocument = (req, res) => {
  const { id } = req.params;

  const {
    documentStatus,
    remark,
  } = req.body;

  const sql =
    "UPDATE employees SET documentStatus=?, remark=? WHERE id=?";

  db.query(
    sql,
    [documentStatus, remark, id],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Verification Failed",
        });
      }

      res.status(200).json({
        message: "Document Verified",
      });
    }
  );
};

module.exports = {
  addEmployee,
  getEmployees,
  verifyDocument,
};