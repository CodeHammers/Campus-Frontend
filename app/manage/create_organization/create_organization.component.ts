import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "../shared/services/manage.service"
import * as imagepicker from "nativescript-imagepicker";
import { Organization } from "../shared/classes/organization";
import { setString, getString } from "tns-core-modules/application-settings/application-settings";
import { RouterExtensions, PageRoute } from "nativescript-angular/router";
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";




@Component({
    moduleId: module.id,
    templateUrl: "./create_organization.component.html",
    providers: [ManageService],
    styleUrls: ["./create_organization.component.css"]  
})
export class CreateOrganizationComponent implements OnInit {
    /* ****************************************1*******************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    public manage_service: ManageService;
    public unives: Array<string>;
    public org : Organization;
    
    constructor(private ms: ManageService,private routerExtensions: RouterExtensions){
        this.manage_service =  ms;
        this.unives = ["Cairo","Helwan","Ain Shams","Mataria","Assuit","10th ramadan","octobor","etc"];
        this.org = new Organization(0,"");
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    

    
    browseForImage(){
        this.showSimple("processing your image ,please wait")
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
                        self.showSimple("processing finsihed")
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
    /// Show a simple snackbar with no actions
    showSimple(msg: string) {
        // Create an instance of SnackBar
        let snackbar = new SnackBar();
        snackbar.simple(msg, 'white', '#222').then((args) => {
                //this.set('jsonResult', JSON.stringify(args));
        })
    }

    createOrganization(){
        console.log( JSON.stringify( this.org ) )
        
  
        this.manage_service.createOrganization(this.org)
        .subscribe((data) => {
            console.log( JSON.stringify( data) );
            this.showSimple("Organization Created!")
            console.log("success")
            //token exhange 
            //if new token introduced ,update my token
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!="" ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            this.routerExtensions.navigate(["manage"]);            

        }, (error) => {
        
            this.showSimple("Your data is Invalid ,please consider a review");
            console.log("shit happen !");
            console.log( JSON.stringify( error ) );
        });
        
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
