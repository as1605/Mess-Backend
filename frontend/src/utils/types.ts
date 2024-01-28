export type Admin = {
  kerberos: string;

  password_hash: string;

  name: string;

  role: string;

  isManager: boolean;

  mess_ids: {
    name: string;
    capacity: number;
  }[];
};
