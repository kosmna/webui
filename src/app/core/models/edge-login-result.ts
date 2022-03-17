import { LoginResult } from './login-result';

export class EdgeLoginResult implements LoginResult {
  success: boolean;
  mustChangePassword: boolean;
  mustAcceptEULA?: boolean;
}
