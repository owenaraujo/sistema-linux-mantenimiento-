const form = document.querySelector("#form");
const listProduct = document.querySelector("#listProduct");

const btnSaveProduct = document.querySelector("#saveProduct");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const selectProveedor = document.querySelector("#selectProveedor");
const alerta = document.querySelector("#alerta");
const formEdit = document.querySelector("#formEdit");

const deleteAlert = /*html*/ ` <div
class="alert  alert-dismissible fade show red-alert text-white "
role="alert"
id=""
>
<strong>hecho!</strong> Producto borrado
<button type="button" class="close text-white" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const editAlert = /*html*/ ` <div
class="alert  alert-dismissible fade show green-success text-white "
role="alert"
id=""
>
<strong>hecho!</strong> Producto editado
<button type="button" class="close text-white" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const deleteProducto = async (id) => {
  await axios.get(`/delete/producto/${id}`);
  alerta.innerHTML += deleteAlert;
  getProducts();
};
// editProduct
const editProduct = async (id) => {
  const { data } = await axios.get(`/req/producto/${id}`);
  const [producto] = data;
  formEdit.innerHTML =
    /*html*/
    `
<form id="formEdit">
 <div id="notificacionAdd-edit" class="alert alert-info p-2 d-none">
   Producto agregado con exito
   <button id="notificacionRemove-edit" class="close">
     <span id="notificacionRemove-edit" aria-hidden="true"
       >&times;</span
     >
    
   </button>
 </div>
 <!-- body  -->
 

 <div>
   
   <input
   value = "${producto.producto}"
     type="text"
     id="productoEdit"
     class="form-control mb-4"
     placeholder="Nombre del producto"
   />
  
 </div>
 <div>
   <input
   value = "${producto.codificacion}"
   onkeyup="validateCod2(this)"
   
     type="text"
     id="codificacionEdit"
     class="form-control mb-4"
     placeholder="codificacion"
   />
 </div>
 <div>
   <input
   value = "${producto.precio_mayor}"

     type="text"
     id="precio_mayorEdit"
     class="form-control mb-4"
     placeholder="precio al por mayor"
   />
 </div>
 <div>
   <input
   value = "${producto.precio_menor}"

     type="text"
     id="precio_menorEdit"
     class="form-control mb-4"
     placeholder="precio unitario"
   />
   <input
   value = "${producto.id}"

     type="text"
     id="idEdit"
     class="form-control mb-4"
     placeholder="precio unitario"
   />
 </div>
 <!-- body -->

 <div class="text-center">
 <a
 onclick="sendEditProduct()"
 data-toggle="collapse"
 data-parent="#accordionEx194"
 href="#collapse6"
 aria-expanded="true"
 aria-controls="collapse6"
>
 <button
     type="submit"
     id="sendEditProduct"
     class="btn cuarto text-white btn-sm"
   >
     Guardar
   </button>
   </a>
 </div>
</form>`;
};

// editProduct
// sedEditProduct
const sendEditProduct = async () => {
  saveEditProducto(
    productoEdit.value,
    codificacionEdit.value,
    precio_mayorEdit.value,
    precio_menorEdit.value,
    idEdit.value
  );
};
const saveEditProducto = async (data) => {
  await axios.post(
    "/edit/producto/",
    (data = {
      producto: productoEdit.value,
      codificacion: codificacionEdit.value,
      idEdit: idEdit.value,
      precio_menor: precio_menorEdit.value,
      precio_mayor: precio_mayorEdit.value,
    })
  );
  getProducts();
  alerta.innerHTML = editAlert;
  formEdit.innerHTML = ``;
};
// sedEditProduct
// get product--->
const setTableProduct = (products) => {
  let body = "";

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    body += `<tr>
        <th>${i + 1}</th>
        <th>${product.producto}</th>
        <th>${product.codificacion}</th>
        <th  id=""><div onclick="deleteProducto(${
          product.id
        })" class="btn-lg cont-center text-white text-center red-alert c-hand">
        <i class="fas fa-trash-alt"></i>

        </div>
         <a onclick="editProduct(${product.id})"
          data-toggle="collapse"
          data-parent="#accordionEx194"
          href="#collapse6"
          aria-expanded="true"
          aria-controls="collapse6"
        >
        <div  class="btn-lg cont-center text-white text-center yellow-danger c-hand">
        <i class="fas fa-pencil-alt"></i>


        </div></a>
        </th>
      
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
  document.querySelector("#load").classList.add("d-none");

  document.querySelector("#scroll").classList.remove("scroll");
};
