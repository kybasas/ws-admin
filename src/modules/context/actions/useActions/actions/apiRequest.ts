import { Container } from "typedi";

import { RequestManager } from "libs/request";
import { identityValueDecoder } from "libs/request/defaultDecoders";

import { insertContext } from "../../../../admin/context";
import { AppContextStateInterface } from "../../../hooks/useAppContext";
import { ActionInputDataInterface } from "../types";

import { ActionOptions, ActionType } from "types/Actions";

const requestManager = Container.get(RequestManager);

export default function apiRequest(
  appContext: AppContextStateInterface,
  actionOptions: ActionOptions[ActionType.API_REQUEST],
  inputData: ActionInputDataInterface,
): Promise<any> {
  const { method, body, url } = actionOptions;
  const makeRequest = requestManager.createRequest(insertContext(url, appContext), method, identityValueDecoder);
  return makeRequest({ body: insertContext({ ...body, ...inputData }, { ...appContext, local: inputData }) });
}
