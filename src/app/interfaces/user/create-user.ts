export interface CreateUser {
  idUser: string;
  dni: string;
  firstname: string;
  lastname: string;
  status: string;
  credential: {
    username: string;
    password: string;
    role: string;
  };
}
