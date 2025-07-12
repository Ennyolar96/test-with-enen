import { User } from '@prisma/client';

export interface Authentication extends User {}
export interface register
  extends Pick<Authentication, 'email' | 'fullName' | 'password'> {}

export interface login extends Pick<Authentication, 'email' | 'password'> {}
export interface verifyEmail {
  token: string;
}
