export default async function GetProduct(id: Number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=deep`,
    {
      method: "GET",
    }
  );
  const { data } = await res.json();
  return data;
}
