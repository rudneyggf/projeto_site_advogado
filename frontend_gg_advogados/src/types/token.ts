
// interface utilizada para extrair informações do Token JWT gerado pelo backend
export interface Token {
  issuer: string;
  sub: string;
  authorities: string[]; // responsável pela criação da interface
  exp: string;
}
