import { DatePicker, DatePickerProps } from "antd";

type DisabledDate = DatePickerProps["disabledDate"];
export const disabledDate: DisabledDate = (current) => {
  return current && current.valueOf() < Date.now();
};

export * from "antd/lib/date-picker";
export default DatePicker;
