import React, {FC} from 'react';
import "modules/Dashboard/assets/sidebar.scss";

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
const menuIconsBaseUrl = "modules/Dashboard/components/Sidebar/Icons";

const Sidebar: FC = () => {
  return (
    <aside>

    </aside>
  );
}

export default Sidebar;
