export interface cardTypes {
  location?: string;
  title?: string;
  description?: string;
  id?: string;
  updatedAt?: any;
}

export interface jobData {
  email: string;
  name: string;
  skills: string;
  id: string;
}

export type Tuser = {
  email: string;
  name: string;
  skills: string;
  userRole: 0 | 1;
  createdAt: string;
  updatedAt: string;
  id: string;
  token: string;
};

export type TuserContext = {
  isLoggedIN?: boolean;
  user?: Tuser;
  setLoggin: (data: Tuser) => void;
  setLogout: () => void;
};
