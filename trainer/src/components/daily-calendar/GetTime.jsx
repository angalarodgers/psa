import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import {
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useQuery } from "react-query";
import TimeDifferencePercentage from "./TimeDifferencePercentage";

const GetTime = ({ tm, idy }) => {
  const [t, setT] = useState([]);
  const { etisLoading, eterror, etdata } = useQuery("getTime", () =>
    makeRequest.get("/events/getEventTime/" + tm).then((res) => {
      setT(res.data);
      console.log(res.data);
      return res.data;
    })
  );

  console.log("Time =", t);

  return <div></div>;
};

export default GetTime;
