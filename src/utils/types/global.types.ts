import React from "react";

interface ComponentBaseProps {
  children: React.ReactNode
}

export enum Theme {
  dark = "dark",
  light = "light",
}

export type {
  ComponentBaseProps,
}
