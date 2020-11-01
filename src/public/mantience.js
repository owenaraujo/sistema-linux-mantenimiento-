const btnGetMachine = document.querySelector("#btnGetMachine");
const listMachine = document.querySelector("#idMachine");
const selectMachine = document.querySelector("#equipo_id");
const listPieza = document.querySelector("#idPieza");
const pieza = document.querySelector("#pieza");
const listMantience = document.querySelector("#listMantience");
const listHerramientas = document.querySelector("#idHerramienta");
const btnSaveMantience = document.querySelector("#btnSaveMantience");
const notificacionRemove = document.querySelector("#notificacionRemove");
const notificacionRemove_check = document.querySelector(
  "#notificacionRemove_check"
);
const notificacionAdd = document.querySelector("#notificacionAdd");
const notificacionAdd_check = document.querySelector("#notificacionAdd_check");
const title_piezas = document.querySelector("#title_piezas");
const title_mantience = document.querySelector("#title_mantience");
const equipo_id_check = document.querySelector("#equipo_id_check");
const pieza_id_check = document.querySelector("#pieza_id_check");
const btnSaveMantienceCheck = document.querySelector("#btnSaveMantienceCheck");
const mantenimiento_id_check = document.querySelector(
  "#mantenimiento_id_check"
);

// set data table machines----->
const setTableMachine = (machines) => {
  let listMachines = "";
  let selectMachines = "";

  for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];
    listMachines += `<div onclick="setPostPiezas(${machine.id})" class="card mb-2 secondary-color mb-2 text-capitalize c-hand">
    <p  class="text-center h5 m-0 p-2">${machine.equipo}</p>
  </div>
    `;
    selectMachines += `<option value="${machine.id}">${machine.equipo}</option>`;
  }
  selectMachine.innerHTML = selectMachines;
  listMachine.innerHTML = listMachines;
  equipo_id_check.innerHTML = selectMachines;
};
const getMachines = async () => {
  try {
    const { data } = await axios.get("/req/maquinas/");

    setTableMachine(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <---set data table machine

// piezas de options---->
const setTablePiezasCheck = (piezas) => {
  let body = "";

  if (piezas.length === 0) {
    pieza_id_check.innerHTML = `<option selected disabled >No hay piezas del equipo</option>`;
    return;
  }
  for (let i = 0; i < piezas.length; i++) {
    const pieza = piezas[i];
    body += `<option value="${pieza.id}">${pieza.nombre_pieza}</option>`;
  }
  pieza_id_check.innerHTML = body;
};
const setTablePiezas = (piezas) => {
  let body = "";

  if (piezas.length === 0) {
    listPieza.innerHTML = `<option selected disabled >No hay piezas del equipo</option>`;
    return;
  }
  for (let i = 0; i < piezas.length; i++) {
    const pieza = piezas[i];
    body += `<option value="${pieza.id}">${pieza.nombre_pieza}</option>`;
  }
  listPieza.innerHTML = body;
};
const setPostTablePiezas = async (id) => {
  try {
    const { data } = await axios.get(`/req/equipos/piezas/${id}`);
    setTablePiezas(data);
    setTablePiezasCheck(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <---- píezas de options
// piezas list ---->
const setListPiezas = (piezas) => {
  let body = "";

  if (piezas.length === 0) {
    pieza.innerHTML = `<div class="card mb-2 bg-primary mb-2 text-capitalize">
    <p class="text-center h5 m-0 p-2">no hay piezas registradas</p>
  </div>`;
    return;
  }
  for (let i = 0; i < piezas.length; i++) {
    const pieza = piezas[i];
    body += `<div onclick="setPostMantience(${pieza.id})" class="card mb-2 bg-primary mb-2 text-capitalize c-hand" value="${pieza.id}">
    <p class="text-center h5 m-0 p-2">${pieza.nombre_pieza}</p>
  </div>`;
  }
  pieza.innerHTML = body;
};
const setPostPiezas = async (id) => {
  try {
    const { data } = await axios.get(`/req/equipos/piezas/${id}`);
    setListPiezas(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
  try {
    const { data } = await axios.get(`/req/mantenimiento_equipos/${id}`);
    setListMantience(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <----piezas list

// herramientas ----->
const setTableHerramientas = (herramientas) => {
  let body = "";

  for (let i = 0; i < herramientas.length; i++) {
    const herramienta = herramientas[i];
    body += `<option value="${herramienta.id}">${herramienta.nombre}</option>`;
  }
  listHerramientas.innerHTML = body;
};
// <---------- herramientas
// mantience ----->
const setPostMantienceMachine = async (id) => {
  try {
    const { data } = await axios.get(`/req/mantenimiento_equipos/${id}`);
    setTableMantienceCheck(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const setPostMantience = async (id) => {
  try {
    const { data } = await axios.get(`/req/mantenimiento_piezas/${id}`);
    setListMantience(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const setListMantience = (mantiences) => {
  let body = "";

  if (mantiences.length === 0) {
    listMantience.innerHTML = `<div class="card mb-2 bg-white mb-2 text-capitalize c-hand">
    <p class="text-center h5 m-0 p-2">no hay mantenimientos registrados</p>
  </div>`;
    return;
  }
  for (let i = 0; i < mantiences.length; i++) {
    const mantience = mantiences[i];
    body += `<div class="card mb-2 bg-white mb-2 text-capitalize" value="${mantience.id}">
    <p class="text-center h5 m-0 p-2">${mantience.descripcion}</p>
  </div>
  `;
  }
  listMantience.innerHTML = body;
};
// <--------------mantience

// add mantience-------->
const addmantience = async () => {
  notificacionAdd.classList.remove("d-none");

  try {
    await axios.post(
      "/post/mantenimiento/add/",
      (data = {
        piezas_id: idPieza.value,
        equipo_id: equipo_id.value,
        tipo: tipo.value,
        frecuencia: frecuencia.value,
        descripcion: descripcion.value,
      })
    );
    $("#form")[0].reset();
  } catch (err) {
    console.error("epa hay algo mal");
  }
};
// <---- ad mantience
// add mantience check
const addMantienceCheck = async () => {
  try {
    await axios.post(
      "/post/mantenimiento/addCheck/",
      (data = {
        mantenimiento_id: mantenimiento_id_check.value,
        detalles: detalles_check.value,
        complicaciones: complicaciones_check.value,
      })
    );
    $("#form_check")[0].reset();
    notificacionAdd_check.classList.remove("d-none");
  } catch (err) {
    console.error("epa hay algo mal");
  }
};
// add mantience check
// add  data form ---->
const setDataForm = async () => {
  try {
    const { data } = await axios.get(`/req/herramientas`);
    setTableHerramientas(data);
    let id = document.querySelector("#equipo_id").value;
    setPostTablePiezas(id);
    setPostMantienceMachine(id);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
// <----- add data form
const setTableMantienceCheck = (mantenimientos) => {
  let body = "";

  for (let i = 0; i < mantenimientos.length; i++) {
    const mantenimiento = mantenimientos[i];
    body += `<option value="${mantenimiento.id}">${mantenimiento.descripcion}</option>`;
  }
  mantenimiento_id_check.innerHTML = body;
};
// eventos---->
equipo_id_check.addEventListener("change", async () => {
  try {
    const id = document.querySelector("#equipo_id_check").value;
    setPostMantienceMachine(id);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
  try {
    const { data } = await axios.get(
      `/req/equipos/piezas/${equipo_id_check.value}`
    );

    setTablePiezasCheck(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
pieza_id_check.addEventListener("change", async () => {
  try {
    const { data } = await axios.get(
      `/req/mantenimiento_piezas/${pieza_id_check.value}`
    );
    setTableMantienceCheck(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});

selectMachine.addEventListener("change", async () => {
  try {
    const { data } = await axios.get(
      `/req/equipos/piezas/${selectMachine.value}`
    );
    setTablePiezas(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
btnSaveMantience.addEventListener("click", (e) => {
  e.preventDefault();
  addmantience(
    tipo.value,
    frecuencia.value,
    descripcion.value,
    idPieza.value,
    equipo_id.value
  );
});
btnSaveMantienceCheck.addEventListener("click", (e) => {
  e.preventDefault();
  addMantienceCheck(
    mantenimiento_id_check.value,
    detalles_check.value,
    complicaciones_check.value
  );
});
window.onload = async () => {
  await getMachines();
  await setDataForm();
  document.querySelector("#load").classList.add("d-none");
  document.querySelector("#scroll").classList.remove("scroll");
};

// <------eventos
