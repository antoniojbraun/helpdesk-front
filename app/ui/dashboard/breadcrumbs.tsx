import { clsx } from "clsx";
import Link from "@/node_modules/next/link";
import { Breadcrumb } from "@/app/lib/definitions";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav className="mb-[30px] h-[40px] block" aria-label="Breadcrumb">
      <ol className="flex items-center h-[40px]">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}>
            <Link href={breadcrumb.href} className="text-[20px]">
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
