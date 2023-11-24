import { Dispatch, SetStateAction } from "react";

export type SetStateFunction<T> = Dispatch<SetStateAction<T>>;
