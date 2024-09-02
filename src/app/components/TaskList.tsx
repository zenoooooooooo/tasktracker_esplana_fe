"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomSection, CustomButton } from "./CustomComponents";
import NavBar from "./NavBar";
import Task from "./Task";
import CreateTask from "./CreateTask";
import UpdateTask from "./UpdateTask";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import Link from "next/link";
interface Task {
  _id?: any;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: any;
  updatedAt?: any;
}

const TaskList = () => {
  const [update, setUpdate] = useState<Task>({
    _id: "",
    title: "",
    description: "",
    completed: false,
    createdAt: "",
    updatedAt: "",
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [create, setCreate] = useState<boolean>(true);
  const [refresher, setRefresher] = useState<boolean>(false);
  const [seeCompleted, setSeeCompleted] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [auth, setAuth] = useState<boolean>();
  const router = useRouter();
  useEffect(() => {
    axios
      .get("/user/", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.auth) {
          console.log(res.data.user.username);
          setUser(res.data.user.username);
          setAuth(true);
        } else {
          setUser("Login first to see your tasks");
          setAuth(false);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get("/tasks", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      });
    setRefresher(false);
  }, [refresher]);

  function handleToggle(e: any) {
    e.preventDefault();
    setCreate(true);
  }

  return (
    <>
      {auth ? (
        <>
          <NavBar user={user} />

          <CustomSection
            tag="main"
            className="bg-blue-950 h-[100vh] p-10 flex justify-evenly md:flex-row xsm:flex-col md:items-baseline sm:items-center"
          >
            {create ? (
              <CreateTask setRefresher={setRefresher} />
            ) : (
              <UpdateTask
                _id={update._id}
                title={update.title}
                description={update.description}
                createdAt={update.createdAt}
                updatedAt={update.updatedAt}
                completed={update.completed}
                setCreate={setCreate}
                setRefresher={setRefresher}
              />
            )}
            <CustomSection
              className="border-solid  border-2 border-blue-600 overflow-scroll p-4 rounded  no-scrollbar::-webkit-scrollbar no-scrollbar md:w-1/2 sm:w-full xsm:h-1/2"
              tag="section"
            >
              <CustomSection
                tag="div"
                className="flex justify-between md:flex-row xsm:flex-col md:text-[14px]"
              >
                <h1 className="text-white font-bold text-2xl md:w-1/3 md:text-left xsm:text-center xsm:mb-4">
                  {seeCompleted ? "Completed Tasks:" : "Tasks:"}
                </h1>
                <CustomButton
                  onClick={() => setSeeCompleted((prev) => !prev)}
                  label={
                    seeCompleted
                      ? "❎ See Uncompleted Task"
                      : "✅ See Completed Tasks"
                  }
                  type="button"
                  className="w-1/4 h-[65%] p-1 font-bold  text-gray-800 bg-green-500 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 md:w-1/2 xsm:w-full mb-4"
                />
                <CustomButton
                  onClick={handleToggle}
                  label="➕ Create New"
                  type="button"
                  className="w-1/4 h-[65%] p-1 font-bold  text-gray-800 bg-blue-300 ml-auto rounded hover:opacity-80 active:opacity-50 transition-opacity duration-300 md:w-1/2 xsm:w-full mb-4"
                />
              </CustomSection>

              {tasks
                .filter((task) => task.completed === seeCompleted)
                .map((task) => (
                  <Task
                    key={task._id}
                    _id={task._id}
                    title={task.title}
                    description={task.description}
                    createdAt={task.createdAt}
                    updatedAt={task.updatedAt}
                    setUpdate={setUpdate}
                    setCreate={setCreate}
                    completed={task.completed}
                  />
                ))}
            </CustomSection>
          </CustomSection>
        </>
      ) : (
        <CustomSection
          className="m-0 flex justify-center items-center p-2 bg-blue-950 h-[100vh]"
          tag="main"
        >
          <CustomSection
            tag="section"
            className="flex flex-col rounded-lg md:w-1/3 sm:w-[60%] xsm:w-full p-10 justify-center h-auto font-bold text-white bg-slate-700 border-l-[16px] border-black border-solid"
          >
            <h1 className="text-2xl md:mb-4 xsm:mb-2">🔐 Authentication</h1>
            <Link
              href="/login"
              className="p-3 text-2xl bg-slate-500 md:mb-4 xsm:mb-2 rounded hover:opacity-80 transition-opacity duration-300"
            >
              🔑 Login
            </Link>
            <Link
              href="/register"
              className="p-3 text-2xl bg-slate-500 md:mb-4 xsm:mb-2 rounded hover:opacity-80 transition-opacity duration-300"
            >
              📝 Register
            </Link>
          </CustomSection>
        </CustomSection>
      )}
    </>
  );
};

export default TaskList;
