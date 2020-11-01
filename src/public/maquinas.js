const listMachine = document.querySelector("#listMachine");
const disminModal = document.querySelector("#disminModal");
const loader = document.querySelector("#loader");
const loaderRemove = document.querySelector("#loaderRemove");
const btnSaveMachine = document.querySelector("#btnSaveMachine");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionAdd = document.querySelector("#notificacionAdd");
const search = document.querySelector("#search");
const btnSearch = document.querySelector("#btnSearch");


// set data table products
const setTableMachine = (machines) => {
  let body = "";

  for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];
    body += `<div class="col mb-3">
      <div class="card md-3">
        <h3 class="card-header" _msthash="1543503" _msttexthash="151151">Codigo: ${machine.codificacion}</h3>
        <div class="card-body">
          <h5 class="card-title" _msthash="1919515" _msttexthash="852384">Nombre:${machine.equipo} </h5>
          <hr>  
        </div>
        <div class="card-body">
          <a
            href="/productos/editproduct/{{ id }}"
            class="button-machine bg-warning"
            ><i class="far fa-edit"></i></i
          ></a>
          <div onclick='deleteMachine(${machine.id})' class="button-machine bg-danger c-hand"
            ><i class="fas fa-trash-alt "></i></i
          ></div>
          <a href="/views/maquinas/piezas/${machine.id}" class="btn btn-primary"
            >p</a
          >
        </div>
        <div class="card-footer text-muted" _msthash="1664169" _msttexthash="144235"> Creado: ${machine.creacion}
        </div>
      </div>
    </div>`;
  }
  listMachine.innerHTML = body;
};
const deleteMachine = async (id) => {
  loader.classList.add("d-none");
  try {
    await axios.get(`/delete/machina/${id}`);
    loader.classList.remove("d-none");
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
  loader.classList.add("d-none");
});
btnSearch.addEventListener("click", async () => {
  charging.classList.remove("d-none");
  back.classList.add("back");
  try {
    const { data } = await axios.get(`/req/maquinas/${search.value}`);
    setTableMachine(data);
    charging.classList.add("d-none");
    back.classList.remove("back");
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});

window.onload = async () => {
  await getMachines();
  document.querySelector("#load").classList.add("d-none")

  document.querySelector("#scroll").classList.remove("scroll")

};
disminModal.addEventListener("click", () => {
  const msg = document.querySelector("#codificacion");
  const serial = document.querySelector("#serial");
  msg.classList.remove("is-invalid");
  serial.classList.remove("is-invalid");
  msg.classList.remove("is-valid");
  serial.classList.remove("is-valid");
  $("#formMachines")[0].reset();
  console.log("okidoki");
});
