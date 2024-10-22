"use client";
import { useState } from "react";
import { Input } from "../ui/input";

const EditableParagraph = ({ title, initialText, onSave }: any) => {
  const [text, setText] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onSave(text); // Gọi hàm onSave khi lưu
    }
  };

  return (
    <div className="flex flex-row gap-2 items-start justify-start">
      <p className="text-dark100_light900 paragraph-15-light">{title}</p>
      <div className="flex flex-row items-center justify-center">
        {isEditing ? (
          <Input
            className="h-[24px] md:h-[36px] dark:bg-transparent focus:outline-none ring-0 border-light-500"
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleEditToggle}
          />
        ) : (
          <p
            className={`${
              initialText === "Reported"
                ? "text-accent-red"
                : "text-dark100_light900"
            } paragraph-15-semibold cursor-pointer`}
            onClick={handleEditToggle}
          >
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditableParagraph;
