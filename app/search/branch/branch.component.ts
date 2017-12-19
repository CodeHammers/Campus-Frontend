import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ActivatedRoute } from "@angular/router";


import { SearchService } from "../shared/services/search.service"
import { Branch } from "../shared/classes/branch"
import { Room } from "../shared/classes/room";

@Component({
    moduleId: module.id,
    templateUrl: "./branch.component.html",
    styleUrls: ["./branch.component.css"],
    providers: [SearchService]
})

export class BranchComponent implements OnInit {


    public search_service: SearchService;
    public loading_data: boolean;
    public branch_id: number;
    public workspace_id: number;

    public branch: Branch;

    public rooms: Array<Room>;
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
        this.workspace_id = this.route.snapshot.params["workspace_id"];

        console.log("ngInit started");

        //console.log("Changes Happened");

        this.ss.getBranch(this.branch_id, this.workspace_id)
            .subscribe((res) => {

                console.log(JSON.stringify(res["_body"]));
                this.branch = new Branch(res["_body"].id, res["_body"].address);
                this.branch.setAll(res["_body"].photos, res["_body"].number_of_rooms, res["_body"].phone, res["_body"].email);

            }, (error) => {
                console.log("Error in branch happaned");
            });

        this.ss.getRooms(this.workspace_id ,this.branch_id)
            .subscribe((res) => {

                this.rooms = [];

                console.log(JSON.stringify(res["_body"]));

                res["_body"].forEach((room) => {
                    console.log("in loop")
                    console.log(JSON.stringify(room));

                    console.log(this.branch_id, this.workspace_id);

                    let r = new Room(room.id);
                    r.setAll(room.availability, room.price, room.capacity, room.services);

                    this.rooms.push(r);
                });

            }, (error) => {
                console.log("Error in branch happaned");
            });

        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    constructor(private ss: SearchService, private route: ActivatedRoute) {
        this.search_service = ss;
        this.loading_data = false;
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