import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ActivatedRoute } from "@angular/router";


import { SearchService } from "../shared/services/search.service"
import { Branch } from "../shared/classes/branch"

@Component({
    moduleId: module.id,
    templateUrl: "./branch.component.html",
    styleUrls: ["./branch.component.css"],
    providers: [SearchService]
})

export class BranchComponent implements OnInit {


public search_service : SearchService;
public loading_data : boolean;
public branch_id : number;
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
        this.branch_id = this.route.snapshot.params["id"];        
        console.log("ngInit started");
   
        //console.log("Changes Happened");

        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    constructor(private ss: SearchService, private route: ActivatedRoute) {
        this.search_service = ss;
        this.loading_data =false;
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