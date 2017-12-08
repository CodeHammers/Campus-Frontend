import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { SearchService } from "../shared/services/search.service"
import { Branch } from "../shared/classes/branch"

@Component({
    moduleId: module.id,
    templateUrl: "./workspace.component.html",
    styleUrls: ["./workspace.component.css"],
    providers: [SearchService]
})

export class WorkspaceComponent implements OnInit {


public branches : Array<Branch>;
public search_service : SearchService;
public loading_data : boolean;
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
        this.search_service.getWorkspaceBranches(1)
        .subscribe((res) => {
            this.loading_data=false;
            this.branches =[];
            console.log(JSON.stringify(res["_body"]));

            console.log("started entering aray of results");

            res["_body"].forEach((branch) => {
                console.log("in loop")
                console.log(JSON.stringify(branch));
                this.branches.push(new Branch(branch.id, branch.address));
            });

            console.log("Retreived !");

        }, (error) => {
            console.log(" Network Went Down ")

        });
        //console.log("Changes Happened");

        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    constructor(private ss: SearchService) {
       this.branches=[];
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