export class Organization {
    id: number;
    name: string;
    about: string;

    imagelink: string;
    constructor(id: number, name: string, about: string, imageLink: string) {
        this.id = id;
        this.name = name;
        this.about = about + " University";

        if (imageLink == null)
            this.imagelink = "res://campus_logo_blue";
        else
            this.imagelink = imageLink;
    }
}