import { A, useIsRouting, useRouteData, } from "@solidjs/router"
import { Match, Switch, For, createEffect, createSignal, onMount, createMemo } from "solid-js"
import toast from "solid-toast"
import { useCart } from "../App"

export default function ProductPage() {
  const item: any = useRouteData()
  const isRouting = useIsRouting()

  const state = useCart()
  const array = Array(20).fill(undefined).map((_, i) => i + 1)

  const [length, setLength] = createSignal(state.length)
  console.log(length(), 'length when initialized')
  const [quantity, setQuantity] = createSignal(1)
  const [disabled, setDisabled] = createSignal(false)

  onMount(() => {
    console.log(length(), 'lengh after mount before update')
    setLength(state.length);
    console.log(length(), 'lengh after mount after update')
  })


  const addToCart = async () => {
    setDisabled(true)
    console.log(length(), 'length before add to cart')
    state.addProduct({
      id: item().id,
      name: item().name,
      price: item().price,
      images: item().images,
      description: item().description,
      quantity: quantity()
    })
    toast.success(`${ item().name } Added to Cart (${ length() })`)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDisabled(false)
    setQuantity(1)
  }

  createMemo(() => setLength(state.length))

  return (
    <section class='mt-12'>
      <Switch>
        <Match when={typeof item() === 'string'}>
          <h1 class="m-24">ERROR 404: {item()}</h1>
        </Match>
        <Match when={isRouting()}>
          <h1 class="m-24">LOADING...</h1>
        </Match>
        <Match when={item()}>
          <div class="relative mx-auto max-w-screen-xl px-4 py-8">
            <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
              <div class="grid grid-cols-2 gap-4 md:grid-cols-1">
                <img
                  alt="Les Paul"
                  src={`http://127.0.0.1:8090/api/files/products/${ item().id }/${ item().images[0] }`}
                  class="aspect-square w-full rounded-xl object-cover"
                />

                {/* <div class="grid grid-cols-2 gap-4 lg:mt-4">
                  <img
                    alt="Les Paul"
                    src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    class="aspect-square w-full rounded-xl object-cover"
                  />

                  <img
                    alt="Les Paul"
                    src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    class="aspect-square w-full rounded-xl object-cover"
                  />

                  <img
                    alt="Les Paul"
                    src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    class="aspect-square w-full rounded-xl object-cover"
                  />

                  <img
                    alt="Les Paul"
                    src="https://images.unsplash.com/photo-1456948927036-ad533e53865c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    class="aspect-square w-full rounded-xl object-cover"
                  />
                </div> */}
              </div>

              <div class="sticky top-0">
                <div class="mt-8 flex justify-between">
                  <div class="max-w-[35ch] space-y-2">
                    <h1 class="text-xl font-bold sm:text-2xl">
                      {item().name}
                    </h1>

                    <div class="-ms-0.5 flex">
                      <svg
                        class="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>

                      <svg
                        class="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>

                      <svg
                        class="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>

                      <svg
                        class="h-5 w-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>

                      <svg
                        class="h-5 w-5 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                      </svg>
                    </div>
                  </div>

                  <p class="text-lg font-bold">${item().price}</p>
                </div>

                <div class="mt-4">
                  <div class="prose max-w-none">
                    <p>
                      {item().description}
                    </p>
                  </div>

                </div>

                <form class="mt-8">
                  {/* <fieldset>
                    <legend class="mb-1 text-sm font-medium">Color</legend>

                    <div class="flex flex-wrap gap-1">
                      <label for="color_tt" class="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          id="color_tt"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          Texas Tea
                        </span>
                      </label>

                      <label for="color_fr" class="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          id="color_fr"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          Fiesta Red
                        </span>
                      </label>

                      <label for="color_cb" class="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          id="color_cb"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          Cobalt Blue
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  <fieldset class="mt-4">
                    <legend class="mb-1 text-sm font-medium">Size</legend>

                    <div class="flex flex-wrap gap-1">
                      <label for="size_xs" class="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_xs"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          XS
                        </span>
                      </label>

                      <label for="size_s" class="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_s"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          S
                        </span>
                      </label>

                      <label for="size_m" class="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_m"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          M
                        </span>
                      </label>

                      <label for="size_l" class="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_l"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          L
                        </span>
                      </label>

                      <label for="size_xl" class="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_xl"
                          class="peer sr-only"
                        />

                        <span
                          class="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white"
                        >
                          XL
                        </span>
                      </label>
                    </div>
                  </fieldset> */}

                  <div class="mt-8 flex gap-4 items-center">
                    <select
                      id="small"
                      class="block text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 w-fit dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={({ target }) => setQuantity(+target.value)}
                    >
                      <For each={array}>
                        {(i) => <option selected={i === quantity()} value={i}>{i}</option>}
                      </For>
                    </select>

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
                </form>
              </div>
            </div>
          </div>
        </Match>
      </Switch>
    </section>
  )
}