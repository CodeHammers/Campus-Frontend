export class Branch {
    id: number;
    address: string;

    imagelink: string;
    numberRooms: number;
    phone: string;
    email: string;

    constructor(id: number, address: string) {
        this.id = id;
        this.address = address;
    }

    setAll( imagelink: string, numberRooms: number, phone: string, email: string) {
        if (imagelink == null)
            this.imagelink = "res://campus_logo_blue";
        else
            this.imagelink = imagelink;

        this.numberRooms = numberRooms;
        this.phone = phone;
        this.email = email;
    }
}