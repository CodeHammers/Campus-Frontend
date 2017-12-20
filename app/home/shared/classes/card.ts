export class Card {

    userName: string;
    actionName: string;

    imageLink: string;

    constructor(userName: string, actionName: string, imageLink: string) {
        this.userName = userName;
        this.actionName = actionName;

        if (imageLink == null)
            this.imageLink = "res://campus_logo_blue";
        else
            this.imageLink = imageLink;
    }

}