import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";
import MoreProduct from "../../components/product/MoreProduct";
import ProductPage from "../../components/product/ProductPage";

export default async function page({ params }: any) {
  const product = await getProduct(params.id);
  const purposeProduct = await getProducts();

  if (!product) {
    return <div className="text-white text-3xl">Loading</div>;
  }

  return (
    <div className="mx-2">
      <ProductPage product={product} />
      <MoreProduct purposeProduct={purposeProduct} />
    </div>
  );
}
