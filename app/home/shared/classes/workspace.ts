export class Workspace{

    id: number;
    name: string;
    about: string;
    imagelink: string;
    constructor(id :number,name:string,about:string){
        this.id = id
        this.name = name;
        this.about  = about;
        this.imagelink ="http://cohenwoodworking.com/wp-content/uploads/2016/09/image-placeholder-500x500.jpg";
    }
}