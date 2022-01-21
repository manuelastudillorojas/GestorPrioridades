const { Router } = require("express");
const router = Router();


const {
  getSeveridad,
  createSeveridad,
  getSeveridadById,
  deleteSeveridad,
  updateSeveridad,
} = require("../controllers/severidad.controller");

router.get("/severidad", getSeveridad);
router.get("/severidad/:id", getSeveridadById);
router.post("/severidad", createSeveridad);
router.delete("/severidad/:id", deleteSeveridad);
router.put("/severidad/:id", updateSeveridad);

module.exports = router;
