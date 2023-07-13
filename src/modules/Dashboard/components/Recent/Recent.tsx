import React, {FC} from 'react';
import Button from "components/Button";
import {Size, Variant} from "utils/types/global.types";
import "modules/Dashboard/assets/recent.scss";
import ProjectsIcon
  from "modules/Dashboard/components/Sidebar/Icons/ProjectsIcon";
import PlusIcon from "modules/Dashboard/components/Header/Icons/PlusIcon";
import ImportIcon from "modules/Dashboard/components/Recent/Icons/ImportIcon";
import CardsBlock from "modules/Dashboard/components/Recent/CardsBlock";

const cards = [
  {
    name: "test-project-rxgsl",
    lastUpdate: "2d ago",
  },
  {
    name: "test-project-rxgsl",
    lastUpdate: "2d ago",
  },
  {
    name: "test-project-rxgsl",
    lastUpdate: "2d ago",
  },
  {
    name: "test-project-rxgsl",
    lastUpdate: "2d ago",
  },
  {
    name: "test-project-rxgsl",
    lastUpdate: "2d ago",
  },
  {
    name: "test-project-rxgsl",
    lastUpdate: "2d ago",
  },
];

const Recent: FC = () => {
  return (
    <div className="recent__container">
      <h2>Recent</h2>

      <div className="recent__actions">
        <Button variant={Variant.Contained} size={Size.Large}>
          <ProjectsIcon />
          <span>New project</span>
        </Button>
        <Button variant={Variant.Contained} size={Size.Large}>
          <ImportIcon />
          <span>Import repository</span>
        </Button>
        <Button variant={Variant.Contained} size={Size.Large}>
          <PlusIcon />
          <span>Create team</span>
        </Button>
      </div>

      <CardsBlock title="Pick up where you left off" cards={cards} />
    </div>
  );
}

export default Recent;
