
import 'flowbite';
import { Routes, Route } from '@solidjs/router'
import { lazy } from 'solid-js';
import { QueryClient } from '@tanstack/solid-query';
import { Toaster } from 'solid-toast';
import create from 'solid-zustand'

import Navbar from './components/Navbar';
import { ProductData } from './lib/data';
const Home = lazy(() => import('./components/Home'))
const Cart = lazy(() => import('./components/Cart'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Account = lazy(() => import('./components/Account'))
const ProductPage = lazy(() => import('./components/ProductPage'))

const queryClient = new QueryClient()

export interface Product {
  id: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  description: string
}

interface CartState {
  cart: Product[];
  total: number;
  length: number;
  addProduct: (product: Product) => void
  removeProduct: (product: Product) => void
  updateQuantity: (product: Product, quantity: number) => void
}

export const useCart = create<CartState>((set, get) => ({
  cart: [],
  total: 0,
  length: 0,
  addProduct: (product) => {
    console.log("🚀 ~ file: App.tsx:43 ~ useCart ~ product:", product.quantity)
    const existingProduct = get().cart.findIndex((i) => i.id === product.id);

    if (existingProduct !== -1) {
      const updatedCart = [...get().cart]
      updatedCart[existingProduct].quantity += product?.quantity
      return set((state) => ({
        cart: [...updatedCart],
        total: state.total += (product.price * product.quantity),
        length: state.length += product.quantity
      }))
    }


    set((state) => ({
      cart: [...state.cart, product],
      total: state.total += (product.price * product.quantity),
      length: state.length += product.quantity,
    }))
    console.log(get().length, 'length after update')
  },
  removeProduct: (product) => {
    const updatedCart = get().cart.filter((i) => i.id !== product.id)
    return set((state) => ({
      cart: [...updatedCart],
      total: state.total - product.price,
      length: state.length - 1,
    }))
  },
  updateQuantity: (product, quantity) => {
    const index = get().cart.findIndex(i => i.id === product.id);
    const updatedCart = [...get().cart];
    updatedCart[index].quantity = quantity

    const length = updatedCart.reduce((t, i) => i.quantity + t, 0)
    const total = updatedCart.reduce((t, i) => i.quantity * i.price + t, 0)


    set((state) => ({
      cart: [...updatedCart],
      length,
      total
    }))
  }
}))


function App() {
  return (
    <div>
      <Navbar />
      <Toaster containerClassName='mt-12' />
      <Routes>
        <Route path='/account/:id' component={Account} />
        <Route path='/products/:id' component={ProductPage} data={ProductData} />
        <Route path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/cart' component={Cart} />
      </Routes>
    </div>
  );
}

export default App;