"use client";

import {
  useSearchParams,
  useRouter,
  usePathname,
} from "@/node_modules/next/navigation";

const styleDivDefault = "flex space-x-4 items-center px-[10px]";
const styleInputDefault =
  "border rounded-[3px] border-gray-400 px-[12px] py-[4px]";

export default function Search({
  placeholder,
  title,
  isActive,
}: {
  placeholder: string;
  title: string;
  isActive: boolean;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-row items-center">
      <div className={`${styleDivDefault}`}>
        <label htmlFor="searchInput">{title}</label>
        <input
          disabled={!isActive}
          type="text"
          placeholder={placeholder}
          className={`${styleInputDefault} w-[220px] `}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query"?.toString())}
        />
      </div>
    </div>
  );
}
