import React, { useState, useEffect } from "react";

function TimeDifferencePercentage({ start, end }) {
  // Convert start and end values to time format
  const startTime = start ? `${start.toString().padStart(2, "0")}:00:00` : null;
  const endTime = end ? `${end.toString().padStart(2, "0")}:00:00` : null;

  // Calculate the difference between start and end times in milliseconds
  const diffInMs =
    startTime && endTime
      ? new Date(`2000-01-01T${endTime}`).getTime() -
        new Date(`2000-01-01T${startTime}`).getTime()
      : 0;

  // State variable to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Check if current time is between start and end times
  const isCurrentTimeInRange =
    startTime && endTime
      ? currentTime >= new Date(`2000-01-01T${startTime}`) &&
        currentTime <= new Date(`2000-01-01T${endTime}`)
      : false;

  let elapsedPercentage = 0;
  if (isCurrentTimeInRange) {
    elapsedPercentage =
      ((currentTime - new Date(`2000-01-01T${startTime}`)) / diffInMs) * 100;
    if (currentTime > new Date(`2000-01-01T${endTime}`)) {
      elapsedPercentage = 100;
    }
  }

  return <div>{elapsedPercentage.toFixed(2)}%</div>;
}

export default TimeDifferencePercentage;
