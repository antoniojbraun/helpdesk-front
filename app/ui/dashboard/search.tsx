const styleDivDefault = "flex space-x-4 items-center px-[10px]";
const styleInputDefault =
  "border rounded-[3px] border-gray-400 px-[12px] py-[4px]";

export default function Search({
  placeholder,
  title,
}: {
  placeholder: string;
  title: string;
}) {
  return (
    <div className="flex flex-row items-center">
      <div className={`${styleDivDefault}`}>
        <label htmlFor="searchInput">{title}</label>
        <input
          type="text"
          placeholder={placeholder}
          className={`${styleInputDefault} w-[220px] `}
        />
      </div>
    </div>
  );
}
