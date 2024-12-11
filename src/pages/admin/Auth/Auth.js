import React, { useState } from "react";
import {Image, Tab} from "semantic-ui-react";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Icon } from "../../../assets";
import "./Auth.scss";
import { image } from '../../../assets'

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const openLogin = () => setActiveIndex(0);

  const panes = [
    {
      menuItem: "Ingrese sus credenciales para ingresar al sistema",
      render: () => (
        <Tab.Pane>
          <LoginForm />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="auth">

        <Image
            src={ image.LogoPoliPatrol }
            className="logo"
        />

      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  );
}
