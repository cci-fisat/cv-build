import React from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import "../css/styles.css";

const UserDetails = () => {
    const { state, action } = useStateMachine(updateAction);
    const { handleSubmit, errors, register } = useForm({
      defaultValues: state.yourDetails
    });
    const { push } = useHistory();
    const onSubmit = data => {
      action(data);
      push("/step1");
    };
  
  return (
    <>
    <div class="user">
    <div class="title">
      <h1 class="title_style">
        Contact Information
      </h1>
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div class=" container">
        <div class="row">
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                name="firstName"
                required
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                required
                placeholder="Last name"
                name="lastName"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="Address"
                required
                name="address"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
      </div>
      <div class="row">
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                required
                placeholder="City"
                name="city"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="Zip Code"
                required
                name="zip"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="Country"
                required
                name="country"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="email"
                required
                name="email"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
          <div class="col-sm">
            <div class="input-group flex-nowrap">
              <input
                type="text"
                class="form-control"
                placeholder="Phone No"
                required
                name="phone"
                ref={register()}
                aria-describedby="addon-wrapping"
              />
            </div>
          </div>
        </div>
      <input class="btn-bottom-right" type="submit" value="Next" />
      </div>
    </form>
    </div>
    </>
  );
};

export default UserDetails;
