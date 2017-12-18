export class Workshop {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    constructor(title: string,date: string,id:number){
        this.title = title;
        this.date = date;
        this.id = id;
    }

}
    /*
    
    id	10
    title	"3D printing FTW!"
    description	"3D print anything"
    date	"2018-05-30"
    time	"12:15:00"
    */