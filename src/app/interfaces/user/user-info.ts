export interface UserInfo {
  idUser: string;
  dni: string;
  firstname: string;
  lastname: string;
  status: string;
  credential: {
    username: string;
    role: string;
  };
}
