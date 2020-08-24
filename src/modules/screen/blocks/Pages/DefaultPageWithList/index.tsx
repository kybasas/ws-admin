import React from "react";

import Typography from "primitives/Typography";

import { marginBottom } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";

import DefaultPageWrapper from "../common/DefaultPageWrapper";
import { defaultContentStyles } from "../common/styles";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

function DefaultPageWithList({ slots, options }: ContainSlotsInterface & BlockInterface<{ title: string }>) {
  return (
    <DefaultPageWrapper
      heading={
        <>
          <Typography type="h1-bold">{options!.title}</Typography>
          {slots.headingAction && <BlockRenderer {...slots.headingAction} />}
        </>
      }
    >
      {slots.subHeading && <BlockRenderer {...slots.subHeading} styles={[marginBottom(16)]} />}
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={defaultContentStyles} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(DefaultPageWithList);
