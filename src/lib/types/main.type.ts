import {
  MutableRefObject,
  ReactChild,
  ReactFragment,
  ReactPortal
} from "react";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type { ChainedRequestInputConfigType } from "./useResource.type";

export interface DebugObject {
  timestamp: string;
  message?: string;
  data?: object;
}

export type JsxComponentType =
  | boolean
  | ReactChild
  | ReactFragment
  | ReactPortal
  | JSX.Element
  | null
  | undefined;

export type ResourceType<T> = {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  errorData: object | null | undefined;
  debug: MutableRefObject<DebugObject[]>;
  cancel: any;
  refetch: (customConfig: BaseConfigType) => void;
};

export type LoadingComponentType = () => JSX.Element;
export type ErrorComponentType = (
  errorMessage: string,
  errorData: any
) => JSX.Element;

export interface ContextContainerPropsType {
  children?: JsxComponentType;
  loadingComponent?: LoadingComponentType;
  errorComponent?: ErrorComponentType;
}

export type ContextContainerType = (
  props: ContextContainerPropsType
) => JSX.Element;

export type BaseConfigType =
  | AxiosRequestConfig
  | ChainedRequestInputConfigType[];

export type ChainResponseType = object | AxiosResponse | void;
export type AccumulatorType = (object | AxiosResponse)[];
export type AccumulatorContainer = { current: AccumulatorType };
export type NextType = (data: ChainResponseType) => AccumulatorContainer;

export type BeforeTaskType = (
  accumulator?: AccumulatorContainer,
  next?: NextType,
  disableStateUpdate?: boolean
) => void;

export type TaskType = (
  customConfig: AxiosRequestConfig,
  accumulator?: AccumulatorContainer,
  next?: NextType
) => Promise<AxiosResponse>;

export type OnSuccessType = (
  response: AxiosResponse,
  accumulator?: AccumulatorContainer,
  next?: NextType,
  disableStateUpdate?: boolean
) => void;

export type OnFailureType = (
  error: any | AxiosError,
  accumulator?: AccumulatorContainer,
  next?: NextType
) => void;

export type OnFinalType = (
  accumulator?: AccumulatorContainer,
  next?: NextType,
  disableStateUpdate?: boolean
) => void;

export type PushToAccumulatorType = (
  next: NextType | undefined,
  res: ChainResponseType | undefined
) => void;
