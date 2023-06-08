import { A, useNavigate } from '@solidjs/router'
import { createMutation } from '@tanstack/solid-query'
import axios from 'axios'
import { createSignal, For } from 'solid-js'
import toast from 'solid-toast'
import Cookies from 'js-cookie'

import Input from './Input'

interface Input {
  label: string;
  type: string;
  placeholder: string;
  labelText: string;
}

export default function Login() {
  const navigate = useNavigate()

  if(Cookies.get('token')) throw navigate(`/account/${Cookies.get('userId')}`)

  const [form, setForm] = createSignal({
    identity: '',
    password: '',
  })

  const [inputs] = createSignal([
    {
      label: 'identity',
      type: 'email',
      placeholder: 'name@company.com',
      labelText: 'Email'
    },
    {
      label: 'password',
      type: 'password',
      placeholder: "••••••••",
      labelText: 'Password'
    },
  ])

  const login = createMutation({
    mutationFn: async () => await axios.post('http://127.0.0.1:8090/api/collections/users/auth-with-password', form()),
    onSuccess: (res) => {
      console.log(res, 'RESPONSE')
      toast.success('Login Successful!')
      navigate('/')
      Cookies.set('token', res?.data?.token, { expires: 1 })
      Cookies.set('userId', res?.data?.record?.id, { expires: 1})
    },
    onError: ({ response }) => {
      const error = response?.data?.data
      toast.error(`ERROR: ${ error?.identity?.message || error?.password?.message || 'Failed to Login' }`)
    }
  })

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    console.log(form())
    return login.mutate()
  }

  return (
    <div class="flex justify-center px-2 mt-24 sm:px-4">
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={onSubmit}>
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5>
          
          <For each={inputs()}>
            {(input: Input) => {
              return <Input
                label={input?.label}
                type={input?.type}
                placeholder={input?.placeholder}
                labelText={input?.labelText}
                form={form}
                setForm={setForm}
              />
            }}
          </For>
          
          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <A href="/register" class="text-blue-700 hover:underline dark:text-blue-500">Create account</A>
          </div>
        </form>
      </div>
    </div>
  )
}