import React, {FC, MouseEvent, useState} from 'react';
import Button from "components/Button";
import {
  Divider, ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover
} from "@mui/material";
import PlusIcon from "modules/Dashboard/components/Header/Icons/PlusIcon";

const teams = [{name: "Default"}, {name: "Team 1"}];

const TeamsSelect: FC = () => {
  const [team, setTeam] = useState(teams[0]);

  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function handleTeamChange(new_team: typeof teams[0]) {
    setTeam(new_team);
    handleClose();
  }

  return (
    <>
      <Button aria-describedby={id} onClick={handleClick}>
        {team.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList className="teams-list">
          {teams.map((t, i) => (
            <MenuItem key={i} className="teams-list__item" onClick={() => handleTeamChange(t)}>
              {/*<ListItemIcon></ListItemIcon>*/}
              <ListItemText>{t.name}</ListItemText>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PlusIcon />
            </ListItemIcon>
            <ListItemText>Create new team</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}

export default TeamsSelect;
