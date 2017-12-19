export class Workshop {
    
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;

    constructor(id: number, title: string, description: string, date: string, time: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
    }
}