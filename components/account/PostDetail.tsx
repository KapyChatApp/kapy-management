"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import TableOtherList from "./TableOtherList";
import { AccountDetailProps } from "@/types/accounts";
import { PostResponseDTO } from "@/lib/DTO/post";
import { fetchUserPosts } from "@/lib/account.service";
import { useParams } from "next/navigation";

const PostDetail = ({ account, pointRaw }: AccountDetailProps) => {
  const [data, setData] = useState<PostResponseDTO[]>([]);
  const { id } = useParams<{ id: string }>() as { id: string };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: PostResponseDTO[] = await fetchUserPosts(id);
        if (result) {
          setData(result);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        const errorMessage = err?.message || "An unexpected error occurred.";
        alert(`Error fetching data: ${errorMessage}`);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="flex flex-row w-full h-fit gap-[10px] items-end justify-start">
        <Icon
          icon="bx:detail"
          width={18}
          height={20}
          className="text-primary-500"
        />
        <p className="text-primary-500 paragraph-bold">
          Post Detail ({data.length})
        </p>
      </div>
      <div className="flex w-full h-[1px] bg-light-500"></div>
      <div className="flex flex-row gap-1 items-center justify-start">
        <Icon
          icon="material-symbols-light:star-outline"
          width={20}
          height={20}
          className="text-dark100_light900"
        />
        <div className="flex flex-row gap-2 items-center justify-start">
          <p className="text-dark100_light900 paragraph-15-light">
            Point trust:
          </p>
          <p className="text-dark100_light900 paragraph-15-semibold">
            {pointRaw ? pointRaw : account.point}
          </p>
        </div>
      </div>
      <div className="w-full h-fit border-light-500 rounded-xl border-[0.5px] items-center justify-center p-2">
        <TableOtherList otherList={data} />
      </div>
    </div>
  );
};

export default PostDetail;
