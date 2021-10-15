import React, { useEffect, useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import "../css/styles.css";
import axios from "axios";
import Loader from "react-loader-spinner";

const Download = () => {
  const { push } = useHistory();
  const { state } = useStateMachine(updateAction);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clicked) {
      setLoading(true)
      axios
        .post(
          "https://cv-build-backend.herokuapp.com/details",
          state.yourDetails
        )
        .then((res) => {
          console.log(res.data);
          setClicked(false);
          setLoading(false)
          window.location.assign(
            "https://cv-build-backend.herokuapp.com/get-pdf"
          );
        });
      // do something meaningful, Promises, if/else, whatever, and then
    }
  });

  const onSubmit = () => {};

  return (
    <div class="user">
      <div class="title">
        <h1 class="title_style">
          All Set Download Your File!!!{" "}
        </h1>
      </div>

      <form onSubmit={onSubmit}></form>
      <div class="d-flex justify-content-center">
        <button
          onClick={() => setClicked(true)}
          type="submit"
          class="icon-button"
        >
          <div style={{display:'inline-block'}}>
          <i class="fa fa-download"></i> Download
          <Loader
            type="Puff"
            color="white"
            height={40}
            width={40}
            visible={loading}
            style={{display:'inline-block',marginLeft:'15px'}}
          />
          </div>
        </button>
      </div>
      <input
        class="btn-bottom-left"
        onClick={() => push("/skills")}
        type="submit"
        value="Back"
      />
    </div>
  );
};
export default Download;
