export interface Token {
  issuer: string;
  sub: string;
  authorities: string[];
  exp: string;
}
