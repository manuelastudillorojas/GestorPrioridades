const { Router } = require("express");
const router = Router();


const {
  getCriticidad,
  createCriticidad,
  getCriticidadId,
  deleteCriticidad,
  updateCriticidad,
} = require("../controllers/criticidad.controller");

router.get("/criticidad", getCriticidad);
router.get("/criticidad/:id", getCriticidadId);
router.post("/criticidad", createCriticidad);
router.delete("/criticidad/:id", deleteCriticidad);
router.put("/criticidad/:id", updateCriticidad);

module.exports = router;
