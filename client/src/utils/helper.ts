export const displayPrice = (value: number) => {
  const price = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return price;
};

export const displayRating = (value: string) => {
  const newValue = `${value} ⭐`;
  return newValue;
};

export const displayStar = (value: string) => {
  switch (value) {
    case "1":
      return "⭐";
    case "2":
      return "⭐⭐";
    case "3":
      return "⭐⭐⭐";
    case "4":
      return "⭐⭐⭐⭐";
    case "5":
      return "⭐⭐⭐⭐⭐";

    default:
      break;
  }
};
