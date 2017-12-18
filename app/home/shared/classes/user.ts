export class User{
    token: number;
    email: string;
    password: string;
    logo: string;
    constructor(mail: string,password: string){
        this.password = password;
        this.email = mail;
    }
}