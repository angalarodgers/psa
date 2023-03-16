import React from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function DateConverter({ dateString }) {
  const formattedDate = formatDate(dateString);
  return <div>{formattedDate}</div>;
}

export default DateConverter;
