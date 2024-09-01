"use client";
import React, { useState, useEffect } from "react";
import { CustomSection, CustomButton, CustomInput } from "./CustomComponents";
import moment from "moment";
import axios from "axios";
import { useSnackbar } from "notistack";

interface Task {
  _id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  completed?: boolean;
}
interface Props extends Task {
  setCreate: (e: any) => void;
  setRefresher: (e: any) => void;
}
const UpdateTask: React.FC<Props> = ({
  _id,
  title,
  description,
  createdAt,
  updatedAt,
  setCreate,
  setRefresher,
  completed,
}) => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const formattedCreated = moment(createdAt).format("MM/DD/YYYY hh:mm:ss A");
  const formattedUpdated = moment(updatedAt).format("MM/DD/YYYY hh:mm:ss A");

  function handleChange(e: any) {
    e.preventDefault();

    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (task.title === "") {
      enqueueSnackbar("Please enter a title", { variant: "info" });
    }
    try {
      console.log(task);
      const res = await axios.put(
        `http://localhost:3001/tasks/update/${_id}`,
        task,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      enqueueSnackbar("Task updated successfully", { variant: "success" });
      setCreate(true);
      setRefresher(true);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleComplete(e: any) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3001/tasks/complete/${_id}`,
        {
          completed: true,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      enqueueSnackbar("Task completed successfully", { variant: "success" });
      setCreate(true);
      setRefresher(true);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleDelete(e: any) {
    e.preventDefault();

    try {
      const res = await axios.delete(
        `http://localhost:3001/tasks/delete/${_id}`,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);
      enqueueSnackbar("Task deleted successfully", { variant: "success" });
      setCreate(true);
      setRefresher(true);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    console.log("refresh");
  }, [task]);
  const inputStyle =
    "bg-gray-300 md:mb-4 xsm:mb-2 w-full p-2 text-black border-2 rounded outline-none";
  return (
    <CustomSection
      tag="section"
      className="flex flex-col md-lg:w-1/3 p-2 lg:w-1/3 md:w-1/2 md:text-md sm:w-full xsm:mb-4  sm:text-sm"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full p-10  justify-center rounded-lg bg-slate-700 border-l-[16px] border-black border-solid"
      >
        <CustomSection tag="section" className="flex md:flex-row xsm:flex-col">
          <h1 className="text-white xsm:text-center font-bold text-2xl text-left md:mb-4 xsm:mb-2">
            🔔 Update Task
          </h1>

          {completed ? (
            <CustomButton
              label="✅ Completed"
              type="button"
              className="w-1/4 h-[65%] p-1 font-bold text-1xl text-gray-800 bg-green-500 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 md:w-1/2 xsm:w-full md:mb-4 xsm:mb-2"
            />
          ) : (
            <CustomButton
              onClick={handleComplete}
              label="✅ Mark as Complete"
              type="button"
              className="w-1/4 h-[65%] p-1 font-bold text-1xl text-gray-800 bg-green-500 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 md:w-1/2 xsm:w-full md:mb-4 xsm:mb-2"
            />
          )}
        </CustomSection>

        <ul className="text-white flex flex-col mb-4 gap-2 xsm:text-[14px]">
          <li className="flex justify-between ">
            <span className="font-bold ">🆔 ID:</span>
            <span className="max-h-20 max-w-[60%] text-right">{_id}</span>
          </li>
          <hr className="md:m-2 w-full" />
          <li className="flex justify-between">
            <span className="font-bold">🕒 Created:</span>{" "}
            <span className=" text-right">{formattedCreated}</span>
          </li>
          <hr className="md:m-2 w-full" />
          <li className="flex justify-between">
            <span className="font-bold">🔔 Updated:</span>
            <span className=" text-right">{formattedUpdated}</span>
          </li>
          <hr className="md:m-2 w-full" />
          <li className="flex justify-between">
            <span className="font-bold">📒 Title:</span>
            <span className=" text-right">{title}</span>
          </li>
          <hr className="md:m-2 w-full" />
          <li className="flex justify-between">
            <span className="font-bold">💭 Description:</span>
            <span className=" text-right">{description}</span>
          </li>
        </ul>

        <CustomInput
          type="text"
          value={task.title}
          placeholder="📒 New Title"
          className={inputStyle}
          name="title"
          onChange={handleChange}
        />
        <CustomInput
          type="text"
          value={task.description}
          placeholder="💭 New Description"
          className={inputStyle}
          name="description"
          onChange={handleChange}
        />
        <CustomButton
          type="submit"
          label="🔔 Update Task"
          className=" p-1 font-bold text-1xl md:mb-4 xsm:mb-2 text-gray-800 bg-blue-300 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 w-full"
        />
        <CustomButton
          onClick={handleDelete}
          type="submit"
          label="🗑️ Delete Task"
          className=" p-1 font-bold text-1xl text-gray-800 bg-red-700 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 w-full"
        />
      </form>
    </CustomSection>
  );
};

export default UpdateTask;
