export class MenuItem {
  name: string;
  icon: string;
  route: string;
  subItems: MenuItem[];
  expectedRoles?: string;
}
