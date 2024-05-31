const ITEMS_PER_PAGE = 10;

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last pages.

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is amont the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export function VerifyQueryForSearch<T>(item: T, query: string) {
  let hasInList = 0;
  for (let property in item) {
    if (isKeyOfT(property, item)) {
      let itemProperty = item[property as keyof T];

      // verifica se a propriedade é uma string ou pode ser convertida para
      if (itemProperty !== null && itemProperty !== undefined) {
        let itemPropertyString = itemProperty.toString().toLowerCase();
        query = query.toLowerCase();
        if (itemPropertyString.includes(query)) hasInList++;
      }
    }
  }
  return hasInList > 0;
}

export function ListItemsLimitedPerPage(
  key: number,
  offset: number,
  ITEMS_PER_PAGE: number
) {
  return key >= offset && key <= offset + (ITEMS_PER_PAGE - 1);
}

export function OrderingByItem<T>(array: T[], item: keyof T): T[] {
  array.sort(function (a, b) {
    if (a[item] < b[item]) {
      return -1;
    }
    if (a[item] > b[item]) {
      return 1;
    }
    return 0;
  });
  return array;
}

function isKeyOfT<T>(key: string, type: T): key is keyof T {
  return key in type;
}
export function convertToKeyOfT<T>(key: string, type: T): keyof T | undefined {
  if (isKeyOfT(key, type)) {
    return key;
  } else {
    return undefined;
  }
}

export async function HowManyPagesGeneric<T>(
  getAllItems: () => Promise<T[]>,
  query: string
): Promise<number> {
  let items: Array<T> = await getAllItems();
  let filteredItems: T[];

  if (query && query.trim() != "") {
    filteredItems = items.filter((item: T) =>
      VerifyQueryForSearch(item, query)
    );
  } else {
    filteredItems = [...items];
  }
  const totalPages = Math.ceil(Number(filteredItems.length) / ITEMS_PER_PAGE);
  return totalPages;
}

export async function fetchFilteredItemsGeneric<T>(
  query: string,
  order: string,
  currentPage: number,
  getAllItems: () => Promise<T[]>,
  type: T
): Promise<T[]> {
  let items: T[] = await getAllItems();
  let filteredItems: T[];
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Aqui caso houver uma query, fazemos o filtro dos tickets por ela.
  if (query != "") {
    filteredItems = items?.filter((item: T) =>
      VerifyQueryForSearch(item, query)
    );
  } else {
    filteredItems = [...items];
  }
  if (order != "") {
    let newOrder = convertToKeyOfT(order, type);
    if (newOrder) filteredItems = OrderingByItem(filteredItems, newOrder);
  }
  // Aqui vamos filtrar agora pela paginação.
  filteredItems = filteredItems.filter((item, key) =>
    ListItemsLimitedPerPage(key, offset, ITEMS_PER_PAGE)
  );

  return filteredItems;
}
