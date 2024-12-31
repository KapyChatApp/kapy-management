"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import { addPointsToUser, subtractUserPoints } from "@/lib/account.service";
import { useParams } from "next/navigation";

interface EditProps {
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPointModal: React.FC<EditProps> = ({ point, setPoint, setClose }) => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const [difference, setDiff] = useState(0);
  const handleBack = () => {
    setClose(true);
  };

  const handleAdd = async () => {
    try {
      const result = await addPointsToUser(id, difference);
      if (result) {
        const afterResult = point + difference;
        setPoint(afterResult);
        toast({
          title: "Success",
          description: "Account has been added point successfully!",
          className:
            "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
        });
        handleBack();
      } else {
        toast({
          title: "Error added point",
          className:
            "border-none rounded-lg bg-accent-red text-light-900 paragraph-regular items-center justify-center"
        });
      }
    } catch (err: any) {
      console.error("Error added point:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };
  const handleSubtract = async () => {
    try {
      const result = await subtractUserPoints(id, difference);
      if (result) {
        const afterResult = point - difference;

        setPoint(afterResult);
        toast({
          title: "Success",
          description: "Account has been subtracted point successfully!",
          className:
            "border-none rounded-lg bg-primary-200 text-primary-500 paragraph-regular items-center justify-center "
        });
        handleBack();
      } else {
        toast({
          title: "Error subtracted point",
          className:
            "border-none rounded-lg bg-accent-red text-light-900 paragraph-regular items-center justify-center"
        });
      }
    } catch (err: any) {
      console.error("Error subtracted point:", err);
      const errorMessage = err?.message || "An unexpected error occurred.";
      alert(`Error fetching data: ${errorMessage}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="min-w-[376px] max-w-[376px] md:max-w-[400px] lg:w-[400px] h-fit rounded-lg background-light900_dark200 items-center justify-start flex flex-col">
        <div className="flex w-full justify-between px-4 pt-2 pb-4">
          <p className="text-dark100_light900 paragraph-semibold mt-2">
            Update points
          </p>
          <Icon
            icon="iconoir:cancel"
            width={24}
            height={24}
            className="text-dark100_light900 cursor-pointer"
            onClick={handleBack}
          />
        </div>

        <span className="flex w-full h-[0.5px] background-light500_dark400"></span>

        <div className="flex flex-col h-[120px] w-full overflow-scroll scrollable p-4 gap-8">
          <div className="flex flex-col gap-3 w-full h-fit">
            <p className="text-dark100_light900 body-regular">Your Update</p>
            <Input
              type="number"
              min="0"
              placeholder="Enter the point you want to add / subtract..."
              onChange={(e) => setDiff(Number(e.target.value))}
              className="paragraph-regular text-dark100_light900 placeholder:opacity-50 placeholder:dark:opacity-80 no-focus bg-transparent border border-light-500 dark:border-dark-500 shadow-none outline-none w-full h-full placeholder:paragraph-regular rounded-lg p-2"
            ></Input>
          </div>
        </div>

        <span className="flex w-full h-[0.5px] background-light500_dark400"></span>

        <div className="flex w-full items-center justify-end pr-4 py-2">
          <div className="flex flex-row w-fit h-fit gap-6">
            <Button
              className="shadow-md flex flex-row border-light-500 items-center justify-center hover:border-light-500 bg-transparent hover:bg-transparent gap-1 border rounded-lg p-2"
              onClick={handleSubtract}
              disabled={difference === 0 || !difference}
            >
              <Icon
                icon="fluent:subtract-12-filled"
                width={14}
                height={14}
                className="text-dark100_light900 "
              />
              <p className="text-dark100_light900 paragraph-regular">Minus</p>
            </Button>
            <Button
              className="shadow-md flex flex-row items-center justify-center  bg-primary-200 hover:bg-primary-200 border-none rounded-lg p-2 gap-1"
              disabled={difference === 0 || !difference}
              onClick={handleAdd}
            >
              <Icon
                icon="mingcute:add-fill"
                width={14}
                height={14}
                className="text-primary-500"
              />
              <p className="text-primary-500 paragraph-regular">Plus</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPointModal;
