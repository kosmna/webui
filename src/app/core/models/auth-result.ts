import { AppLicense } from './app-license';

export class AuthResult {
  jwtAccess: string;
  jwtRefresh: string;
  license?: AppLicense;
  mustChangePassword?: boolean;
  mustAcceptEULA?: boolean;
}
