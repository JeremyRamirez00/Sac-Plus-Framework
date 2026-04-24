// ================= LOGIN =================
function irDashboard() {

    let data = {
        username: document.getElementById("usuario").value,
        password: document.getElementById("password").value
    };

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json()) // ahora JSON
    .then(resp => {

        if (resp.mensaje) { // validamos éxito
            localStorage.setItem("login", "ok");
            window.location.href = "dashboard.html";
        } else {
            alert(resp.error || "Usuario o contraseña incorrectos");
        }
    });
}

// ================= VALIDAR SESIÓN =================
function validarSesion() {
    if (localStorage.getItem("login") !== "ok") {
        window.location.href = "index.html";
    }
}

// ================= CERRAR SESIÓN =================
function volver() {
    localStorage.removeItem("login");
    window.location.href = "index.html";
}

// ================= REGISTRAR =================
function registrar() {

    let nombre = document.getElementById("nombre").value.trim();
    let fecha = document.getElementById("fecha").value;
    let equipo = document.getElementById("equipo").value.trim();
    let observaciones = document.getElementById("observaciones").value.trim();
    let estado = document.getElementById("estado").value;

    //  VALIDACIONES
    if (nombre === "" || fecha === "" || equipo === "" || estado === "") {
        alert("Todos los campos obligatorios deben estar llenos");
        return;
    }

    let data = {
        nombre: nombre,
        fecha: fecha,
        equipo: equipo,
        observaciones: observaciones,
        estado: estado
    };

    fetch("http://localhost:8080/api/monitoreo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Registro guardado correctamente");
        cargarDatos();
        limpiarTodo();
    });
}

// ================= LISTAR =================
function cargarDatos() {
    fetch("http://localhost:8080/api/monitoreo")
        .then(response => response.json())
        .then(data => {
            let tabla = document.querySelector("#tabla tbody");
            tabla.innerHTML = "";

            data.forEach(item => {
                let fila = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nombre}</td>
                        <td>${item.fecha}</td>
                        <td>${item.equipo}</td>
                        <td>${item.observaciones}</td>
                        <td>${item.estado}</td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        });
}

// ================= BUSCAR =================
function buscar() {
    let nombre = document.getElementById("nombre").value.trim();
    //  SI ESTÁ VACÍO → LISTAR
    if (nombre === "") {
        cargarDatos();
        return;
    }
    // SI HAY TEXTO → BUSCAR
    fetch("http://localhost:8080/api/monitoreo/buscar?nombre=" + nombre)
        .then(response => response.json())
        .then(data => {
            let tabla = document.querySelector("#tabla tbody");
            tabla.innerHTML = "";
            data.forEach(item => {
                let fila = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.nombre}</td>
                        <td>${item.fecha}</td>
                        <td>${item.equipo}</td>
                        <td>${item.observaciones}</td>
                        <td>${item.estado}</td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        });
}

// ================= ACTUALIZAR =================
function actualizar() {
    if (!filaSeleccionada) {
        alert("Seleccione una fila primero");
        return;
    }
    let id = filaSeleccionada.cells[0].innerText;
    let data = {
        nombre: document.getElementById("nombre").value,
        fecha: document.getElementById("fecha").value,
        equipo: document.getElementById("equipo").value,
        observaciones: document.getElementById("observaciones").value,
        estado: document.getElementById("estado").value
    };
    fetch("http://localhost:8080/api/monitoreo/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("Registro actualizado");
        cargarDatos();
        limpiarTodo();
    });
}

//================= FINALIZAR =================
function finalizar() {
    if (!filaSeleccionada) {
        alert("Seleccione una fila primero");
        return;
    }
    let id = filaSeleccionada.cells[0].innerText;
    fetch("http://localhost:8080/api/monitoreo/" + id + "/finalizar", {
        method: "PUT"
    })
    .then(() => {
        alert("Estado actualizado a Finalizado");
        cargarDatos();
        limpiarTodo();
    });
}


// ================= LIMPIAR =================
function limpiarTodo() {
    document.getElementById("nombre").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("equipo").value = "";
    document.getElementById("observaciones").value = "";
    document.getElementById("estado").value = "";

    document.querySelectorAll("#tabla tr").forEach(f => {
        f.classList.remove("seleccionada");
    });
    filaSeleccionada = null;
}

let filaSeleccionada = null;
document.addEventListener("click", function (e) {
    if (e.target.closest("#tabla tbody tr")) {

        let fila = e.target.closest("tr");

        document.querySelectorAll("#tabla tr").forEach(f => {
            f.classList.remove("seleccionada");
        });

        fila.classList.add("seleccionada");
        filaSeleccionada = fila;

        document.getElementById("nombre").value = fila.cells[1].innerText;
        document.getElementById("fecha").value = fila.cells[2].innerText;
        document.getElementById("equipo").value = fila.cells[3].innerText;
        document.getElementById("observaciones").value = fila.cells[4].innerText;
        document.getElementById("estado").value = fila.cells[5].innerText;
    }
});

document.addEventListener("click", function (e) {
    let tabla = document.getElementById("tabla");
    let formulario = document.querySelector(".form-container");
    // Si el click NO está en tabla NI en formulario
    if (!tabla.contains(e.target) && !formulario.contains(e.target)) {

        document.querySelectorAll("#tabla tr").forEach(f => {
            f.classList.remove("seleccionada");
        });
        limpiarTodo();
        filaSeleccionada = null;
    }
});