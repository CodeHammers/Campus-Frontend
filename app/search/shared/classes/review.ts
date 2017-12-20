export class Review {
    feedback:string
    rating: number
    username: string
    userimage: string

    constructor(f : string, r:number,u:string , ui:string) {
        this.feedback = f;
        this.rating = r;
        this.userimage = ui;
        this.username = u;
        if(this.userimage == null)
            this.userimage = "https://avatars0.githubusercontent.com/u/26489087?s=400&v=4";
    }

}