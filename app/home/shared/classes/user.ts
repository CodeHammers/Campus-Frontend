export class User{
    token: number;
    email: string;
    password: string;
    constructor(mail: string,password: string){
        this.password = password;
        this.email = mail;
    }
}