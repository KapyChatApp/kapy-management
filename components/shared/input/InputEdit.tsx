import React from "react";
import classNames from "classnames";

interface InputEditProps {
  titleInput: string;
  width: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
}

const InputEdit = ({
  titleInput,
  width,
  value,
  onChange,
  placeholder,
  name
}: InputEditProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-[8px] text-dark100_light900",
        width
      )}
    >
      <p className="text-dark100_light900 paragraph-15-regular">
        {titleInput}:
      </p>
      <input
        type="text"
        name={name} // Ensure each input has a unique name attribute
        className="h-[34px] border border-border-color rounded-lg px-2 focus:outline-none focus:ring-0"
        value={value} // Allow dynamic value binding
        onChange={onChange} // Allow handling value changes
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputEdit;
