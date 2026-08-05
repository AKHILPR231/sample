import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { useAuth } from "@/lib/auth";

import "./LoginPage.css";

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = useCallback(() => {
    // Mock SSO — replace with the real Entra ID (MSAL) login later.
    signIn();
    navigate("/admin");
  }, [signIn, navigate]);

  return (
    <div className="login">
      <section className="login__left">
        <span className="login__glow" />

        <div className="login__brand">
          <Logo variant="light" />
        </div>

        <div className="login__leftBody">
          <h1 className="login__title">
            VIA OUTLETS
            <br />
            MANAGEMENT PORTAL
          </h1>
          <p className="login__lead">
            Enterprise administration and configuration platform for premium
            European retail destinations.
          </p>

          <div className="login__block">
            <h2 className="login__blockTitle">Access &amp; Registration</h2>
            <p className="login__blockText">
              To access the application, please contact your administrator to get
              registered.
            </p>
          </div>

          <div className="login__block">
            <h2 className="login__blockTitle">Getting Started</h2>
            <ol className="login__steps">
              <li>1. Log in to the admin portal using your credentials.</li>
              <li>2. Navigate to the settings page to configure your preferences.</li>
              <li>3. Review and publish your changes to go live.</li>
            </ol>
          </div>
        </div>

        <p className="login__copyright">
          © 2026 VIA Outlets. All corporate rights reserved.
        </p>
      </section>

      <section className="login__right">
        <div className="login__card">
          <h2 className="login__cardTitle">
            SIGN IN TO YOUR
            <br />
            ACCOUNT
          </h2>
          <p className="login__cardText">
            Use your corporate credentials to access the VIA administrative
            environment.
          </p>

          <button
            type="button"
            className="login__ssoBtn"
            onClick={handleSignIn}
          >
            SIGN IN WITH MICROSOFT ENTRA ID
          </button>

          <div className="login__divider" />

          <p className="login__protected">
            Protected by Microsoft Entra ID · Enterprise SSO
          </p>
        </div>
      </section>
    </div>
  );
}
