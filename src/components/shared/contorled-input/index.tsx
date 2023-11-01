import debounce from "lodash.debounce";
import React, { useState } from "react";

interface Props {
  value: string;
  handleUpdate: (value: any) => void;
}

const CustomInput = ({ value, handleUpdate }: Props) => {
  const [updatedTitle, setUpdatedTitle] = useState(value);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
    handleUpdate(e.target.value);
  };
  return (
    <div>
      <input
        value={updatedTitle}
        onChange={handleTitle}
        placeholder="Type your task title here..."
        className="flex h-full w-full rounded-md bg-transparent pl-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:bg-secondary-background focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default CustomInput;
