import "./styles.css";

const Instructions = () => {
  return (
    <>
      <h2>Instructions for app use</h2>
      <ol>
        <p>
          <li>
            This app has been created with TV apps in mind. With that in mind,
            please make viewport width/height 1920 x 1080{" "}
          </li>
        </p>
        <p>
          <li>
            As with a TV remote, the "enter" button on the keyboard opens the on
            screen keyboard and the "backspace" button closes it. Directional
            keys navigate around different field/button focus states. As this is
            not a custom keyboard,the focus manager has no effect on the
            keyboard, and keys have to be pressed with the mouse cursor.
          </li>
        </p>
        <p>
          <li>
            Email validation has been added to ensure it is not possible to
            proceed to entering password if valid email is not present. The same
            logic applies if a user has not entered a password
          </li>
        </p>
      </ol>
    </>
  );
};

export default Instructions;
