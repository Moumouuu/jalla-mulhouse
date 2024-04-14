import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const { id, urlCatalog, urlVideo } = await request.json();

  if (!id || !urlCatalog || !urlVideo) {
    return {
      status: 400,
      body: { message: "Bad request" },
    };
  }

  console.log("PUT method", { id, urlCatalog, urlVideo });

  // Update the catalog and video in the database
  await prisma?.catalogAndVideo.update({
    where: { id },
    data: { urlCatalog, urlVideo },
  });

  return {
    status: 200,
    body: { message: "PUT method" },
  };
}
