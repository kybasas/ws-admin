import React from "react";
import styled from "styled-components/macro";

import {
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  Colors,
  display,
  getColor,
  height,
  stringOrPixels,
  width,
} from "libs/styles";

import { isString } from "../../libs/is";
import Wrapper from "../Wrapper";

import { list } from "./list";

export type Icons = keyof typeof list;

interface StyledSVGInterface {
  width?: number | string;
  height?: number | string;
  styles?: any;
}

interface SVGInterface extends StyledSVGInterface {
  iconName?: Icons;
  customIcon?: any;
  className?: string;
  color?: Colors;
}

const StyledSVG = styled.svg<StyledSVGInterface>`
  display: inline-block;
  min-width: ${(props) => stringOrPixels(props.width!)};
  min-height: ${(props) => stringOrPixels(props.height!)};
`;

const SVG = React.forwardRef(function (
  {
    className,
    iconName,
    width: widthProp,
    height: heightProp,
    styles,
    color = "gray-blue/05",
    customIcon,
  }: SVGInterface,
  refProp: any,
) {
  const rawIcon = React.useMemo(() => customIcon || (iconName ? list[iconName] : null), [iconName, customIcon]);

  const [ref, setRef] = React.useState<HTMLElement | SVGSVGElement | null>();

  const fillColor = getColor(color);

  React.useEffect(() => {
    if (!ref) return;
    ref.innerHTML = `<use xlink:href="${rawIcon.symbol}" fill="${fillColor}"/>`;
  }, [ref, iconName, color, rawIcon, fillColor]);

  if (!rawIcon) return null;

  if (isString(rawIcon)) {
    return (
      <Wrapper
        as="span"
        css={[
          display("inline-block"),
          width(widthProp!),
          height(heightProp!),
          backgroundImage(rawIcon),
          backgroundPosition("center"),
          backgroundSize("cover"),
          styles,
        ]}
        className={className}
        ref={(ref: HTMLElement) => {
          if (refProp) refProp(ref);
          setRef(ref);
        }}
      />
    );
  }

  return (
    <StyledSVG
      // @ts-ignore
      css={styles}
      className={className}
      width={heightProp}
      height={heightProp}
      viewBox={rawIcon.viewBox}
      ref={(ref) => {
        if (refProp) refProp(ref);
        setRef(ref);
      }}
    >
      <use xlinkHref={rawIcon.symbol} fill={fillColor} />
    </StyledSVG>
  );
});

SVG.defaultProps = {
  width: 24,
  height: 24,
};

export default React.memo(SVG);
