// => "?categoryIds=1&categoryIds=2"

export const buildParams = (params: Record<string, unknown>): string => {

  const query = Object.entries(params)

    // lọc giá trị không hợp lệ
    .filter(([, value]) =>
      value !== null &&
      value !== undefined &&
      value !== ""
    )

    .flatMap(([key, value]) => {

      if (Array.isArray(value)) {
        return value.map(v =>
          `${encodeURIComponent(key)}=${encodeURIComponent(v)}`
        );
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })

    .join("&");

  return query ? `?${query}` : "";
};