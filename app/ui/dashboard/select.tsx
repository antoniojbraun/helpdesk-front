const styleDivDefault = "flex space-x-4 items-center px-[10px]";
const styleInputDefault =
  "border rounded-[3px] border-gray-400 px-[12px] py-[4px]";

export default function Select({
  title,
  type,
  options,
}: {
  title: string;
  type: string;
  options: { value: string; name: string }[];
}) {
  return (
    <div className={`${styleDivDefault}`}>
      <label htmlFor={`title.toLowerCase()`}>{title}</label>
      <select
        name={`type.toLowerCase()`}
        id={`type.toLowerCase()`}
        className={`${styleInputDefault}`}>
        <option value="">{type}</option>
        {options?.map((item) => {
          return (
            <option value={`${item.value}`} key={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
