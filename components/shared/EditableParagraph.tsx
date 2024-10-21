"use client";
import { useState } from "react";

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
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleEditToggle}
            className="border rounded-md p-1 w-full"
          />
        ) : (
          <p
            className="text-dark100_light900 paragraph-15-semibold cursor-pointer"
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
