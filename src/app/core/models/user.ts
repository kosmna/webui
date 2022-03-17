export class User {
  id?: string;
  username: string;
  password?: string;
  passwordConfirmation?: string;
  firstName: string;
  lastName: string;
  mustChangePassword?: boolean;
  mustAcceptEULA?: boolean;
  roles?: any[];
  disabled?: boolean;
  userId: string;
}

export interface UserRole {
  id: string;
  name: string;
}

export class SetupUser {
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  mustChangePassword?: boolean;
  roles: string[];
}

export interface UserChangePwd {
  currentPassword: string;
  newPassword: string;
}
