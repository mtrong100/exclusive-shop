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
