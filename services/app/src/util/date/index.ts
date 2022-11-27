export const now = () => {
  return new Date(
    new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })
  );
};

/**
 * 無効な日付の場合は`true`を返す
 *
 * @param date
 * @returns
 *
 * @example
 * const invalidDate = new Date("invalid date");
 * isInvalidDate(invalidDate); // true
 *
 * const validDate = new Date();
 * isInvalidDate(validDate); // false
 */
export const isInvalidDate = (date: Date) => {
  return isNaN(date.getTime());
};
