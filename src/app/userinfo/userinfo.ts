import { SimpleDisk }  from '../disk/disk';

export class Userinfo {
  admin?: boolean;
  borrow_history?: SimpleDisk[];
  borrowed?: SimpleDisk[];
  reserved?: SimpleDisk[];
  expire_at?: string;
  full_name?: string;
  id?: number;
  itsc?: string;
  join_at?: string;
  login_count?: number;
  member_type?: string;
  moblie?: string;
  penalized?: boolean;
  rfs_count?: number;
  student_id?: string;
  this_login?: string;
  last_login?: string;
  university_id?: string;
  errno?: number;
  error?: string;
  mobile?:string;
  pennalized?: boolean;
};

export const MEMBERSHIP_TABLE = {
    Full: 'Full Member',
    OneSem: 'One Semester Member',
    OneYear: 'One Year Member',
    TwoYear: 'Two Year Member',
    ThreeYear: 'Three Year Member',
    Honour: 'Honour Member',
    Assoc: 'Asscocitate Member',
  };
