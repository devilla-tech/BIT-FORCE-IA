import { cargarIA, preguntarIA } from "./ia.js";

const estado = document.getElementById("estado");
const chat = document.getElementById("chat");
const pregunta = document.getElementById("pregunta");
const enviar = document.getElementById("enviar");


const botonIA = document.createElement("button");

botonIA.textContent = "Descargar IA";
botonIA.id = "cargar-ia";

estado.insertAdjacentElement(
    "afterend",
    botonIA
);


// CARGAR IA

botonIA.addEventListener("click", async () => {

    botonIA.disabled = true;
    botonIA.textContent = "Cargando...";

    try {

        await cargarIA((mensaje) => {
            estado.textContent = mensaje;
        });

        botonIA.textContent = "IA lista ✓";

    } catch (error) {

        console.error(error);

        estado.textContent = "❌ Error al cargar IA";

        botonIA.textContent = "Intentar de nuevo";
        botonIA.disabled = false;

        agregarMensaje(
            "No se pudo cargar la IA: " + error.message,
            "ia"
        );
    }
});


// ENVIAR PREGUNTA

async function enviarPregunta() {

    const texto = pregunta.value.trim();

    if (!texto) {
        return;
    }

    agregarMensaje(texto, "usuario");

    pregunta.value = "";

    estado.textContent = "VIA está pensando...";

    enviar.disabled = true;

    try {

        const respuesta =
            await preguntarIA(texto);

        agregarMensaje(respuesta, "ia");

        estado.textContent = "🟢 IA lista";

    } catch (error) {

        console.error(error);

        agregarMensaje(
            "⚠️ " + error.message,
            "ia"
        );

        estado.textContent =
            "IA no disponible";

    } finally {

        enviar.disabled = false;
        pregunta.focus();

    }
}


// BOTÓN ENVIAR

enviar.addEventListener(
    "click",
    enviarPregunta
);


// ENTER

pregunta.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            enviarPregunta();
        }

    }
);


// MOSTRAR MENSAJES

function agregarMensaje(texto, tipo) {

    const mensaje =
        document.createElement("div");

    mensaje.classList.add(
        "mensaje",
        tipo
    );

    mensaje.textContent = texto;

    chat.appendChild(mensaje);

    chat.scrollTop =
        chat.scrollHeight;
}


// SERVICE WORKER

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker.register(
                `${import.meta.env.BASE_URL}service-worker.js`
            )
            .then(() => {
                console.log(
                    "Service Worker registrado"
                );
            })
            .catch((error) => {
                console.error(
                    "Error Service Worker:",
                    error
                );
            });

        }
    );
}
