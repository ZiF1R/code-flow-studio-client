import React, {FC} from 'react';
import Button from "components/Button";
import {Variant} from "utils/types/global.types";
import "modules/Dashboard/assets/recent.scss";
import ProjectsIcon
  from "modules/Dashboard/components/Sidebar/Icons/ProjectsIcon";

const Recent: FC = () => {
  return (
    <div className="recent__container">
      <h2>Recent</h2>

      <div className="recent__actions">
        <Button variant={Variant.Contained}>
          <ProjectsIcon />
          <span>New project</span>
        </Button>
        <Button variant={Variant.Contained}>
          <ProjectsIcon />
          <span>New project</span>
        </Button>
      </div>
    </div>
  );
}

export default Recent;
