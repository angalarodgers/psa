import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../../axios";
import { useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";

const Client = ({ client_id }) => {
  const [cl, setCl] = useState({});
  const { isLoading, error, dddata } = useQuery("get" + client_id, () =>
    makeRequest.get("/users/getClient/" + client_id).then((res) => {
      console.log(res.data);
      setCl(res.data);
      return res.data;
    })
  );

  return (
    <span key={client_id}>
      {client_id} - {cl.email}
      <Toaster />
    </span>
  );
};

export default Client;
