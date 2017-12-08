export class Branch {
    id: number;
    address: string;

    imagelink: string;
    constructor(id: number,address: string){
        this.id = id;
        this.address = address;

        this.imagelink = "res://campus_logo_blue";
    }
}