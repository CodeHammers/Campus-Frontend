import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "../shared/services/manage.service"
import { setString, getString, getNumber, setNumber } from "tns-core-modules/application-settings/application-settings";

import { Branch } from "../shared/classes/branch"


@Component({
    moduleId: module.id,
    templateUrl: "./manage_workspace.component.html",
    providers: [ManageService],
    styleUrls: ["./manage_workspace.component.css"]  
})
export class ManageWorkspaceComponent implements OnInit {
    /* ****************************************1*******************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    public branches: Array<Branch>;
    public manage_service : ManageService;
    public branch : Branch;
    constructor(private m_service: ManageService){
        this.manage_service = m_service;
        this.branch = new Branch("","",1,1)
        this.branches = [];
    }
    
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.manage_service.get_all_branches(getNumber("b_id",0))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            console.log("branches fetched")


            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }


            data["_body"].forEach((org) => {
                console.log("printing elements")                
                console.log( JSON.stringify( org ) )
                this.branches.push( new Branch(org.address,org.phone,org.number_of_rooms,org.id) ); 
            });

        }, (error) => {
            let  data =error;
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            console.log("shit happen !");
             console.log(error);
        });

    }

    postBranch(){
        console.log("sending branch");
        console.log(getNumber("b_id",0))
        this.manage_service.postBranch(this.branch,getNumber("b_id",0))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("branches Saved Success")

            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            

        }, (error) => {
            console.log("shit happen !");
            console.log(getString("userheaders","none"))
            setString("userheaders","none");
             console.log(error);
        });



    }


    saveData(id: number){
        console.log("saving data to branch")
        setNumber("bbb_id",id)
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
