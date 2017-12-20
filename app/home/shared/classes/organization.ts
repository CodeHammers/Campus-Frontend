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
            this.imagelink = "http://cohenwoodworking.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg";
        else
            this.imagelink = imageLink;
    }
}