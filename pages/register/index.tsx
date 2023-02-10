import { useRouter } from "next/router"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Head from 'next/head'
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { Spinner } from "@/components/Spinner"

import { registerSchema } from "./register-yup-schema"

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema)
  })
  const router = useRouter()

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const body = JSON.stringify(data)
      const res = await fetch(`${process.env.BACK_URL}/v1/users/register`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body
      })
      if (res.status !== 200) {
        const resError = await res.json()
        throw new Error(resError.message)
      }
      router.replace("/login")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up - Kestela</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col">
          <Link href="/" aria-label="Home">
            <Logo className="w-[210px] font-bold text-2xl p-2 rounded-md bg-black text-white" />
          </Link>
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-gray-900">
              Get started for free
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Already registered?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign in
              </Link>{' '}
              to your account.
            </p>
          </div>
        </div>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="First name"
            id="firstname"
            {...register("firstname")}
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
            id="lastname"
            {...register("lastname")}
            type="text"
            autoComplete="family-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            id="password"
            {...register("password")}
            type="password"
            autoComplete="new-password"
            required
          />
          <div className="col-span-full">
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className={`w-full ${isSubmitting ? 'disabled:opacity-70' : 'active:bg-blue-800 active:text-blue-100'}`}
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
        <div className="mt-2 p-4">
          {errors.firstname && (<p className="text-orange-500">* {errors.firstname.message}</p>)}
          {errors.lastname && (<p className="text-orange-500">* {errors.lastname.message}</p>)}
          {errors.email && (<p className="text-orange-500">* {errors.email.message}</p>)}
          {errors.password && (<p className="text-orange-500">* {errors.password.message}</p>)}
        </div>
      </AuthLayout>
      <ToastContainer />
    </>
  )
}
