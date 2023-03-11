import { useState, useEffect } from "react";

function EventPercentage({ tm, setPercentage }) {
  const now = new Date();
  const currentHour = now.getHours();
  const startHour = tm;
  const endHour = parseInt(startHour) + 1;

  let percentComplete = 0;
  if (currentHour >= endHour) {
    percentComplete = 100;
  } else if (currentHour >= startHour && currentHour < endHour) {
    percentComplete = ((currentHour - startHour) / 1) * 100;
  }

  useEffect(() => {
    setPercentage(percentComplete);
  }, []);

  return (
    <div>
      <small>
        <small>Progress</small> ({percentComplete}%)
      </small>
    </div>
  );
}

export default EventPercentage;
