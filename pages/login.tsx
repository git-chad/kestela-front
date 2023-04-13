import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";

import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { TextField } from "@/components/Fields";
import { Logo } from "@/components/Logo";
import { MiniSpinner } from "@/components/MiniSpinner";
import { loginSchema } from "@/schemas/login-yup-schema";
import logoGoogle from '@/images/logos/google.svg'

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<IFormInput>({
  //   resolver: yupResolver(loginSchema),
  // });

  const onSubmit = async (e: any) => {
    // const credential = {
    //   email: e.email,
    //   password: e.password,
    //   redirect: false,
    // };
    e.preventDefault()
    await signIn('google')
    
    // const destination = router.query.p?.toString() || "/dashboard";
    // router.replace(destination);
  };

  return (
    <>
      <Head>
        <title>Sign In - Kestela</title>
      </Head>
      <AuthLayout>
        <div className="flex flex-col items-center">
          <Link href="/" aria-label="Home">
            <Logo className="font-bold text-2xl p-2 rounded-lg bg-black text-white w-[210px]" />
          </Link>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Sign in to your account
            </h2>
            {/* <p className="mt-2 text-sm text-gray-700">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:underline"
              >
                Sign up
              </Link>{" "}
              for a free trial.
            </p> */}
          </div>
        </div>
        <form
          action="#"
          className="mt-10 grid grid-cols-1 gap-y-8"
          // onSubmit={() => signIn('google')}
          onSubmit={onSubmit}
        >
          {/* <TextField
            label="Email address"
            id="email"
            {...register("email")}
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            id="password"
            {...register("password")}
            type="password"
            autoComplete="current-password"
            required
          />
          <div>
            <Button
              type="submit"
              variant="solid"
              color="blue"
              className={`w-full ${
                isSubmitting
                  ? "disabled:opacity-70"
                  : "active:bg-blue-800 active:text-blue-100"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting && <MiniSpinner />}
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div> */}
          <div className="flex items-center justify-center">
          <button className="flex items-center p-4 bg-white hover:bg-gray-50 border rounded-lg transition ease-in-out duration-200">
                <Image
                    width={20}
                    className="mr-3"
                    src={logoGoogle}
                    alt="google"
                    unoptimized
                  />
                <span className="font-semibold leading-normal">Sign up with Google</span>
            </button>
          </div>
        </form>
        {/* <div className="mt-2 p-4">
          {errors.email && (
            <p className="text-orange-500">* {errors.email.message}</p>
          )}
          {errors.password && (
            <p className="text-orange-500">* {errors.password.message}</p>
          )}
        </div> */}
      </AuthLayout>
      <ToastContainer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = "/dashboard" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
