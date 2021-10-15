import React,{useEffect} from "react";
import { useForm} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import "../css/styles.css";

const Skills = (props) => {
  const { state, action } = useStateMachine(updateAction);
  const { handleSubmit, register } = useForm({
    defaultValues: state.yourDetails,
  });
  const { push } = useHistory();
  const onSubmit = (data) => {
    action(data);
    push("/download");
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

  console.log(state.yourDetails.skills)
  return (
    <>
      <div class="title">
        <h1 class="title_style">Skills</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* { state.yourDetails.skills!=undefined &&(
      state.yourDetails.skills.map(el => {
            return (
              <div>
              <div class="input-group flex-nowrap">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Skills"
                        value={el.skill}
                        aria-describedby="addon-wrapping"
                      />
            </div>
                       <input
                       style={{ background: "red",marginLeft:'20px' }}
                       onClick={removeFriend(el)}
                       type="button"
                       value="Remove"
                     />   
                </div>      
            );
          }))} */}
        {indexes.map((index) => {
          const fieldName = `skills[${index}]`;
          return (
            
            <fieldset name={fieldName} key={fieldName}>
              <div class=" container">
                <div class="row">
                  <div class="col-sm">
                    <div class="input-group flex-nowrap">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Skills"
                        required
                        name={`${fieldName}.skill`}
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
        <input class="btn-bottom-left" onClick={() => push('/step2')} type="submit" value="Back" />
      </form>
    </>
  );
};
export default Skills;
