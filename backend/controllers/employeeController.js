const db = require("../db");

const addEmployee = (req, res) => {
  try {
    const {
      fullName,
      department,
      position,
      salary,
      joiningDate,
    } = req.body;

    const document = req.file
      ? req.file.filename
      : null;

    const sql = `
      INSERT INTO employees
      (fullName, department, position, salary, joiningDate, document)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        fullName,
        department,
        position,
        salary,
        joiningDate,
        document,
      ],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        res.status(201).json({
          message: "Employee Added Successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error Fetching Employees",
      });
    }

    res.status(200).json(result);
  });
};
const deleteEmployee = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Delete Failed",
      });
    }

    res.status(200).json({
      message: "Employee Deleted",
    });
  });
};
module.exports = {
  addEmployee,
  getEmployees,
  deleteEmployee,
};