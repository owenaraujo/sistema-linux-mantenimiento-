const listMachine = document.querySelector("#machine");
const input = document.querySelector("#input");
const button = document.querySelector("#button");
// add machine-------->
const addMachine = async () => {
  try {
    await axios.post(
      "/post/maquinas/editando/datos",
      (data = {
        equipo: equipo.value,
        codificacion: codificacion.value,
        id: id.value,
        serial: serial.value,
        marca: marca.value,
        modelo: modelo.value,
        funcionamiento: funcionamiento.value,
        observaciones: observaciones.value,
      })
    );

    getMachines();
  } catch (err) {
    console.log("epa hay algo mal");
  }
};
// <---- ad machine
button.addEventListener("click", (e) => {
  e.preventDefault();
  addMachine(
    id.value,
    equipo.value,
    codificacion.value,
    serial.value,
    marca.value,
    modelo.value,
    funcionamiento.value,
    observaciones.value
  );
});
const getMachines = async () => {
  try {
    const { data } = await axios.get("/req/maquinas/");

    setTableMachine(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
};
const setInputsMachine = (dataMachine) => {
  let inputsMachine = "";
  for (let i = 0; i < dataMachine.length; i++) {
    const machine = dataMachine[i];
    inputsMachine += `
          <div class="form-group">
            <input
              type="text"
              id="equipo"
              value="${machine.equipo}"
              class="form-control"
              placeholder="equipo"
            />
            <div class="form-group">
            <input
              type="text"
              id="id"
              value="${machine.id}"
              class="form-control"
              placeholder="equipo"
              hidden
            />
          </div>
          <div class="row px-3 mb-2 justify-content-between">
            <input
              type="text"
              value="${machine.codificacion}"
              id="codificacion"
              class="form-control w-45"
              placeholder="codificacion"
              onkeyup="validateCod(this)"
              style="text-transform: uppercase"
            />
            <div class="invalid-feedback w-50"></div>
            <div class="invalid-feedback w-45">
              Ingrese una codificacion correcta
            </div>
          </div>

          <div>
            <input
              type="text"
              value="${machine.serial}"
              id="serial"
              onkeyup="validateSer(this)"
              class="form-control mb-2"
              placeholder="serial"
              style="text-transform: uppercase"
            />
            <div class="invalid-feedback">Ingrese un serial correcto</div>
            <h1 class="d-none" id="ValidateSerial"></h1>
          </div>
          <div class="row px-3 mb-2 justify-content-between">
            <input
              type="text"
              value="${machine.marca}"
              id="marca"
              class="form-control w-50"
              placeholder="marca"
            />
            <input
              type="text"
              id="modelo"
              value="${machine.modelo}"
              class="form-control w-45"
              placeholder="modelo"
            />
          </div>
          <div>
            <textarea
              id="funcionamiento"
              type="text"
              class="form-control mb-2"
              placeholder="funcionamiento y manejo"
            >${machine.funcionamiento}</textarea>
          </div>
          <div>
            <textarea
              id="observaciones"
              type="text"
              class="form-control"
              placeholder="observaciones"
            >${machine.observaciones}</textarea>
          </div>
         
        
    `;
  }
  input.innerHTML = inputsMachine;
};
const setTableMachine = (machines) => {
  let selectMachines = "";

  for (let i = 0; i < machines.length; i++) {
    const machine = machines[i];
    selectMachines += `<option  value="${machine.id}">${machine.equipo}</option>`;
    maquinas = `<option selected disabled value="">seleciona un equipo</option>`;
  }
  listMachine.innerHTML = maquinas + selectMachines;
};
listMachine.addEventListener("change", async () => {
  try {
    const { data } = await axios.get(
      `/req/maquinas/editando/${listMachine.value}`
    );
    console.log(data);
    setInputsMachine(data);
  } catch (err) {
    console.error("No se pudo conectar con el servidor");
  }
});
window.onload = async () => {
  await getMachines();
  document.querySelector("#load").classList.add("d-none");

  document.querySelector("#scroll").classList.remove("scroll");
};
