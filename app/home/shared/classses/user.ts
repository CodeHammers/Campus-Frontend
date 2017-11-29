export class User{
    token: number;
    email: string;
    constructor(tkn: number,ml: string){
        this.token = tkn;
        this.email = ml;
    }
}