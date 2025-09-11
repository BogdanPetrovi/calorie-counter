import type { CompletedUser } from "./userTypes";

export interface DefaultSetUpType {
  next: (item?: string, value?: string | number) => void,
  user?: CompletedUser
}