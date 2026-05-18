const express = require("express");

const {
  addEmployee,
  getEmployees,
  verifyDocument,
} = require("../controllers/employeeController");

const router = express.Router();

router.post("/add", addEmployee);

router.get("/", getEmployees);

router.patch(
  "/verify/:id",
  verifyDocument
);

module.exports = router;