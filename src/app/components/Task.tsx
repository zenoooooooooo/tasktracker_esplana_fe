import React from "react";
import { CustomSection } from "./CustomComponents";

interface Props {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  setUpdate: (e: any) => void;
  setCreate: (e: any) => void;
  completed: boolean;
}

const Task: React.FC<Props> = ({
  _id,
  title,
  description,
  createdAt,
  updatedAt,
  setUpdate,
  setCreate,
  completed,
}) => {

  function liftState(e: any) {
    e.preventDefault();
    setUpdate({
      _id,
      title,
      description,
      createdAt,
      updatedAt,
      completed,
    });

    setCreate(false);
  }
  return (
    <CustomSection
      className="bg-blue-900 w-full p-3 my-2 rounded-lg justify-between text-white  hover:opacity-80 cursor-pointer active:opacity-50 transition-opacity duration-100 scrollbar scrollbar-thumb-rose-500"
      tag="section"
      onClick={liftState}
    >
      <CustomSection tag="section" className="mb-1">
        <h1 className=" lg:text-lg md-lg:text-sm sm:text-sm">
          <span className="font-bold">📒 Title:</span> {title}{" "}
          {completed ? "✅" : "❎"}
        </h1>
        <hr className="m-2" />
        <h1
          className="max-h-20  lg:text-lg md-lg:text-sm sm:text-sm"
          style={{
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <span className="font-bold">
            💭 Description:
            <br />
          </span>{" "}
          {description}
        </h1>
      </CustomSection>
    </CustomSection>
  );
};

export default Task;
