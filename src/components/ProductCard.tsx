import { A } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import toast from "solid-toast";
import { Product, useCart } from "../App";

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const state = useCart()
  const [disabled, setDisabled] = createSignal(false)

  const { id, name, price, images, description, } = product

  const addToCart = async () => {
    setDisabled(true)
    state.addProduct({
      id,
      name,
      price,
      images,
      description,
      quantity: 1
    })
    console.log("🚀 ~ file: ProductCard.tsx:12 ~ ProductCard ~ state:", state.length)
    toast.success(`${ product.name } Added to Cart (${ state.length > 0 ? state.length : 1 })`)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDisabled(false)
  }

  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow group hover:cursor-pointer dark:bg-gray-800 dark:border-gray-700">
      <A href={`/products/${ id }`}>
        <div class='relative h-80 w-80'>
          <img class="absolute inset-0 object-cover w-full h-full p-8 opacity-100 group-hover:invisible" src={`http://127.0.0.1:8090/api/files/products/${ id }/${ images[0] }`} alt="product image" />
          <img class="absolute inset-0 object-cover w-full h-full p-8 opacity-0 group-hover:opacity-100" src={`http://127.0.0.1:8090/api/files/products/${ id }/${ images[1] }`} alt="product image" />
        </div>
      </A>

      <div class="px-5 pb-5">
        <A href={`/products/${ id }`}>
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 group-hover:underline group-hover:underline-offset-1 dark:text-white">{name}</h5>
        </A>

        <div class="flex items-center mt-2.5 mb-5">
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Second star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Third star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fourth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <svg aria-hidden="true" class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
        </div>
        <div class="flex justify-between mt-4">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
          <button onClick={(e) => {
            e.stopImmediatePropagation()
            addToCart()
          }}
            disabled={disabled()}
            class={`${ disabled() && 'cursor-not-allowed bg-blue-400 hover:bg-blue-400' } text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}