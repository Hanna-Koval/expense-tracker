import { RootState } from "../../store";

export const selectTransact = (state: RootState) => state.expense?.value
