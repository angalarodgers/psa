import React, { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import toast, { Toaster } from "react-hot-toast";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const EventCustomersTR = ({ customer }) => {
  const [user, setUserss] = useState({});
  const { uisLoading, uerror, udata } = useQuery(
    "fetchClientDetails" + customer.id,
    () =>
      makeRequest.get("/users/getClient/" + customer.userId).then((res) => {
        setUserss(res.data);
        console.log(res.data);
        return res.data;
      }),
    { staleTime: 1000 }
  );

  const handleDelete = async (e, assignId) => {
    e.preventDefault();
    console.log(assignId);
    if (assignId > 0) {
      toast.success("Removing User From Event!");
      try {
        const res = await makeRequest.delete(
          "/users/deleteAssignedClass/" + assignId
        );
        console.log(res);
        if (res.status === 200) {
          await sleep(1000);
          toast.success(res.data);
          await sleep(2000);
          window.location.reload(false);
        }
      } catch (err) {
        toast.error("Error Occured");
        console.log(err);
      }
    } else {
      toast.error("Cant Remove!");
    }
  };
  return (
    <tr key={customer.id}>
      <td>
        <div className="d-flex px-2 py-1">
          <div>
            <img
              src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg"
              className="avatar avatar-sm me-3"
            />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <h6 className="mb-0 text-xs">{user.username}</h6>
            <p className="text-xs text-secondary mb-0">{user.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-xs font-weight-bold mb-0">Member</p>
        <p className="text-xs text-secondary mb-0">Individual</p>
      </td>

      <td className="align-middle text-center">
        <span className="text-secondary text-xs font-weight-bold">
          23/04/18
        </span>
      </td>
      <td className="align-middle">
        <a
          href="#"
          className="btn btn-default text-secondary font-weight-bold text-xs"
          data-toggle="tooltip"
          data-original-title="Edit user"
          onClick={(e) => handleDelete(e, customer.id)}
        >
          Remove
        </a>
      </td>
      <Toaster key={customer.id} />
    </tr>
  );
};

export default EventCustomersTR;
