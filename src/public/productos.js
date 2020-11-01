const form = document.querySelector("#form");
const listProduct = document.querySelector("#listProduct");

const btnSaveProduct = document.querySelector("#saveProduct");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const selectProveedor = document.querySelector("#selectProveedor");
// get product--->
const setTableProduct = (products) => {
  let body = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    body += `<tr>
        <th>${i + 1}</th>
        <th>${product.producto}</th>
        <th>${product.codificacion}</th>
        <th  id="${
          product.id
        }"><button class="btn btn-danger">delete</button></th>
      
      </tr>`;
  }
  listProduct.innerHTML = body;
};
const getProducts = async () => {
  
  try {
    const { data } = await axios.get("/req/productos/");

    setTableProduct(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }

  
};
// <--- get producto
// add product----->
const addProdut = async () => {
  notificacionAdd.classList.remove("d-none");

  try {
    await axios.post(
      "/post/productos/",
      (data = {
        producto: producto.value,
        codificacion: codificacion.value,
        categoria: categoria.value,
        precio_menor: precio_menor.value,
        precio_mayor: precio_mayor.value,
        proveedor_id: selectProveedor.value,
      })
    );

    getProducts();
    $("#form")[0].reset();
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <--- add product
// proveedores
const getProveedor = async () => {
  try {
    const { data } = await axios.get("/req/proveedores");
    getListProveedor(data);
  } catch (error) {}
};
const getListProveedor = (proveedores) => {
  let body = "";

  if (proveedores.length === 0) {
    proveedores.innerHTML = `<option selected disabled >No hay proveedores registrados</option>`;
    return;
  }
  for (let i = 0; i < proveedores.length; i++) {
    const proveedor = proveedores[i];
    body += `<option value="${proveedor.id}">${proveedor.nombre}</option>`;
  }
  selectProveedor.innerHTML = body;
};
// proveedores
btnSaveProduct.addEventListener("click", (e) => {
  e.preventDefault();
  addProdut(
    producto.value,
    codificacion.value,
    categoria.value,
    precio_menor.value,
    precio_mayor.value,
    selectProveedor.value
  );
});
notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});
btnSearch.addEventListener("click", async () => {
  try {
    const { data } = await axios.get(`/req/productos/${search.value}`);
    setTableProduct(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
window.onload = async () => {
  // await setTableMachine();
  await getProducts();
  await getProveedor();
  document.querySelector("#load").classList.add("d-none")

  document.querySelector("#scroll").classList.remove("scroll")
};
