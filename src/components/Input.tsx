import { Accessor, Setter } from "solid-js";

interface Props { 
  label: string; 
  type: string;
  placeholder: string;
  labelText: string;
  form: Accessor<{
    email?: string;
    password: string;
    passwordConfirm?: string;
    identity?: string
  }>;
  setForm: Setter<{
    email?: string;
    password: string;
    passwordConfirm?: string;
    identity?: string;
  }>
}

export default function Input({ label, type, form, setForm, placeholder, labelText }: Props) {
  return (
    <div>
      <label 
      for={label} 
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      <input
        onInput={({ target }) => {
          const key = target.name
          setForm({ ...form(), [key]: target?.value })
          console.log(target?.value, 'value for: ', target.name)
        }}
        type={type}
        name={label}
        placeholder={placeholder}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
        required 
        />
    </div>
  )
}