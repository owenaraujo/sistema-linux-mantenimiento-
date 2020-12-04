const express = require("express");
const router = express.Router();
const pool = require("../database");

const app = express();

router.get("/machina/:id", async (req, res) => {
  const { id } = req.params;
  const borrado = await pool.query("DELETE FROM lista_maquinas WHERE  ID= ?", [
    id,
  ]);

  res.json(borrado);
});
router.get("/proveedor/:id", async (req, res) => {
  const { id } = req.params;
  const borrado = await pool.query("DELETE FROM proveedores WHERE  id= ?", [
    id,
  ]);

  res.json(borrado);
});
router.get("/producto/:id", async (req, res) => {
  const { id } = req.params;
  const borrado = await pool.query("DELETE FROM lista_productos WHERE  id= ?", [
    id,
  ]);

  res.json(borrado);
});
router.get("/herramientas/:id", async (req, res) => {
  const { id } = req.params;
  const herramientas = await pool.query(
    "delete from herramientas  where id =?",
    [id]
  );

  res.json(herramientas);
});
module.exports = router;
app;
