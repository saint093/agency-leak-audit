export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, agency, budget, message } = body;

  if (!name || !email || !message) {
    return Response.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Email inválido" }, { status: 400 });
  }

  console.log("Nueva solicitud de auditoría:", { name, email, agency, budget, message });

  return Response.json({ success: true }, { status: 200 });
}
