const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const saveProveedor = document.querySelector("#SaveProveedor");
const listProveedores = document.querySelector("#listProveedores");
const listProductos = document.querySelector("#listProductos");
const listProductosTotal = document.querySelector("#listProductosTotal");
const alerta = document.querySelector("#alerta");

// add
const addPorveedor = async () => {
  try {
    await axios.post(
      "/post/proveedores",
      (data = {
        nombre: nombre.value,
        correo: correo.value,
        telefono: telefono.value,
      })
    );
    $("#formProveedor")[0].reset();
    getProveedores();
    notificacionAdd.classList.remove("d-none");

    console.log("oki");
  } catch (error) {
    console.log("holi");
  }
};
// add

// list add
// const setTableProduct = (products) => {
//   let body = "";

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     body += `<div class="col-md-11 col-11 ml-2 card tercero text-white mb-2 c-hand">
//     <p class="text-center mt-2 mb-2">${product.producto}</p>
//   </div>`;
//   }
//   listProductosTotal.innerHTML = body;
// };
const getListProductos = (productos) => {
  let body = "";

  if (productos.length === 0) {
    listProductos.innerHTML = ` <a class=" text-center col-md-11 ml-3 col-5-5 mb-2 " 
    >
    <div >
      <div  class=" card tercero c-hand" value="">
      <p class="text-center mt-2 mb-2 text-white ">no hay productos registrados</p>
    </div>
  </div>
  </a>`;
    return;
  }
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    body += `<div class="card text-center col-md-11 ml-3 col-5-5 mb-2  tercero text-white mb-2 c-hand" value="">
    <p class="text-center mt-2 mb-2">${producto.producto}</p>
  </div>
`;
  }
  listProductos.innerHTML = body;
};
const getListProveedores = (proveedores) => {
  let body = "";

  if (proveedores.length === 0) {
    listProveedores.innerHTML = `<div class=" text-center text-white col-md-12 col-5-5 mb-2 "><div  class=" card tercero c-hand" value="">
    <p class="text-center mt-2 mb-2">No hay proveedores registrados</p>
  </div>
  <div class="mt-2">
  <a class=" btn-lg btn-floating red-alert c-hand" ><i class="fas fa-trash-alt"></i></a>
  <a class=" btn-lg btn-floating yellow-danger c-hand"> <i class="fas fa-pencil-alt"></i></a>
  </div>

  </div>`;
    return;
  }
  for (let i = 0; i < proveedores.length; i++) {
    const proveedor = proveedores[i];
    body += `  <a class=" text-center col-md-11 ml-3 col-5-5 mb-2 " data-toggle="collapse"onclick='getProductos(${proveedor.id}),getProveedorById(${proveedor.id})' data-parent="#accordionEx194" href="#collapse5" aria-expanded="true"
    aria-controls="collapse5">
    <div >
      <div  class=" card tercero c-hand" value="">
      <p class="text-center mt-2 mb-2 text-white ">${proveedor.nombre}</p>
    </div>
  </div>
  </a>
    


  `;
  }
  listProveedores.innerHTML = body;
};
const getProveedorById = async (id) => {
  const { data } = await axios.get(`/req/getProveedorById/${id}`);
  const [datos] = data;
  infoProveedor.innerHTML = `
  <div class="card-bg ">
              <div class="">
                <div
                  style="background-image: url(/productos/owen.jpg)"
                  class="avatar-center text-white mx-auto"
                ></div>
              </div>
            </div>
           
            <div class="card-body pt-5  bg-white">
              <div class="pt-2"></div>
                <div class="text-center">${datos.nombre}</div>
                <div class="cont">
                  <div class="">
                    <div class="boton-circular blue-gradient">
                      <i class="fas fa-phone-alt"></i>
                    </div>
                  </div>
                  <div class="">
                    <div class="info blue-gradient text-white">
                      <strong class="ml-4 mr-4">${datos.telefono}</strong>
                    </div>
                  </div>
                </div>
                <div class="cont mt-2">
                  <div class="">
                    <div class="boton-circular blue-gradient">
                      <i class="far fa-envelope"></i>
                    </div>
                  </div>
                  <div class="">
                    <div class="info blue-gradient text-white">
                      <strong class="mr-4 ml-4" >${datos.correo}</strong>
                    </div>
                  </div>
                </div>
                <div class="mt-2 tex-center text-white">
                <div
                  class="btn-lg cont-center text-center red-alert c-hand"
                  onclick="deleteProveedor(${datos.id})"
                >
                  <i class="fas fa-trash-alt"></i>
                </div>
                <div class="btn-lg cont-center text-center yellow-danger c-hand">
                  <i class="fas fa-pencil-alt"></i>
                </div>
              </div>
            </div>`;
};
// list add
const infoProveedor = document.querySelector("#infoProveedor");
const btn = ``;
// get
const getProducts = async () => {
  try {
    const { data } = await axios.get("/req/productos/");

    // setTableProduct(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const getProductos = async (id) => {
  try {
    const { data } = await axios.get(`/req/productos/proveedor/${id}`);
    getListProductos(data);
  } catch (error) {
    console.log("holi ");
  }
};
const getProveedores = async () => {
  try {
    const { data } = await axios.get("/req/proveedores");
    getListProveedores(data);
  } catch (error) {}
};
// get
// eventos
saveProveedor.addEventListener("click", (e) => {
  e.preventDefault();
  addPorveedor(nombre.value, correo.value, telefono.value);
});
window.onload = async () => {
  await getProveedores();
  getProducts();
  document.querySelector("#load").classList.add("d-none");

  document.querySelector("#scroll").classList.remove("scroll");
};
notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});
// eventos
const deleteProveedor = async (id) => {
  try {
    await axios.get(`/delete/proveedor/${id}`);
    // alert("success");
    getProveedores();
    infoProveedor.innerHTML = ``;
  } catch (error) {
    alert("no");
  }
};
