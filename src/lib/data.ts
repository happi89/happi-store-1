import axios from "axios";
import { createResource } from "solid-js";

const fetchProduct = async (id: string) => {
  const item = await axios.get(`http://127.0.0.1:8090/api/collections/products/records/${ id }`)
    .then(res => res.data)
    .catch(error => error.response.data.message)

  return item
}

export function ProductData({ params, location, data }: any) {
  const [product] = createResource(() => params.id, () => fetchProduct(params.id))
  console.log("🚀 ~ file: data.ts:14 ~ ProductData ~ product:", product)
  return product;
}