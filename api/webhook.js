export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message, waId } = req.body;

    const respuesta = await generarRespuestaRosalba(message);

    await fetch('https://app.wati.io/api/v1/sendSessionMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer TU_ACCESS_TOKEN_DE_WATI`
      },
      body: JSON.stringify({
        phone: waId,
        messageText: respuesta
      })
    });

    res.status(200).json({ status: 'Mensaje enviado a cliente' });
  } else {
    res.status(405).send('Método no permitido');
  }
}

async function generarRespuestaRosalba(mensajeCliente) {
  if (mensajeCliente.toLowerCase().includes("boda")) {
    return "¡Hola! Para una boda de noche tengo varias opciones lindas. ¿Puedes decirme tu talla o una descripción física?";
  }
  return "Hola, soy Rosalba 💃🏼 ¿Me puedes decir para qué ocasión necesitas tu outfit?";
}