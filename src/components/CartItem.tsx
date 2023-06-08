import { createEffect, createSignal, onMount, For } from "solid-js";
import { Product, useCart } from "../App";

interface Props {
  item: Product
}

export default function CartItem({ item }: Props) {
  const array = Array(20).fill(undefined).map((_, i) => i + 1)
  const state = useCart()

  const [quantity, setQuantity] = createSignal(0)
  const [index, setIndex] = createSignal(0)

  onMount(() => {
    setIndex(state.cart.findIndex(i => i.id === item.id))
    setQuantity(state.cart[index()].quantity)
  })

  createEffect(() => {
    setIndex(state.cart.findIndex(i => i.id === item.id))
  })

  return <li class="flex items-center mb-10 gap-4">
    <img class='w-24 h-24' src={`http://127.0.0.1:8090/api/files/products/${ item.id }/${ item.images[0] }`} />

    <div>
      <h3 class="text-lg text-gray-900">{item.name}</h3>

      <dl class="mt-0.5 space-y-px text-sm text-gray-600">
        <div>
          <dt class="inline">Price: </dt>
          <dd class="inline">${item.price}</dd>
        </div>
      </dl>
    </div>

    <div class="flex items-center justify-end flex-1 gap-2">
      {/* <p class="flex justify-center items-center h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none" >{quantity()}</p> */}

      <select id="small" class="block text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-fit dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={({ target }) => state.updateQuantity(item, +target.value)}>

        <For each={array}>
          {(i) => <option selected={i === quantity()} value={i}>{i}</option>}
        </For>
      </select>


      <button class="text-gray-600 transition hover:text-red-600" onClick={() => {
        state.removeProduct(item)
      }}>
        <span class="sr-only">Remove item</span>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  </li >;
}

