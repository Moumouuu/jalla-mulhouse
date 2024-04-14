export default async function GetProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?populate=deep`,
    {
      method: "GET",
    }
  );
  const { data } = await res.json();
  return data;
}
