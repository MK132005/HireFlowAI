const express = require("express");

const router = express.Router();

const upload = require("../multer");

const {
  addEmployee,
  getEmployees,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post(
  "/add",
  upload.single("document"),
  addEmployee
);

router.get("/", getEmployees);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;