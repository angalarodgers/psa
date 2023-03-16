import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import Pay from "./Pay";
import { AuthContext } from "../../../context/authContext";

const BankDepositsList = () => {
  const { currentUser } = useContext(AuthContext);
  const [pays, setPays] = useState([]);
  const { acisLoading, acerror, acdata } = useQuery("GetAllClients", () =>
    makeRequest.get("/pay/getCustomerPays/" + currentUser.id).then((res) => {
      setPays(res.data);
      console.log(res.data);
      return res.data;
    })
  );
  return (
    <div className="card" style={{ width: "100%" }}>
      <div className="card-body pt-4 p-3">
        <ul className="list-group" style={{ width: "100%" }}>
          {acerror
            ? "Something Went Wring"
            : acisLoading
            ? "Loading"
            : pays.map((pay) => <Pay pay={pay} key={pay.id} />)}
        </ul>
      </div>
    </div>
  );
};

export default BankDepositsList;
