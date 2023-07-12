import React, {FC, MouseEvent} from "react";
import Button from "components/Button";
import GoogleIcon from "components/Icons/GoogleIcon";
import {useNavigate} from "react-router-dom";
import {Size, Variant} from "utils/types/global.types";
import logo from "assets/images/logo.png";
import "./signin.scss";

const SigninView: FC = () => {
  const navigate = useNavigate();

  function signIn(e: MouseEvent) {
    navigate("/dashboard");
  }

  return (
    <div className="signin-container">
      <header className="signin__header logo">
        <img src={logo} alt=""/>
      </header>
      <main className="signin__content">
        <h1>Sign in to <div>CodeFlowStudio</div></h1>
        <p>Login or register to start building your projects today.</p>

        <div className="content__buttons">
          <Button variant={Variant.Primary} size={Size.Large} onClick={signIn}>
            <GoogleIcon />
            Sign in with GitHub
          </Button>

          <div className="buttons__row">
            <Button variant={Variant.Secondary} onClick={signIn}>
              <GoogleIcon />
              Sign in with Google
            </Button>
            <Button variant={Variant.Secondary} onClick={signIn}>
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
