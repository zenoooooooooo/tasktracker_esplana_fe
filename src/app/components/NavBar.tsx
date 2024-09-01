"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CustomSection, CustomButton } from "./CustomComponents";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
interface Props {
  user: string;
}

const NavBar: React.FC<Props> = ({ user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  async function handleLogout(e: any) {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <CustomSection
      tag="nav"
      className="flex md:text-xl xsm:text-[16px] bg-gray-900 w-full text-white font-bold py-10 md:px-20 xsm:px-10 text-[20px]"
    >
      <span className="mr-auto w-1/2 text-white ">👤 Welcome {user}!</span>
      <ul className="flex gap-10 justify-end w-1/2">
        <li>
          <CustomButton
            onClick={handleLogout}
            label="➡️ Logout "
            type="button"
            className="underline hover:opacity-80"
          />
        </li>
      </ul>
    </CustomSection>
  );
};

export default NavBar;
