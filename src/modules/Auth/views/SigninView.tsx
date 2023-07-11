import React, {FC} from "react";
import logo from "assets/images/logo.png";
import google from "assets/images/google.svg";
import "./signin.scss";
import Button, {Size, Variant} from "components/Button";
import GoogleIcon from "components/Icons/GoogleIcon";

const SigninView: FC = () => {
  return (
    <div className="signin-container">
      <header className="signin__header logo">
        <img src={logo} alt=""/>
      </header>
      <main className="signin__content">
        <h1>Sign in to <div>CodeFlowStudio</div></h1>
        <p>Login or register to start building your projects today.</p>

        <div className="content__buttons">
          <Button variant={Variant.Primary} size={Size.L}>
            <GoogleIcon />
            Sign in with GitHub
          </Button>

          <div className="buttons__row">
            <Button variant={Variant.Secondary}>
              <GoogleIcon />
              Sign in with Google
            </Button>
            <Button variant={Variant.Secondary}>
              <GoogleIcon />
              Sign in with Google
            </Button>
          </div>
        </div>
      </main>
      <footer className="signin__footer">
        <p>
          By continuing, you agree to CodeFlowStudio <br/>
          <a href="">Terms of Service</a>, <a href="">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default SigninView;
