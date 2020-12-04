const deleteAlert = ` <div
class="alert  alert-dismissible text-center fade show red-alert text-white "
role="alert"
id=""
>
<strong>hecho!</strong> equipo borrado
<button type="button" class="close text-white" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const alertaError = ` <div
class="alert yellow-danger text-center alert-dismissible fade show "
role="alert"
id=""
>
<strong class="ml-3">Error!</strong> No se pudo procesar
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const alertaSearch = ` <div
class="alert yellow-danger  alert-dismissible text-center fade show "
role="alert"
id=""
>
<strong  class="ml-3">Error!</strong> No se encontró
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`;
const alerta = document.querySelector("#alerta");
const listMachine = document.querySelector("#listMachine");
const disminModal = document.querySelector("#disminModal");
const loader = document.querySelector("#loader");
const loaderRemove = document.querySelector("#loaderRemove");
const btnSaveMachine = document.querySelector("#btnSaveMachine");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");
const load = document.querySelector("#load");
const scroll = document.querySelector("#scroll");
// const funcion = document.querySelector("#funciones");

// set data table products
const setTableMachine = (machines) => {
  load.classList.remove("d-none");
  scroll.classList.add("scroll");
  let body = "";

  for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];
    body += `<div class="contenido  col-md-4 col-12 mb-1">
      <div class="card card-2 ">
        <div class="card-header segundo text-center text-white" _msthash="1543503" _msttexthash="151151"><h3>Codigo: ${machine.codificacion}</h3></div>
        <div class="card-body">
          <h5 class="card-title" _msthash="1919515" _msttexthash="852384">Nombre:${machine.equipo} </h5>
          <hr>  
        </div>
        <div class="card-body">
          
          <div onclick='deleteMachine(${machine.id})' class="button-machine red-alert c-hand"
            ><i class="fas fa-trash-alt "></i></i
          ></div>
          <a href="/views/maquinas/piezas/${machine.id}" class="btn yellow-danger"
            >p</a
          >
        </div>
        <div class="card-footer text-muted" _msthash="1664169" _msttexthash="144235"> Creado: ${machine.creacion}
        </div>
      </div>
    </div>`;
  }
  listMachine.innerHTML = body;
  load.classList.add("d-none");
  scroll.classList.remove("scroll");
};
const deleteMachine = async (id) => {
  try {
    await axios.get(`/delete/machina/${id}`);

    alerta.innerHTML += deleteAlert;
    getMachines();
  } catch (error) {
    console.log("no nene, lo estas haciendo mal");
  }
};

const getMachines = async () => {
  try {
    const { data } = await axios.get("/req/maquinas/");
    setTableMachine(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// add machine-------->
const addMachine = async () => {
  try {
    await axios.post(
      "/post/maquinas/",
      (data = {
        equipo: equipo.value,
        codificacion: codificacion.value,
        tipo: tipo.value,
        serial: serial.value,
        marca: marca.value,
        modelo: modelo.value,
        funcionamiento: funcionamiento.value,
        observaciones: observaciones.value,
      })
    );
    $("#formMachines")[0].reset();
    notificacionAdd.classList.remove("d-none");

    getMachines();
  } catch (err) {
    console.log("epa hay algo mal");
  }
};
// <---- ad machine

btnSaveMachine.addEventListener("click", (e) => {
  e.preventDefault();
  addMachine(
    equipo.value,
    codificacion.value,
    tipo.value,
    serial.value,
    marca.value,
    modelo.value,
    funcionamiento.value,
    observaciones.value
  );
});

notificacionRemove.addEventListener("click", (e) => {
  e.preventDefault();
  notificacionAdd.classList.add("d-none");
});
loaderRemove.addEventListener("click", (e) => {
  e.preventDefault();
  // loader.classList.add("d-none");
});
btnSearch.addEventListener("click", async () => {
  // load.classList.remove("d-none");
  try {
    const { data } = await axios.get(`/req/maquinas/busqueda/${search.value}`);

    if (data.length === 0) {
      alerta.innerHTML = alertaSearch;
    } else {
      setTableMachine(data);
    }
    load.classList.add("d-none");
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
    getMachines();
    alerta.innerHTML = alertaError;
  }
});

window.onload = async () => {
  await getMachines();
  // addfuncion();
};
disminModal.addEventListener("click", () => {
  const msg = document.querySelector("#codificacion");
  const serial = document.querySelector("#serial");
  msg.classList.remove("is-invalid");
  serial.classList.remove("is-invalid");
  msg.classList.remove("is-valid");
  serial.classList.remove("is-valid");
  $("#formMachines")[0].reset();
});

// const addfuncion = () => {
//   funcion.innerHTML = `<a href="/logout"><li  class="mdl-menu__item">salir</li></a>
//   <button  onclick="getMachines()" class="mdl-menu__item">buscar maquinas</button>
//   <li class="mdl-menu__item">recargar</li>`;
// };
