"use client";
import InputCustom from "@/components/auth/InputCustom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/lib/auth.service";
import { UserLoginDTO } from "@/lib/DTO/user";
import { getDeviceInfo } from "@/lib/utils";
import { InputCustomProps } from "@/types/auth";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Signin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const inputCustomItems: InputCustomProps[] = [
    { placeholder: "PhoneNumber", value: "", setValue: setPhoneNumber },
    { placeholder: "Password", value: "", setValue: setPassword }
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const params: UserLoginDTO = {
        phoneNumber,
        password,
        ...getDeviceInfo()
      };
      console.log(params);
      const result = await loginUser(params);
      if (result.token === "") {
        toast({
          title: "Error",
          className:
            "border-none rounded-lg bg-accent-red text-light-900 paragraph-regular items-center justify-center"
        });
        return;
      }
      const token = result.token;
      const device = result.device;
      localStorage.setItem("token", token);
      localStorage.setItem("deviceId", device._id);

      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className="flex flex-col items-start justify-center w-full h-fit gap-[48px]">
      <div className="flex flex-col gap-4 items-start justify-center w-full h-fit">
        <p className="text-primary-500 h1-bold">Welcome Back</p>
        <p className="text-dark100_ligh900 paragraph-light">
          Please enter log in details below
        </p>
      </div>

      <div className="flex flex-col w-full h-fit gap-3">
        <div className="flex flex-col gap-6 w-full h-fit">
          {inputCustomItems.map((item, index) => (
            <InputCustom
              key={index}
              placeholder={item.placeholder}
              value={item.value}
              setValue={item.setValue}
            />
          ))}
        </div>
        <Link
          href="/forget-password"
          className="flex items-center justify-end w-full h-fit "
        >
          <p className="text-dark100_light900 paragraph-light italic">
            Forget password
          </p>
        </Link>
      </div>

      <div className="flex flex-col gap-6 items-start justify-center w-full h-fit">
        <Button
          className="border-none bg-primary-500 hover:bg-primary-500  shadow-none w-full h-fit py-4 rounded-[20px] "
          onClick={handleSubmit}
        >
          <p className="text-[20px] font-bold text-light-900 h-[30px]">
            Sign in
          </p>
        </Button>

        <div className="flex flex-row gap-3 justify-between items-center h-fit w-full">
          <div className="bg-light-500 h-[1px] w-full min-h-fit items-center justify-center"></div>
          <div className="flex h-full w-fit items-center justify-center">
            <p className="text-dark100_light900 paragraph-light ">or</p>
          </div>
          <div className="bg-light-500 h-[1px] w-full min-h-fit items-center justify-center"></div>
        </div>

        <div className="flex flex-col justify-center items-start w-full h-fit gap-4">
          <Button className="border border-light-500 bg-transparent shadow-none w-full h-fit py-4 rounded-[20px] gap-4">
            <Icon icon="logos:google-icon" width={30} height={30} />
            <p className="paragraph-medium text-dark100_light900">
              Continue with Google
            </p>
          </Button>
          <div className="flex flex-row gap-3 w-full items-center justify-center h-fit">
            <p className="text-dark100_light900 paragraph-light">
              Don't have an account?
            </p>
            <Link href="/signup">
              <p className="text-primary-500 paragraph-bold">Sign up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
