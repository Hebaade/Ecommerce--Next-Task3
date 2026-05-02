import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 12;
  const skip = parseInt(searchParams.get("skip")) || 0;
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const client = await clientPromise;
  const db = client.db("shopzone");
  const collection = db.collection("products");

  const query = {};
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  if (category) {
    query.category = category;
  }

  const [products, total] = await Promise.all([
    collection.find(query).skip(skip).limit(limit).toArray(),
    collection.countDocuments(query),
  ]);

  const serialized = products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return Response.json({ products: serialized, total });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("shopzone");

    const result = await db.collection("products").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({
      message: "Product created successfully",
      id: result.insertedId.toString(),
    });
  } catch (error) {
    return Response.json({ message: "Failed to create product" }, { status: 500 });
  }
}