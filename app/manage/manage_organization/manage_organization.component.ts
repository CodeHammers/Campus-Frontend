import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "../shared/services/manage.service"
import { Organization } from "../shared/classes/organization";
import { setString } from "tns-core-modules/application-settings/application-settings";
import { ActivatedRoute } from "@angular/router";
import * as imagepicker from "nativescript-imagepicker";




@Component({
    moduleId: module.id,
    templateUrl: "./manage_organization.component.html",
    providers: [ManageService],
    styleUrls: ["./manage_organization.component.css"]  
})
export class ManageOrganizationComponent implements OnInit {
    /* ****************************************1*******************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    manage_service: ManageService;
    org: Organization;


    constructor(private m_service: ManageService,private route: ActivatedRoute){
        this.manage_service = m_service;
        this.org = new Organization(0,"");
        
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/


    /*
    	
    id	17
    name	"ieee"
    description	null
    university	"cairo"
    logo	null
    phone	"0123456"
    email	"sad1@sad.com"
    event_schedule	null
    created_at	"2017-12-17T04:06:38.764Z"
    updated_at	"2017-12-17T04:06:38.764Z"
    
    
    */
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.org.id = this.route.snapshot.params["id"];

        console.log("this is how  you repay me!",this.org.id,"this is how you repay my love!")       
        this.manage_service.getOrganization(this.org.id)
        .subscribe((res)=>{
            console.log("retreived details successfully")
            console.log(JSON.stringify(res["_body"]))
            res = res["_body"]
            this.org.name = res["name"];
            this.org.university = res["university"];
            this.org.phone = res["phone"];
            this.org.email = res["email"];
            this.org.logo = res["logo"];
            this.org.desc = res["description"]
            console.log("logo is heeeeeeeeeeeeeeeeerr ::")
            console.log(this.org.logo)
            if(this.org.logo == ""||this.org.logo == null)
                this.org.logo = "res://icon"
            if(this.org.desc == ""||this.org.desc == null)
                this.org.desc = "Description Field is missing ,fill it please"

        },(error)=>{

        })        

    }
    updateOrganization(){
        this.manage_service.updateOrganization(this.org)
        .subscribe((data)=>{
            console.log("retreived update successfully")
            console.log(JSON.stringify(data))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }



        },(error)=>{
            console.log("shit happen")
            console.log(error)
        })    
        
    }
    browseForImage(){
        let self = this;
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        context
        .authorize()
        .then(function() {
            return context.present();
        })
        .then(function(selection) {
            selection.forEach(function(selected) {
                // process the selected image
                selected.getImage({ maxWidth: 200, maxHeight: 200, aspectRatio: 'fill' })
                .then((imageSource) => {
                    //console.log(imageSource.toBase64String("jpg"));
                    self.manage_service.saveImageToImgur(imageSource.toBase64String("jpg"))
                    .subscribe( (res)=>{
                        console.log("print link")
                        console.log( JSON.stringify( res.json()["data"]["link"]) );
                        self.org.logo =  res.json()["data"]["link"];
                    } )
                    //imageSrc.src = imageSource;
                });
            });
            //list.items = selection;
        }).catch(function (e) {
            // process error
        });

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
