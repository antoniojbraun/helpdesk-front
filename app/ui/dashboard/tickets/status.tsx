const styleStatus = {
  default: "flex items-center justify-center p-[5px] rounded-md text-xs",
  pending: " bg-yellow-100 text-yellow-800",
  progress: " bg-blue-100 text-blue-500",
  done: " bg-green-100 text-green-500",
  closed: " bg-red-200 text-red-700",
  canceled: " bg-gray-200 text-gray-700",
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
      ${children === "Encerrado" ? styleStatus.closed : ""}
      ${children === "Cancelado" ? styleStatus.canceled : ""}
      `}>
      {children}
    </p>
  );
}
