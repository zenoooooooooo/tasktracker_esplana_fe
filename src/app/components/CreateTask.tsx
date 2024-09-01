"use client";
import React, { useState, useEffect } from "react";
import { CustomSection, CustomButton, CustomInput } from "./CustomComponents";
import axios from "axios";
import { useSnackbar } from "notistack";

interface Task {
  title: string;
  description: string;
}

interface Props {
  setRefresher: (e: any) => void;
}

const CreateTask: React.FC<Props> = ({ setRefresher }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });

  function handleChange(e: any) {
    e.preventDefault();
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(task);
    if (task.title === "") {
      enqueueSnackbar("Please enter a title", { variant: "info" });
    }
    try {
      const res = await axios.post("http://localhost:3001/tasks/create", task, {
        withCredentials: true,
      });
      enqueueSnackbar("Task created successfully", { variant: "success" });
      setTask({
        title: "",
        description: "",
      });
      setRefresher(true);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  const inputStyle =
    "bg-gray-300 mb-4 w-full p-2 text-black border-2 rounded outline-none";
  return (
    <>
      <CustomSection
        tag="div"
        className="flex flex-col md:w-1/3 xsm:w-full p-2 "
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col  w-full p-10 justify-center auto rounded-lg bg-slate-700 border-l-[16px] border-black border-solid"
        >
          <h1 className="text-white font-bold text-2xl md:text-left xsm:text-center mb-4">
            ➕ Create New Task
          </h1>
          <CustomInput
            type="text"
            placeholder="📒 Title"
            className={inputStyle}
            name="title"
            onChange={handleChange}
            value={task.title}
          />
          <CustomInput
            type="text"
            placeholder="💭 Description"
            className={inputStyle}
            name="description"
            onChange={handleChange}
            value={task.description}
          />

          <CustomButton
            type="submit"
            label="➕ Add Task"
            className="p-1 font-bold text-1xl text-gray-800 bg-blue-300 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 w-full"
          />
        </form>
      </CustomSection>
    </>
  );
};

export default CreateTask;
