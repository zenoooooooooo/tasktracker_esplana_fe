"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import "../globals.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { CustomSection, CustomButton, CustomInput } from "./CustomComponents";

interface Register {
  username: string;
  email: string;
  password: string;
}

type Login = Pick<Register, "email" | "password">;

interface Props {
  haveAnAccount: boolean;
}

const AuthForm: React.FC<Props> = ({ haveAnAccount }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [register, setRegister] = useState<Register>({
    username: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });

  function handleChange(e: any) {
    {
      haveAnAccount
        ? setLogin({
            ...login,
            [e.target.name]: e.target.value,
          })
        : setRegister({
            ...register,
            [e.target.name]: e.target.value,
          });
    }
  }

  async function handleRegister(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/user/register",
        register
      );

      enqueueSnackbar("Account has been registered successfully", {
        variant: "success",
      });
      console.log(res.data);
      router.push("/login");
    } catch (err) {
      enqueueSnackbar("Account with that username/email already exists", {
        variant: "error",
      });
      console.error(err);
    }
    console.log(register);
  }
  async function handleLogin(e: any) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/user/login", login, {
        withCredentials: true,
      });
      
      console.log(res.data);
      enqueueSnackbar("Logged in successfully", {
        variant: "success",
      });
      router.push("/");
    } catch (err) {
      enqueueSnackbar("Wrong user credentials", {
        variant: "error",
      });
      console.error(err);
    }

    console.log(login);
  }
  const inputStyle =
    "bg-gray-300 mb-4 w-full p-2 text-black border-2 rounded outline-none";

  const buttonStyle =
    "w-1/4 p-1 font-bold text-1xl text-gray-800 bg-blue-300 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300";

  const sectionStyle =
    "bg-blue-950 h-[100vh] flex flex-col justify-center items-center p-2";

  return (
    <>
      <CustomSection tag="section" className={sectionStyle}>
        {haveAnAccount ? (
          <form
            onSubmit={handleLogin}
            className="flex flex-col  md:w-1/3 sm:w-[60%] xsm:w-full p-10 justify-center h-auto bg-slate-700 border-l-[16px] border-black border-solid"
          >
            <h1 className="text-white font-bold text-2xl text-left mb-4">
              🔑 Login Account
            </h1>

            <CustomInput
              type="email"
              placeholder="📧 Email"
              className={inputStyle}
              name="email"
              onChange={handleChange}
              value={login.email}
            />
            <CustomInput
              type="password"
              placeholder="🔒 Password"
              className={inputStyle}
              name="password"
              onChange={handleChange}
              value={login.password}
            />
            <CustomSection
              tag="section"
              className="w-full flex justify-between"
            >
              <span className="text-white font-bold">
                Don&apos;t have an account?&nbsp;
                <Link href="register" className="text-blue-300 underline">
                  Sign up
                </Link>
              </span>
              <CustomButton
                className={buttonStyle}
                type="submit"
                label="Sign in"
              />
            </CustomSection>
          </form>
        ) : (
          <form
            onSubmit={handleRegister}
            className="flex flex-col  md:w-1/3 sm:w-[60%] xsm:w-full p-10  h-auto bg-slate-700 border-l-[16px] border-black border-solid"
          >
            <h1 className="text-white font-bold text-2xl text-left mb-4">
              📝 Register Account
            </h1>

            <CustomInput
              type="text"
              placeholder="👤 Username"
              className={inputStyle}
              name="username"
              onChange={handleChange}
              value={register.username}
            />
            <CustomInput
              type="email"
              placeholder="📧 Email"
              className={inputStyle}
              name="email"
              onChange={handleChange}
              value={register.email}
            />
            <CustomInput
              type="password"
              placeholder="🔒 Password"
              className={inputStyle}
              name="password"
              onChange={handleChange}
              value={register.password}
            />
            <CustomSection
              tag="section"
              className="w-full flex justify-between"
            >
              <span className="text-white font-bold">
                Already have an account?&nbsp;
                <Link href="login" className="text-blue-300 underline">
                  Sign in
                </Link>
              </span>
              <CustomButton
                className={buttonStyle}
                type="submit"
                label="Sign up"
              />
            </CustomSection>
          </form>
        )}
      </CustomSection>
    </>
  );
};

export default AuthForm;
