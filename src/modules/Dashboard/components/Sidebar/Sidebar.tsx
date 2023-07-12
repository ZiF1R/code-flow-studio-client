import React, {FC, useState} from 'react';
import "modules/Dashboard/assets/sidebar.scss";
import {Link} from "react-router-dom";

// TODO: create type for menu
const menu = [
  {
    icon: "RecentIcon",
    name: "Recent",
    link: "/dashboard/recent",
    divider: false,
  },
  {
    icon: "SharedIcon",
    name: "Shared with me",
    link: "/dashboard/shared",
    divider: false,
  },
  {
    icon: "FavouriteIcon",
    name: "Favourites",
    link: "/dashboard/favourites",
    divider: false,
  },
  {
    icon: "",
    name: "Repositories",
    link: "",
    divider: true,
  },
  {
    icon: "ContributionIcon",
    name: "Contributions",
    link: "/dashboard/contributions",
    divider: false,
  },
  {
    icon: "RepositoriesIcon",
    name: "All repositories",
    link: "/dashboard/repositories",
    divider: false,
  },
  {
    icon: "",
    name: "Projects",
    link: "",
    divider: true,
  },
  {
    icon: "TemplatesIcon",
    name: "Templates",
    link: "/dashboard/templates",
    divider: false,
  },
  {
    icon: "ProjectsIcon",
    name: "All projects",
    link: "/dashboard/projects",
    divider: false,
  },
];
const menuIconsBaseUrl = "modules/Dashboard/components/Sidebar/Icons";

const Sidebar: FC = () => {
  const [activeLinkIndex, setActiveLinkIndex] = useState<null | number>(null);

  return (
    <aside>

      <ul className="menu__list">
        {menu.map((item, i) => {
          if (item.divider) {
            return (<div key={i} className="list__divider">{item.name}</div>)
          }

          const { default: IconComponent } =
            require(`${menuIconsBaseUrl}/${item.icon}`);

          return (
            <Link onClick={() => setActiveLinkIndex(i)} className={`list__item ${activeLinkIndex === i ? "item_active" : ""}`} key={i} to={item.link}>
              <IconComponent />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
