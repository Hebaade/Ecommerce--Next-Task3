import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("shopzone");

  const categories = await db
    .collection("products")
    .distinct("category");

  return Response.json(categories.sort());
}