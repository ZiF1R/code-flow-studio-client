import React, {FC} from 'react';
import ArrowDownIcon from "components/Icons/ArrowDownIcon";
import {Link} from "react-router-dom";

const menu = [
  {
    icon: "ProfileIcon",
    name: "Profile",
    link: "/u/user-name",
    action: () => {},
    divider: false,
  },
  {
    icon: "PreferencesIcon",
    name: "Preferences",
    link: null,
    action: () => {},
    divider: false,
  },
  {
    icon: "",
    name: "",
    link: null,
    action: () => {},
    divider: true,
  },
  {
    icon: "LinkIcon",
    name: "codeflowstudio.io",
    link: "/",
    action: () => {},
    divider: false,
  },
  {
    icon: "SignoutIcon",
    name: "Sign out",
    link: null,
    action: () => {},
    divider: false,
  },
];
const menuIconsBaseUrl = "modules/Dashboard/components/Header/Icons";

const Menu: FC = () => {
  return (
    <nav className="header__menu">
      <div className="header__logo">
        <ArrowDownIcon />
      </div>
      <ul className="menu__list">
        {menu.map((item, i) => {
          if (item.divider) {
            return (<div className="list__divider"></div>)
          }

          const { default: IconComponent } =
            require(`${menuIconsBaseUrl}/${item.icon}`);

          if (item.link) {
            return (
              <Link className="list__item" key={i} to={item.link} >
                  <IconComponent />
                  <span>{item.name}</span>
              </Link>
            )
          }

          return (
            <li className="list__item" key={i}>
              <IconComponent />
              <span>{item.name}</span>
            </li>
          )
        })}
      </ul>
    </nav>
  );
}

export default Menu;
