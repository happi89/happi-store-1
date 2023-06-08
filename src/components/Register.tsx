import { A, Navigate, useNavigate } from '@solidjs/router'
import { createMutation } from '@tanstack/solid-query';
import axios from 'axios';
import { createSignal, For } from 'solid-js'
import toast from 'solid-toast';
import Input from './Input'

interface Input {
  label: string;
  type: string;
  placeholder: string;
  labelText: string;
}


export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = createSignal({
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const [inputs] = createSignal([
    {
      label: 'email',
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
    {
      label: 'passwordConfirm',
      type: 'password',
      placeholder: "••••••••",
      labelText: 'Confirm Password'
    }
  ])

  const register = createMutation({
    mutationFn: async () => await axios.post('http://127.0.0.1:8090/api/collections/users/records', form()),
    onSuccess: () => {
      toast.success('Account created Successfully!')
      navigate('/login')
    },
    onError: ({ response }) => {
      const error = response?.data?.data
      toast.error(`ERROR: ${error?.email?.message || error?.password?.message || error?.passwordConfirm.message || 'Failed to create User'}`)
    }
  })

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    return register.mutate()
  }

  return (
    <div class="flex justify-center px-2 mt-24 sm:px-4">
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form class="space-y-6" onSubmit={onSubmit}>
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>

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

          <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Have an Account? <A href="/login" class="text-blue-700 hover:underline dark:text-blue-500">Login</A>
          </div>
        </form>
      </div>
    </div>
  )
}
