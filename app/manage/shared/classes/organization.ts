export class Organization {
    id: number;
    name: string;
    logo: string;
    desc: string;
    phone: string;
    email: string;
    university: string;
    constructor(id: number,name: string){
        this.id = id;
        this.name = name;
    }

}
