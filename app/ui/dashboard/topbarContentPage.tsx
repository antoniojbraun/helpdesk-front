import { CreateButton } from "./buttons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  titlePage: String;
  titleButton: String;
  urlButton: String;
}

export default function TopbarContentPage({
  titlePage,
  titleButton,
  urlButton,
}: ButtonProps) {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1>{titlePage}</h1>
      </div>
      <div>
        <CreateButton urlDestino={urlButton}>{titleButton}</CreateButton>
      </div>
    </div>
  );
}
