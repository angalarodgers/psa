import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import ButtonWrapper from "./ButtonWrapper";
import { AuthContext } from "../../context/authContext";

const MakePaymentBodyTab = () => {
  const { currentUser } = useContext(AuthContext);
  const apiKey = import.meta.env.VITE_CLIENT_ID;
  const [pay, setPay] = useState({
    amount: null,
    style: { layout: "vertical" },
  });
  const [errors, setErrors] = useState();
  const handleChange = (e) => {
    setPay({ ...pay, [e.target.name]: e.target.value });
    console.log(pay);
  };

  const { isLoading, error, data } = useQuery("getUsers", () =>
    makeRequest.get("/pay/getpay").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="row">
      <div className="col-sm-2"></div>
      <div className="col-sm-8">
        <div className="card card-plain">
          <div className="card-body">
            <form role="form text-left">
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Customer</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option value={currentUser.id}>{currentUser.username}</option>
                </select>
              </div>

              <label>Amount</label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Amount"
                  aria-label="funds"
                  aria-describedby="fund"
                  name="amount"
                  onChange={handleChange}
                  value={pay.amount}
                />
              </div>

              <div className="text-center">
                <div>
                  <PayPalScriptProvider
                    options={{
                      "client-id": apiKey,
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <ButtonWrapper
                      currency={pay.currency}
                      showSpinner={false}
                      pay={pay}
                      setErrors={setErrors}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentBodyTab;
