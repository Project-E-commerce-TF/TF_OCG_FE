export const numberToCurrencyVND = (number) =>
  (number = number.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  }));
