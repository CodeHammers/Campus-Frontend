export class Room {

    id: number;
    price: number;
    availability: boolean;
    capacity: number;
    services: string;
    branch_id: number;

    constructor(id: number) {
        this.id = id;
    }

    setAll(availability: boolean, price: number, capacity: number, services: string) {
        this.availability = availability;
        this.price = price;
        this.capacity = capacity;
        this.services = services;
    }
}