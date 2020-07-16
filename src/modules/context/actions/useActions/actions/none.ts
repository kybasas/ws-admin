import { AppContextStateInterface } from "modules/context/hooks/useAppContext";

import { ActionInputDataInterface } from "../types";

import { ActionOptions, ActionType } from "types/Actions";

export default async function none(
  _appContext: AppContextStateInterface,
  _actionOptions: ActionOptions[ActionType.NONE],
  inputData: ActionInputDataInterface,
): Promise<any> {
  return Promise.resolve(inputData);
}
