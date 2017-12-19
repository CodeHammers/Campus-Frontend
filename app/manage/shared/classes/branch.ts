export class Branch {
    id: number;
    address : string;
    phone : string;
    number_of_rooms : number;
    email: string;
    logo: string;
    title: string;
    constructor(address: string,phone: string,number_of_rooms:number,id:number){
        this.address = address;
        this.phone = phone;
        this.number_of_rooms = number_of_rooms;
        this.id  = id;
    }

}

/*

	
0	
id	15
address	"Dokki, Giza, Egypt"
phone	"27856965"
1
*/