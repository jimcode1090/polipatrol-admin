import React, {useState} from 'react'
import { Tab, Button } from "semantic-ui-react";
import { MapSupportAlert, ListSupportAlert } from "../../../components/Admin/SupportAlert";
import "./SupportAlert.scss";



export function SupportAlert() {
  const [reload, setReload] = useState(false);
  const onReload = () => setReload((prevState) => !prevState);

  const panes = [
    {
      menuItem: "Alertas por atender",
      render: () => (
        <Tab.Pane attached={false}>
          {/* <ListUsers usersActive={true} reload={reload} onReload={onReload} /> */}
          <MapSupportAlert statusAlert={"UNREAD"} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Alertas atendidas",
      render: () => (
        <Tab.Pane attached={false}>
         <ListSupportAlert alertsUnread={"READ"} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  

  return (
    <>
       <div className="users-page">
        <Tab menu={{ secondary: true }} panes={panes} />
      </div>
    </>
  )
}
