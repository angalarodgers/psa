import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";

import { useQuery } from "react-query";
import Classes from "../classes/Classes";

const AllEvents = () => {
  return (
    <div className="card card mt-1">
      <Classes />
    </div>
  );
};

export default AllEvents;
