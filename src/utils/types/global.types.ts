import React, {MouseEvent} from "react";

interface ComponentBaseProps {
  children: React.ReactNode
}

export enum Theme {
  dark = "dark",
  light = "light",
}

export enum Variant {
  Primary = "button_primary",
  Secondary = "button_secondary",
  Outlined = "button_outlined",
  Text = "button_text",
}

export enum Size {
  Large = "button_large",
  Medium = "button_medium",
  Small = "button_small",
}

interface IButton extends ComponentBaseProps {
  variant?: Variant,
  size?: Size,
  onClick?: (event: MouseEvent) => void,
}

export type {
  ComponentBaseProps,
  IButton,
}
