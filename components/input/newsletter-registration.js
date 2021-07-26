import classes from "./newsletter-registration.module.css";
import { useRef, useContext } from "react";
import { emailRegistration } from "../../helpers/api-utils";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const emailInputRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "signing up ...",
      message: "Registerring for NewsLetter.",
      status: "pending",
    });

    try {
      await emailRegistration(enteredEmail);
      notificationCtx.showNotification({
        title: "Success",
        message: "Successfully registered NewsLetter.",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Failed",
        message: error.message || "error occured",
        status: "error",
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
