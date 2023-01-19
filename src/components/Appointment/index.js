import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    return props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE));
  };

  const deleteInterview = (event) => {

    transition(DELETING);

    return props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  };

  // console.log('props', props);
  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props?.interview && (
        <Show
          student={props?.interview?.student ?? ""}
          interviewer={props?.interview?.interviewer ?? ""}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview?.student ?? ""}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving ..."} />}
      {mode === DELETING && <Status message={"Deleting ..."} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to cancel interview?"}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error onClose={back} message={"Could not save interview"} />
      )}
      {mode === ERROR_DELETE && (
        <Error onClose={back} message={"Could not delete interview"} />
      )}
    </article>
  );
};

export default Appointment;
