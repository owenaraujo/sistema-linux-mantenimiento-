const express = require("express");
const router = express.Router();
const pool = require("../database");

const app = express();

router.get("/usuarios", async (req, res) => {
  const user = await pool.query("SELECT * FROM usuarios");
  console.log(user);
});

router.get("/productos/", async (req, res) => {
  const productos = await pool.query("select * from lista_productos");
  res.json(productos);
});

router.get("/productos/proveedor/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await pool.query(
    "select * from lista_productos where proveedor_id = ?",
    [id]
  );
  res.json(productos);
});
router.get("/productos/:name", async (req, res) => {
  const { name } = req.params;
  const productos = await pool.query(
    `select * from lista_productos where producto LIKE '${name}%' OR categoria LIKE '${name}%' OR codificacion LIKE '${name}%'`
  );
  res.json(productos);
});
router.get("/maquinas/", async (req, res) => {
  const maquinas = await pool.query(
    "SELECT id, tipo, equipo, serial, codificacion, marca, modelo, funcionamiento, observaciones, user_id, date_format(create_at,'%d/%m/%Y %h:%i %p') as creacion, proveedor, estado FROM lista_maquinas"
  );
  res.json(maquinas);
});
router.get("/maquinas/editando/:id", async (req, res) => {
  const { id } = req.params;
  const maquinas = await pool.query(
    "SELECT id, tipo, equipo, serial, codificacion, marca, modelo, funcionamiento, observaciones, user_id, date_format(create_at,'%d/%m/%Y %h:%i %p') as creacion, proveedor, estado FROM lista_maquinas where id= ?",
    [id]
  );
  res.json(maquinas);
});
router.get("/maquinas/:name", async (req, res) => {
  const { name } = req.params;
  const maquinas = await pool.query(
    `SELECT id, tipo, equipo, serial, codificacion, marca, modelo, funcionamiento, observaciones, user_id, date_format(create_at,'%d/%m/%Y %h:%i %p') as creacion, proveedor, estado FROM lista_maquinas
    where equipo LIKE '${name}%' OR codificacion LIKE '${name}%' OR marca LIKE '${name}%' OR modelo LIKE '${name}%'`
  );
  res.json(maquinas);
});
router.get("/herramientas/", async (req, res) => {
  const herramientas = await pool.query("select * from herramientas");
  // console.log(herramientas);
  res.json(herramientas);
});
router.get("/herramientas/:name/", async (req, res) => {
  const { name } = req.params;
  const herramientas = await pool.query(
    `select * from herramientas where nombre LIKE '${name}%' OR detalles LIKE '${name}%'`
  );
  res.json(herramientas);
});
router.get("/piezas/", async (req, res) => {
  const piezas = await pool.query("select * from piezas");
  console.log(piezas);
});
router.get("/proveedores/", async (req, res) => {
  const proveedores = await pool.query("select * from proveedores");
  res.json(proveedores);
});
router.get("/servicio/", async (req, res) => {
  const servicio = await pool.query("select * from servicio");
  console.log(servicio);
});
router.get("/reparaciones_servicio/", async (req, res) => {
  const reparaciones_servicio = await pool.query(
    "select * from reparaciones_servicio"
  );
  console.log(reparaciones_servicio);
});
router.get("/mantenimiento_piezas/:id", async (req, res) => {
  const { id } = req.params;
  const mantenimiento_piezas = await pool.query(
    "select * from mantenimiento_piezas where piezas_id = ?",
    [id]
  );
  res.json(mantenimiento_piezas);
});
router.get("/mantenimiento_equipos/:id", async (req, res) => {
  const { id } = req.params;
  const mantenimiento_equipo = await pool.query(
    "select * from mantenimiento_piezas where equipo_id = ?",
    [id]
  );
  res.json(mantenimiento_equipo);
});
router.get("/detalles_mantenimiento_piezas/", async (req, res) => {
  const detalles_mantenimiento_piezas = await pool.query(
    "select * from detalles_mantenimiento_piezas"
  );
  console.log(detalles_mantenimiento_piezas);
});
// piezas
router.get("/equipos/piezas/:name", async (req, res) => {
  const { name } = req.params;

  const piezas = await pool.query(
    `select * from piezas WHERE pieza_equipo_id = '${name}%'`
  );

  // console.log(piezas);
  res.json(piezas);
});
// piezas
// piezas search
router.get("/equipos/piezas/search/:name/:search", async (req, res) => {
  const { name, search } = req.params;

  const piezas = await pool.query(
    `select * from piezas WHERE pieza_equipo_id = '${name}%' and nombre_pieza LIKE '${search}%'`
  );
  res.json(piezas);
});
// piezas search
// count
router.get("/count/productos/", async (req, res) => {
  const columnas = await pool.query("select count(id) from lista_productos");
  res.json(columnas);
});
router.get("/count/equipos/", async (req, res) => {
  const equipos = await pool.query("select count(id) from lista_maquinas");
  res.json(equipos);
});
router.get("/count/mantenimiento/", async (req, res) => {
  const columnas = await pool.query(
    "SELECT count(id) FROM detalles_mantenimiento WHERE date_format(create_at,'%y/%m/%d')= curdate() "
  );
  res.json(columnas);
});
router.get("/count/productos/", async (req, res) => {
  const columnas = await pool.query("select count(id) from lista_productos");
  res.json(columnas);
});
// count
module.exports = router;
app;
