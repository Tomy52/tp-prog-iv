import {AuthRequest} from './auth-request';

export interface UserData {
  dni: string;
  firstname: string;
  lastname: string;
  credential: AuthRequest;
}
