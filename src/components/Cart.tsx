import CartItem from './CartItem';
import { useCart } from "../App"
import { For, Show } from 'solid-js';
import Cookies from 'js-cookie';
import { useNavigate } from '@solidjs/router';

export default function Cart() {
  const state = useCart()
  const navigate = useNavigate()

  return (
    <section class='mt-16'>
      <div class="px-4 py-8 mx-auto max-w-screen-xl sm:px-6 sm:py-12 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <header class="text-center">
            <h1 class="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div class="mt-8">
            <ul class="space-y-4">
              <Show when={state.cart.length === 0} fallback={<For each={state.cart}>
                {(item) => <CartItem item={item} />}
              </For>}>
                <li class='space-y-6'>
                  <h1 class='mt-8 text-3xl font-bold'>Your Shopping Cart is empty!</h1>
                  <Show when={!Cookies.get('token')}>
                    <p>Sign in to save or access already saved items in your shopping bag.</p>
                    <button onClick={() => {
                      throw navigate('/login')
                    }} class="mb-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
                  </Show>
                </li>
              </Show>
            </ul>

            {/* CART DETAILS */}
            <div class="flex justify-end pt-8 mt-8 border-t border-gray-100">
              <div class="w-screen max-w-lg space-y-4">
                <dl class="space-y-0.5 text-sm text-gray-700">
                  <div class="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>${state.total.toFixed(2)}</dd>
                  </div>

                  <div class="flex justify-between">
                    <dt>HST</dt>
                    <dd>${(state.total * .13).toFixed(2)}</dd>
                  </div>

                  <div class="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-${(state.total * .10).toFixed(2)}</dd>
                  </div>

                  <div class="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>${state.total > 0 ? (state.total + (state.total * .13) - (state.total * .10)).toFixed(2) : 0}</dd>
                  </div>
                </dl>

                <div class="flex justify-end">
                  <span
                    class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>

                    <p class="text-xs whitespace-nowrap">1 Discount Applied</p>
                  </span>
                </div>

                <div class="flex justify-end">
                  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}