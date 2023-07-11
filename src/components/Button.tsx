import React, {FC} from 'react';
import {ComponentBaseProps} from "utils/types/global.types";

export enum Variant {
  Primary = "button_primary",
  Secondary = "button_secondary",
  Outlined = "button_outlined",
  Text = "button_text",
}

export enum Size {
  L = "button_large",
  M = "button_medium",
  S = "button_small",
}

interface IButton extends ComponentBaseProps {
  variant?: Variant,
  size?: Size,
}

const Button: FC<IButton> = ({children, variant = Variant.Text, size = Size.M}) => {
  const classes = `${variant} ${size}`;

    return (
      <button className={classes}>
        {children}
      </button>
    );
}

export default Button;
