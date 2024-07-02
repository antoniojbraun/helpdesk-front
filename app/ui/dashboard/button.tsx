import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}>
      {children}
    </button>
  );
}

interface InputFileProps {
  fileName: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputFile({ fileName, handleFileChange }: InputFileProps) {
  return (
    <div className="flex justify-end border-[2px] border-neutral-900 border-opacity-20 rounded-md bg-[#fff]">
      <div className="h-full py-[6px] px-[20px]">
        <p>{fileName}</p>
      </div>
      <label
        htmlFor="file"
        className="flex py-[6px] px-[20px] bg-[#C2CFD9] cursor-pointer">
        Selecionar arquivo
      </label>
      <input
        id="file"
        name="file"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        aria-describedby="file-error"
      />
    </div>
  );
}
