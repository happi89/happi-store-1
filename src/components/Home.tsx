import { createQuery } from "@tanstack/solid-query";
import axios from "axios";
import { Switch, Match, For } from "solid-js";

import ProductCard from "./ProductCard";

const getProducts = async () => {
  const data = await axios.get('http://127.0.0.1:8090/api/collections/products/records');
  return data
}

export default function Home() {
  const products = createQuery(() => ['products'], getProducts)

  return (
    <div class="flex justify-center px-2 my-24 sm:px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Switch>
          <Match when={products.isLoading}>Loading...</Match>
          <Match when={products.isError}>ERROR</Match>
          <Match when={products.isSuccess}>
            <For each={products?.data?.data?.items!}>
              {(product, i) => {
                return <ProductCard product={product} />
              }}
            </For>
          </Match>
        </Switch>
      </div>
    </div>
  )
}