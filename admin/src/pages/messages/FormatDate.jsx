import React from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate().toString().padStart(2, "0");
  const month = months[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const now = new Date();
  const elapsedSeconds = Math.round((now - date) / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays > 0) {
    return `${dayOfWeek}, ${day} ${month}`;
  } else if (elapsedHours > 0) {
    return `${dayOfWeek}, ${hours}:${minutes}:${seconds} (${elapsedHours} hours ago)`;
  } else if (elapsedMinutes > 0) {
    return `${dayOfWeek}, ${hours}:${minutes}:${seconds} (${elapsedMinutes} minutes ago)`;
  } else {
    return `${dayOfWeek}, ${hours}:${minutes}:${seconds} (${elapsedSeconds} seconds ago)`;
  }
}

function FormattedDate(props) {
  const { dateString } = props;
  const formattedDate = formatDate(dateString);
  return <span>{formattedDate}</span>;
}

export default FormattedDate;
