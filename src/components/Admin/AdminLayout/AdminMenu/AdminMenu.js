import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

export function AdminMenu() {
  const { pathname } = useLocation();
  const {
    user: { roles },
  } = useAuth();

  const isAdmin = roles.find(rol => rol.name === "admin");
  const isBasic = roles.find(rol => rol.name === "basic");
  const isCeopol = roles.find(rol => rol.name === "ceopol");

  const isCurrentPath = (path) => {
    if (path === pathname) return true;
    return false;
  };

  return (
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin && (
        <>
          <Menu.Item
            as={Link}
            to="/admin/users"
            active={isCurrentPath("/admin/users")}
          >
            <Icon name="user outline" />
            Usuario
          </Menu.Item>

          <Menu.Item
            as={Link}
            to="/admin/support-alerts"
            active={isCurrentPath("/admin/support-alerts")}
          >
            <Icon name="bullhorn" />
            Alertas de Apoyo
          </Menu.Item>

          <Menu.Item
              as={Link}
              to="/admin/chats"
              active={isCurrentPath("/admin/chats")}
          >
            <Icon name="bell outline" />
            chats
          </Menu.Item>
        </>
      )}


    </Menu>
  );
}
