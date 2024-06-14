import { HTMLAttributes } from "react";

const styleStatus = {
  default: "flex items-center justify-center p-[5px] rounded-md text-xs",
  pending: " bg-red-100 text-red-500",
  progress: " bg-blue-100 text-blue-500",
  done: " bg-green-100 text-green-500",
};

interface StatusProps extends React.HtmlHTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export default function Status({ children }: StatusProps) {
  return (
    <p
      className={`${styleStatus.default} 
      ${children === "Pendente" ? styleStatus.pending : ""} 
      ${children === "Em Progresso" ? styleStatus.progress : ""}
      ${children === "Resolvido" ? styleStatus.done : ""}
      ${children === "Encerrado" ? styleStatus.default : ""}
      `}>
      {children}
    </p>
  );
}
