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
module.exports = router;
app;
