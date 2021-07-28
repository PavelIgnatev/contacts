import { userModel } from './userModel';
export interface cardUser {
  userInfo: userModel,
  key: string
  contacts: Array<string>
  changeContacts: React.Dispatch<React.SetStateAction<never[]>>
}