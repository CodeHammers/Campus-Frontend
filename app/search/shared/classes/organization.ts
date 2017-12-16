export class Organization {
    id: number;
    name: string;
    about: string;

    email: string;
    phone: string;

    description: string;

    imagelink: string;
    constructor(id: number, name: string, university: string, description: string, imageLink: string) {
        this.id = id;
        this.name = name;
        this.about = university + " University";

        this.description = description;

        if (imageLink == null)
            this.imagelink = "res://campus_logo_blue";
        else
            this.imagelink = imageLink;
    }
}