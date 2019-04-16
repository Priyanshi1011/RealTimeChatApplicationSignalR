export interface IUser {

  Id: number;
  UserName: string;
 
}


export class User implements IUser {
  constructor(
  ) {
    
  }

 public  Id: number;
  public UserName: string;
  public Password: string;
  public connId: string;
  public Connected: boolean;
  public count: number=0;
}
