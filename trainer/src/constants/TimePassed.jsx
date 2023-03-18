import React from "react";

function TimePassed({ date }) {
  const timeDiff = Date.now() - Date.parse(date);
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hoursPassed = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

  return (
    <span>
      {daysPassed} days and {hoursPassed} hours
    </span>
  );
}

export default TimePassed;
