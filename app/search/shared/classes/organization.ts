export class Organization {
    id: number;
    name: string;
    about: string;

    imagelink: string;
    constructor(id: number,name: string, about: string){
        this.id = id;
        this.name = name;
        this.about = about;

        this.imagelink = "res://campus_logo_blue";
    }
}