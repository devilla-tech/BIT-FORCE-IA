import { CreateMLCEngine } from "@mlc-ai/web-llm";

let engine = null;

const MODELO = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

export async function cargarIA(actualizarEstado) {

    if (!navigator.gpu) {
        throw new Error(
            "Este dispositivo o navegador no soporta WebGPU."
        );
    }

    actualizarEstado("Preparando IA...");

    engine = await CreateMLCEngine(MODELO, {

        initProgressCallback: (progress) => {

            console.log(progress);

            const porcentaje =
                Math.round(progress.progress * 100);

            actualizarEstado(
                `Descargando IA... ${porcentaje}%`
            );
        }

    });

    actualizarEstado("🟢 IA lista");
}


export async function preguntarIA(texto) {

    if (!engine) {
        throw new Error(
            "Primero debes descargar/cargar la IA."
        );
    }

    const respuesta =
        await engine.chat.completions.create({

            messages: [
                {
                    role: "system",
                    content:
                        "Eres VIA, la inteligencia artificial de BIT FORCE. Responde siempre en español. Ayuda con programación, tecnología, estudio y preguntas generales. Cuando generes código, procura que sea claro y correcto."
                },
                {
                    role: "user",
                    content: texto
                }
            ],

            temperature: 0.7

        });

    return respuesta.choices[0].message.content;
}
