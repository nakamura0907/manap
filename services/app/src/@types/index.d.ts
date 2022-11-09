interface ExpressRequestUser {
  id: number;
}
declare namespace Express {
  export interface Request {
    user?: ExpressRequestUser;
  }
}
