import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = ({ currency, showSpinner, pay, setErrors }) => {
  const [payId, setPayId] = useState({
    pid: "",
    approve: false,
  });

  const navigate = useNavigate();
  const submit = async () => {
    if (payId.length !== 0) {
      pay.pay_id = payId.pid;
      const res = await axios.post("http://localhost:8880/savePayment", {
        pay: pay,
        client: info.user,
      });
      console.log(res.status);
      payId.pid = "";
      payId.approve = false;
    }
  };
  useEffect(() => {}, [payId.approve]);
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: pay.currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={pay.style}
        disabled={false}
        forceReRender={[pay.amount, pay.currency, pay.style]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          const orderId = await actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: pay.currency,
                  value: pay.amount,
                },
              },
            ],
          });

          return orderId;
        }}
        onApprove={async (data, actions) => {
          await actions.order.capture();

          try {
            const res = await makeRequest.post("/pay/makepay", {
              data: [data, pay],
            });
            if (res.status === 200) {
              toast.success("Payment Made Successfully!");
              window.location.reload(false);
              //navigate("/dashboard");
            }
          } catch (error) {
            console.log(error);
            setErrors(error);
          }
        }}
      />
      <Toaster />
    </>
  );
};

export default ButtonWrapper;
