const express = require("express");
const router = express.Router();
const pool = require("../database");

const app = express();
router.post("/producto", async (req, res) => {
  try {
    const {
      producto,
      codificacion,
      idEdit,
      precio_menor,
      precio_mayor,
    } = req.body;

    console.log(req.body);
    const send = await pool.query(
      "update  lista_productos  set producto = ? , codificacion = ?, precio_menor= ?, precio_mayor= ? where id = ?",
      [producto, codificacion, precio_menor, precio_mayor, idEdit]
    );

    res.json({
      msg: "Informacion actulizada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "No se pudo completar su operacion" });
  }
});
module.exports = router;
app;
