export type userModel = {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  contacts: Array<string> | Array<any>;
  length?: number;
};
