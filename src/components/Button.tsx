import React, {FC} from 'react';
import {
  IButton,
  Size,
  Variant
} from "utils/types/global.types";

const Button: FC<IButton> = ({children, variant = Variant.Text, size = Size.Medium, onClick= () => {}}) => {
  const classes = `${variant} ${size}`;

    return (
      <button className={classes} onClick={onClick}>
        {children}
      </button>
    );
}

export default Button;
