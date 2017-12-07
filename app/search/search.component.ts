import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Workspace } from "./shared/classes/workspaces";

import { SearchService } from "./shared/services/search.service"

@Component({
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.css"],
    providers: [SearchService]
})

export class SearchComponent implements OnInit {

    public workspaces: Array<Workspace>;
    public search_service: SearchService;

    //public items: Array<>;

    /* ***********************************************************
* Use the @ViewChild decorator to get a reference to the drawer component.
* It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
*************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {

        console.log("ngInit started");

        console.log("Changes Happened");

        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.search_service.getWorkingSpaces().subscribe((res) => {

            //res.json().forEach((workspace) => {
            //    console.log(JSON.stringify(workspace));

            //On adding this line there is an error happen of course
            //this.workspaces.push(new Workspace(workspace.id, "Test", "Great"));
            //  console.log("Bassel test");
            //});

            console.log("Got the JSON");
            console.log(JSON.stringify(res));
            
            console.log("started entering aray of results");
            
            res.Result.forEach((workspace) => {
                console.log(workspace.id);
                this.workspaces.push(new Workspace(workspace.id, workspace.address, workspace.address));
                console.log(workspace.address);
            });

            console.log("Retreived !");
            //return this.items;

        }, (error) => {

            console.log("SHIT HAS HAPPANED !!!!!!!!!!");

            this.workspaces = [new Workspace(1, "Ebda3", " great "), new Workspace(2, "El madrsa", "not bad")];

        });
    }

    constructor(private ss: SearchService) {
        this.search_service = ss;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}