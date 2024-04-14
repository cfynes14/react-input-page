import { ErrorType } from "../../Pages/InputPage/InputPage";
import "./styles.css";

interface ErrorProps {
  error?: ErrorType;
}

const Error = (props: ErrorProps) => {
  const { error } = props;
  return (
    <>
      {" "}
      {error === ErrorType.UserName ? (
        <h3>Please enter a valid email address</h3>
      ) : (
        <h3>Please enter your password</h3>
      )}
    </>
  );
};

export default Error;
