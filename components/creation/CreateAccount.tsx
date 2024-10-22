import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { creationItem } from "@/constants";
import CreationItem from "./CreationItem";

interface CreateAccountProps {
  setCreation: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccount = ({ setCreation }: CreateAccountProps) => {
  const handleBack = () => {
    setCreation(false);
  };
  const creationUser = {
    title: creationItem[creationItem.length - 2].title,
    key: creationItem[creationItem.length - 2].key,
    type: creationItem[creationItem.length - 2].type
  };
  const creationPassword = {
    title: creationItem[creationItem.length - 1].title,
    key: creationItem[creationItem.length - 1].key,
    type: creationItem[creationItem.length - 1].type
  };
  return (
    <div className="modal-overlay">
      <div className="w-[1106px] h-[700px] overflow-scroll scrollable rounded-lg background-light900_dark200 items-center justify-start flex flex-col gap-4 p-4">
        <div className="flex w-full justify-between ">
          <p className="text-primary-500 base-semibold">Add new account</p>
          <Button
            className="flex bg-transparent shadow-none p-0 border-none hover:bg-transparent h-full w-fit"
            onClick={handleBack}
          >
            <Icon
              icon="iconoir:cancel"
              width={28}
              height={28}
              className="text-dark100_light900"
            />
          </Button>
        </div>

        {/*General */}
        <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
          <Icon
            icon="hugeicons:user-account"
            width={20}
            height={20}
            className="text-dark100_light900"
          />
          <p className="text-dark100_light900 paragraph-bold">
            General Information
          </p>
        </div>
        <div className="flex w-full h-[1px] bg-light-500"></div>
        <div className="flex flex-col items-start justify-center w-full gap-[30px]">
          {/*ID - AVA */}
          <div className="flex flex-row justify-start items-center ml-[60px] w-full mt-[30px]">
            <Image
              src="/assets/ava/48.jpg"
              alt={"ava"}
              width={100}
              height={100}
              className="rounded-full"
            />

            <div className="flex flex-col w-fit h-fit gap-[30px] ml-[42px]">
              <div className="flex flex-row items-center justify-start gap-[10px] ">
                <p className="text-dark100_light900 paragraph-regular">ID:</p>
                <p className="text-dark100_light900 paragraph-semibold ml-[10px]">
                  #123
                </p>
              </div>
              <div className="flex flex-row items-center justify-start gap-[30px]">
                <Button className=" flex flex-row border-primary-100 items-center justify-center hover:border-primary-100 dark:border-primary-100 border hover:dark:border-primary-100 rounded-[10px] shadow-none bg-transparent hover:bg-transparent">
                  <p className="text-primary-100 paragraph-regular underline">
                    Upload photo
                  </p>
                </Button>
                <Button className=" flex flex-row border-accent-red items-center justify-center w-[120px] hover:border-accent-red border rounded-[10px] shadow-none bg-transparent hover:bg-transparent">
                  <p className="text-accent-red paragraph-regular ">Delete</p>
                </Button>
              </div>
            </div>
          </div>
          {/*Information Input*/}
          <div className="flex flex-row justify-start items-start w-full gap-[56px]">
            <div className="flex flex-col w-[50%] h-fit items-start justify-start gap-4">
              {creationItem.slice(0, 3).map((item) => {
                const creation = {
                  title: item.title,
                  key: item.key,
                  type: item.type
                };
                return <CreationItem creation={creation} />;
              })}
            </div>

            <div className="flex flex-col w-[50%] h-fit items-start justify-start gap-4">
              {creationItem.slice(3, 6).map((item) => {
                const creation = {
                  title: item.title,
                  key: item.key,
                  type: item.type
                };
                return <CreationItem creation={creation} />;
              })}
            </div>
          </div>
        </div>

        {/*Address */}
        <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
          <Icon
            icon="mdi:address-marker-outline"
            width={20}
            height={20}
            className="text-dark100_light900"
          />
          <p className="text-dark100_light900 paragraph-bold">
            Address Information
          </p>
        </div>
        <div className="flex w-full h-[1px] bg-light-500"></div>
        <div className="flex flex-col items-start justify-center w-full gap-[30px]">
          {/*Information Input*/}
          <div className="flex flex-row justify-start items-start w-full gap-[56px]">
            <div className="flex flex-col w-[50%] h-fit items-start justify-start gap-4">
              {creationItem.slice(6, 8).map((item) => {
                const creation = {
                  title: item.title,
                  key: item.key,
                  type: item.type
                };
                return <CreationItem creation={creation} />;
              })}
            </div>

            <div className="flex flex-col w-[50%] h-fit items-start justify-start gap-4">
              {creationItem.slice(8, 10).map((item) => {
                const creation = {
                  title: item.title,
                  key: item.key,
                  type: item.type
                };
                return <CreationItem creation={creation} />;
              })}
            </div>
          </div>
        </div>

        {/*Account */}
        <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
          <Icon
            icon="line-md:account"
            width={20}
            height={20}
            className="text-dark100_light900"
          />
          <p className="text-dark100_light900 paragraph-bold">Account</p>
        </div>
        <div className="flex w-full bg-light-500"></div>
        <div className="flex flex-col items-start justify-center w-full gap-[30px]">
          {/*Information Input*/}
          <div className="flex flex-row justify-start items-start w-full gap-[56px]">
            <div className="flex flex-col w-[50%] h-fit items-start justify-start gap-4">
              <CreationItem creation={creationUser} />
            </div>

            <div className="flex flex-col w-[50%] h-fit items-start justify-start gap-4">
              <CreationItem creation={creationPassword} />
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full h-fit gap-6 pt-8 justify-start">
          <Button
            onClick={handleBack}
            className="paragraph-regular text-dark100_light900 py-2 px-3 rounded-lg background-light700_dark400 w-fit"
          >
            Discard
          </Button>
          <Button className="bg-primary-500 hover:bg-primary-500 hover:bg-opacity-20 bg-opacity-20 text-primary-500 paragraph-regular py-2 px-3 rounded-lg w-fit">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
