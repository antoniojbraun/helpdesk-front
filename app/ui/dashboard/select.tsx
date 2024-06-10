"use client";

import {
  useSearchParams,
  usePathname,
  useRouter,
} from "@/node_modules/next/navigation";

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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(sort: string) {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set("sort", sort);
      if (sort === "select") params.delete("sort");
    } else {
      params.delete("sort");
    }

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className={`${styleDivDefault}`}>
      <label htmlFor={`title.toLowerCase()`}>{title}</label>
      <select
        name={`type.toLowerCase()`}
        id={`type.toLowerCase()`}
        className={`${styleInputDefault}`}
        onChange={(e) => handleChange(e.target.value)}>
        <option value="select">{type}</option>
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
