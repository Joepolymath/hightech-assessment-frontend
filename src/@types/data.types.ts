export interface ISideBarItem {
  id: number;
  name: string;
  isActive?: boolean;
}

export interface IEmail {
  id: number;
  image: string;
  from?: string;
  time?: string;
  subject: string;
  body: string;
  hasAttachment?: boolean;
  isSelected?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
}
