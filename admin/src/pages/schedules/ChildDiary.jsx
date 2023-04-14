import React from "react";

const ChildDiary = ({ todayEvents }) => {
  let seven = 0;
  let eight = 0;
  let nine = 0;
  let ten = 0;
  let eleven = 0;
  let twelve = 0;
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  let six = 0;
  let sixone = 0;
  let sixtwo = 0;
  if (todayEvents && Array.isArray(todayEvents)) {
    seven = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T07:00:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T07:45:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    eight = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T07:45:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T08:30:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    nine = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T08:30:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T09:15:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    ten = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T09:15:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T10:00:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    eleven = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T10:00:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T10:45:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    twelve = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T10:45:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T11:30:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    one = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T11:30:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T12:15:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    two = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T12:15:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T13:00:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    three = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T13:00:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T13:45:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    four = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T13:45:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T14:30:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    five = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T14:30:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T15:15:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    six = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T15:15:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T16:00:00`).getTime(); // convert the upper limit to a timestamp

      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    sixone = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T16:00:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T16:40:00`).getTime(); // convert the upper limit to a timestamp

      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;

    sixtwo = todayEvents.filter((obj) => {
      const startTime = new Date(`2000-01-01T${obj.startTime}`).getTime(); // convert startTime to a timestamp
      const startLimit = new Date(`2000-01-01T16:45:00`).getTime(); // convert the lower limit to a timestamp
      const endLimit = new Date(`2000-01-01T17:30:00`).getTime(); // convert the upper limit to a timestamp
      return (
        startTime >= startLimit &&
        startTime < endLimit &&
        obj.ageGroup === "Child"
      ); // check if startTime is between the limits and obj.ageGroup is "child"
    }).length;
  }
  return (
    <div className="card mb-4">
      <div className="card-header pb-0">
        <h6>Child</h6>
      </div>
      <div className="card-body px-0 pt-0 pb-2">
        <div className="table-responsive p-0">
          <table className="table align-items-center mb-0">
            <thead>
              <tr>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                  Time
                </th>
                <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                  Slots
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>7:00 - 7:45 AM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - seven}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>7:45 - 8:30 AM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - eight}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>8:30 - 9:15 AM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - nine}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>9:15 - 10:00 AM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - ten}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>10:00 - 10:45 AM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - eleven}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>10:45 - 11:30 AM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - twelve}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>11:30 - 12:15 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - one}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>12:15 - 01:00 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - two}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>01:00 - 01:45 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - three}
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>01:45 - 02:30 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - four}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>02:30 - 03:15 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - five}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>03:15 - 04:00 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - six}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>04:00 - 04:45 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - sixone}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-xs font-weight-bold mb-0">
                    <small>04:45 - 05:30 PM</small>
                  </p>
                </td>

                <td className="align-middle text-center">
                  <span className="text-secondary text-xs font-weight-bold">
                    {6 - sixtwo}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildDiary;
