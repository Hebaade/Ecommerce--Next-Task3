import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db("shopzone");

   
    let product = null;

    if (ObjectId.isValid(id)) {
      product = await db.collection("products").findOne({
        _id: new ObjectId(id),
      });
    }

    if (!product) {
      product = await db.collection("products").findOne({
        id: parseInt(id),
      });
    }


    if (!product) {
      product = await db.collection("products").findOne({
        id: id,
      });
    }

    if (!product) {
      return Response.json({ message: "Product not found" }, { status: 404 });
    }

    return Response.json({ ...product, _id: product._id.toString() });
  } catch (error) {
    console.error("GET product error:", error);
    return Response.json({ message: "Server error", error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("shopzone");
    const { _id, ...updateData } = body;

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return Response.json({ message: "Product updated successfully" });
  } catch (error) {
    return Response.json({ message: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db("shopzone");

    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return Response.json({ message: "Product deleted successfully" });
  } catch (error) {
    return Response.json({ message: "Failed to delete" }, { status: 500 });
  }
}