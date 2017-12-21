import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ActivatedRoute } from "@angular/router";


import { SearchService } from "../shared/services/search.service"
import { Branch } from "../shared/classes/branch"
import { Room } from "../shared/classes/room";
import { getNumber, setString } from "tns-core-modules/application-settings/application-settings";

import { Review  } from "../shared/classes/review"

import { SnackBar, SnackBarOptions } from "nativescript-snackbar";


@Component({
    moduleId: module.id,
    templateUrl: "./branch.component.html",
    styleUrls: ["./branch.component.css"],
    providers: [SearchService]
})

export class BranchComponent implements OnInit {

    public rating : number;
    public search_service: SearchService;
    public loading_data: boolean;
    public branch_id: number;
    public workspace_id: number;

    public branch: Branch;
    public reviews : Array<Review>;
    
    public rooms: Array<Room>;


    public feedback: string;

    
    /// Show a simple snackbar with no actions
    showSimple(msg: string) {
        // Create an instance of SnackBar
        let snackbar = new SnackBar();
        snackbar.simple(msg, 'white', '#222').then((args) => {
                //this.set('jsonResult', JSON.stringify(args));
        })
    }

    post_review_for_org(){
        console.log(this.rating)
        this.search_service.post_review_for_bra(this.workspace_id,this.branch_id,this.feedback,this.rating)
        .subscribe((res) => {
            let data = res;
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            this.showSimple("Review Posted")
            console.log(JSON.stringify(res) );
            console.log("reveiw granted")
        }, (error) => {
            this.showSimple("Something Went Wrong")
            let data = error;
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            console.log(" Network Went Down ")
            console.log(error)
        });
    }
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
        this.workspace_id = getNumber("current_w",this.route.snapshot.params["workspace_id"])
        
        this.branch_id =  getNumber("current_b",this.route.snapshot.params["id"])

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




        this.search_service.get_reviews_for_bra(this.workspace_id,this.branch_id)
        .subscribe((res) => {
            this.reviews=[];
            console.log(JSON.stringify(res))
            console.log("<<<------------------------Reviews In Search -------------------------->>>")
            res["_body"].forEach((review) => {
                console.log("in loop")
                console.log(JSON.stringify(review));
                this.reviews.push(new Review(review.feedback,review.rating,review.name,review.image))
                
                //this.workshops.push(new Workshop(workshop.id, workshop.title, workshop.description, workshop.date, workshop.time));
            });
            console.log(this.reviews.length)
            console.log("<<<------------------------Reviews In Search -------------------------->>>")            

        }, (error) => {
            console.log(" Network Went Down ")
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