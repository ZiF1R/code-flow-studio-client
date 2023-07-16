import React, {FC, MouseEvent, useState} from 'react';
import Button from "components/Button";
import {
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover
} from "@mui/material";
import MoreIcon from "modules/Dashboard/components/Recent/Icons/MoreIcon";
import {Size, Variant} from "utils/types/global.types";

const menu = [
  {
    name: "Open project",
    action: () => {},
  },
  {
    name: "Open project in new tab",
    action: () => {},
  },
  {
    name: "Copy project link",
    action: () => {},
  },
  {
    divider: true,
  },
  {
    name: "Move to folder",
    action: () => {},
  },
  {
    divider: true,
  },
  {
    name: "Rename project",
    action: () => {},
  },
  {
    name: "Freeze project",
    action: () => {},
  },
  {
    name: "Make project a template",
    action: () => {},
  },
  {
    divider: true,
  },
  {
    name: "Delete project",
    action: () => {},
  },
];

const CardMenu: FC = () => {
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="card__menu">
      <Button aria-describedby={id} onClick={handleClick} variant={Variant.Text} size={Size.Small}>
        <MoreIcon />
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
        <Paper sx={{ width: "fit-content" }}>
          <MenuList>
            {menu.map((item, i) => {
              if (item.divider) {
                return (<Divider key={i} />)
              }

              return (
                <MenuItem key={i} onClick={item.action}>
                  <ListItemText>{item.name}</ListItemText>
                </MenuItem>
              )
            })}
          </MenuList>
        </Paper>
      </Popover>
    </div>
  );
}

export default CardMenu;
