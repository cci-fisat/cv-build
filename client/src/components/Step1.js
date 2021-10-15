import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import "../css/styles.css";

const Step1 = (props) => {
  const { state, action } = useStateMachine(updateAction);
  const { handleSubmit, register } = useForm({
    defaultValues: state.yourDetails,
  });
  const { push } = useHistory();
  const onSubmit = (data) => {
    action(data);
    push("/step2");
  };

  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearFriends = () => {
    setIndexes([]);
  };

  return (
    <>
      <div class="title">
        <h1 class="title_style">Education</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {indexes.map((index) => {
          const fieldName = `education[${index}]`;
          return (
            <fieldset name={fieldName} key={fieldName}>
              <div class=" container">
                <div class="row">
                  <div class="col-sm">
                    <div class="input-group flex-nowrap">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Institute Name"
                        required
                        name={`${fieldName}.institution`}
                        ref={register}
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="input-group flex-nowrap">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Location"
                        required
                        name={`${fieldName}.location`}
                        ref={register}
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
                        placeholder="Degree"
                        required
                        name={`${fieldName}.degree`}
                        ref={register}
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
                        placeholder="Field of Study"
                        required
                        name={`${fieldName}.field`}
                        ref={register}
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="input-group flex-nowrap">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Start Year"
                        required
                        name={`${fieldName}.syear`}
                        ref={register}
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                  <div class="col-sm">
                    <div class="input-group flex-nowrap">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="End Year"
                        required
                        name={`${fieldName}.eyear`}
                        ref={register}
                        aria-describedby="addon-wrapping"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <input
                style={{ background: "red",marginLeft:'20px' }}
                onClick={removeFriend(index)}
                type="button"
                value="Remove"
              />
            </fieldset>
          );
        })}

        <input
          style={{ float:"right" }}
          onClick={addFriend}
          type="button"
          value="Add"
        />
        <input class="btn-bottom-right" type="submit" value="Next" />
        <input class="btn-bottom-left" onClick={() => push('/')} type="submit"  value="Back" />

      </form>
    </>
  );
};
export default Step1;
