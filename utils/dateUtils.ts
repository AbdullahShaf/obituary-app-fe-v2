export function formatToDottedDate(
  dateInput: string | number | Date
): string | null {
  let date: Date;

  if (dateInput instanceof Date) {
    date = dateInput;
  } else if (typeof dateInput === "number") {
    date = new Date(dateInput);
  } else if (typeof dateInput === "string") {
    const parsed = Date.parse(dateInput);
    if (isNaN(parsed)) {
      console.warn("Invalid date string:", dateInput);
      return null;
    }
    date = new Date(parsed);
  } else {
    console.warn("Unsupported date input:", dateInput);
    return null;
  }

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months start at 0
  const year = date.getFullYear();

  // 🎯 Special case: 31 December → only show year
  if (day === 31 && month === 12) {
    return `${year}`;
  }

  const dayStr = String(day).padStart(2, "0");
  const monthStr = String(month).padStart(2, "0");

  return `${dayStr}.${monthStr}.${year}`;
}

export function formatDayAndTimeSlovenian(
  timestamp: number | null | undefined
): { dayName: string; time: string } {
  if (timestamp == null) {
    return { dayName: "", time: "" };
  }
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return { dayName: "", time: "" };
  }
  const dayName = date.toLocaleDateString("sl-SI", { weekday: "long" });
  const time = date.toLocaleTimeString("sl-SI", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return { dayName, time };
}



export const formatDate = (timestamp: string, options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "2-digit",
  day: "2-digit",
}) => {
  return new Date(timestamp).toLocaleString("sl-SI", options);
};
