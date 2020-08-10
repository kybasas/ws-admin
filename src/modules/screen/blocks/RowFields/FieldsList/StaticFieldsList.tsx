import React from "react";

import FieldsList from "./FieldsList";
import { FieldListComponentInterface } from "./types";

function StaticFieldsList(props: FieldListComponentInterface) {
  return <FieldsList {...props} viewMode="static" />;
}

export default React.memo(StaticFieldsList);
