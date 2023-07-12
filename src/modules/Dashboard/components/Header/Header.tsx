import React, {FC} from 'react';
import Menu from "modules/Dashboard/components/Header/Menu";
import Search from "modules/Dashboard/components/Header/Search";
import Button from "components/Button";
import {Size, Variant} from "utils/types/global.types";
import "./header.scss";
import PlusIcon from "modules/Dashboard/components/Header/Icons/PlusIcon";
import ChatIcon from "modules/Dashboard/components/Header/Icons/ChatIcon";
import TasksIcon from "modules/Dashboard/components/Header/Icons/TasksIcon";
import NotificationsIcon
  from "modules/Dashboard/components/Header/Icons/NotificationsIcon";

const Header: FC = () => {
  return (
    <header className="dashboard__header">
      <Menu />
      <Search />

      <div className="header__buttons">
        <Button variant={Variant.Text} size={Size.Small}>
          <PlusIcon />
          <span>Create</span>
        </Button>
        <Button variant={Variant.Text} size={Size.Small}>
          <ChatIcon />
          <span>Chat</span>
        </Button>
        <Button variant={Variant.Text} size={Size.Small}>
          <TasksIcon />
          <span>Tasks</span>
        </Button>
        <Button variant={Variant.Text} size={Size.Small}>
          <NotificationsIcon />
        </Button>
      </div>
    </header>
  );
}

export default Header;
