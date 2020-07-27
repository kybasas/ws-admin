import React from "react";

import Icon, { Icons } from "primitives/Icon";
import Hint from "primitives/Popper/Hint";
import LinkWrapper from "primitives/LinkWrapper";

import {
  ai,
  Aligns,
  backgroundColor,
  borderRadius,
  boxShadow,
  createAlphaColor,
  cursor,
  disableOutline,
  flex,
  height,
  hover,
  jc,
  pointerEvents,
  transition,
  width,
} from "libs/styles";

export interface BaseIconButtonInterface {
  icon: Icons;
  customIcon?: string;
  selected: boolean;
  href: string;
  hint?: string;
  iconStyles?: any;
}

export const IconLink = React.memo(function ({
  icon,
  customIcon,
  selected,
  href,
  hint,
  styles,
  iconStyles,
}: BaseIconButtonInterface & { styles?: any }) {
  return (
    <Hint text={selected ? null : hint} margin={16}>
      {(initParent) => (
        <LinkWrapper
          ref={initParent}
          to={href}
          styles={[
            width(40),
            height(40),
            borderRadius(6),
            flex,
            ai(Aligns.CENTER),
            jc(Aligns.CENTER),
            transition("background-color 0.2s"),
            disableOutline,
            selected
              ? [backgroundColor("blue/05"), cursor("default"), pointerEvents("none")]
              : hover([backgroundColor("gray-blue/01"), boxShadow([0, 0, 1, 0, createAlphaColor("black", 81)])]),
            styles,
          ]}
        >
          <Icon styles={iconStyles} iconName={icon} customIcon={customIcon} color={selected ? "white" : "blue/09"} />
        </LinkWrapper>
      )}
    </Hint>
  );
});
