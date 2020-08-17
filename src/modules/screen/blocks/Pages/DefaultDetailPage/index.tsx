import React from "react";
import { observer } from "mobx-react-lite";

import Loading from "components/LoadingContainer/Loading";

import { flexValue, overflow } from "libs/styles";

import BlockRenderer from "modules/screen/BlockRenderer";
import { useDataSource } from "modules/context/dataSource/useDataSource";

import DefaultPageWrapper from "../common/DefaultPageWrapper";
import PageHeader, { PageHeaderInterface } from "../common/Header";

import { BlockInterface, ContainSlotsInterface } from "state/globalState";

function DefaultPageWithList({
  slots,
  options,
  dataSource,
}: ContainSlotsInterface & BlockInterface<PageHeaderInterface>) {
  if (dataSource) {
    const data = useDataSource(dataSource);
    if (data.loadingContainer.loading) return <Loading />;
  }

  return (
    <DefaultPageWrapper
      heading={
        <PageHeader
          slots={slots}
          title={options!.title}
          status={options!.status}
          externalReference={options!.externalReference}
        />
      }
    >
      {slots.mainContent && <BlockRenderer {...slots.mainContent} styles={[flexValue(1), overflow("hidden")]} />}
    </DefaultPageWrapper>
  );
}

export default React.memo(observer(DefaultPageWithList));
