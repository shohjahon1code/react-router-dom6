import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import classes from "./NewsLetterSignup.module.css";

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { state, data } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert('Success');
    }
  }, [data, state]);

  return (
    <fetcher.Form
      action="/newsletter"
      method="post"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
    
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
