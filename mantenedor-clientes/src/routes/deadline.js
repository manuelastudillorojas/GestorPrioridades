const { Router } = require("express");
const router = Router();

const {
  getDeadline,
  createDeadline,
  getDeadlineById,
  deleteDeadline,
  updateDeadline,
} = require("../controllers/deadline.controller");

router.get("/deadline", getDeadline);
router.get("/deadline/:id", getDeadlineById);
router.post("/deadline", createDeadline);
router.delete("/deadline/:id", deleteDeadline);
router.put("/deadline/:id", updateDeadline);

module.exports = router;
