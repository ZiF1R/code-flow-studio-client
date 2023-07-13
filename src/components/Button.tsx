import React, {FC} from 'react';
import {
  IButton,
  Size,
  Variant
} from "utils/types/global.types";

const Button: FC<IButton> = (props) => {
  const {
    children,
    className = "",
    variant = Variant.Text,
    size = Size.Medium,
    onClick = () => {}
  } = props;
  const classes = `${variant} ${size} ${className}`;

    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
}

export default Button;
