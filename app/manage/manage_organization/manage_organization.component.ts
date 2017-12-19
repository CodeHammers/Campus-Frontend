import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "../shared/services/manage.service"
import { Organization } from "../shared/classes/organization";
import { setString, getNumber, getString } from "tns-core-modules/application-settings/application-settings";
import { ActivatedRoute } from "@angular/router";
import * as imagepicker from "nativescript-imagepicker";
import { Workshop } from "../shared/classes/workshop";
import { Manager } from "../shared/classes/manager"
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";
import  { Event  } from "../shared/classes/event"



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
    workshops: Array<Workshop>
    events: Array<Event>
    newWorkshop: Workshop;
    newEvent : Event;
    public managers: Array<Manager>
    email: string;

    constructor(private m_service: ManageService,private route: ActivatedRoute){
        this.manage_service = m_service;
        this.org = new Organization(0,"");
        this.workshops = []
        this.newWorkshop  = new Workshop("","",1)
        this.managers = []
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/




    deleteWorkshop(id: number){
        this.manage_service.delete_workshop(id,getNumber("sp_id",0))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("delete granted")
            console.log("workshops Saved Success")
            
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }

        }, (error) => {

            let data = error;
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

    grantAccess(){
        this.manage_service.grant_user_org(this.email, getNumber("sp_id",0))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("Accesss granted")
                        

        }, (error) => {
            console.log("shit happen !");
             console.log(error);
        });
    }


    onPickerLoadede(args) {
        let datePicker = <DatePicker>args.object;

        datePicker.year = 1980;
        datePicker.month = 2;
        datePicker.day = 9;
        datePicker.minDate = new Date(2017, 12, 18);
        datePicker.maxDate = new Date(2045, 4, 12);
    }

    onDateChangede(args) {
        console.log("Date changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
        this.newEvent.date = args.value;
    }


    onPickerLoaded(args) {
        let datePicker = <DatePicker>args.object;

        datePicker.year = 1980;
        datePicker.month = 2;
        datePicker.day = 9;
        datePicker.minDate = new Date(2017, 12, 18);
        datePicker.maxDate = new Date(2045, 4, 12);
    }

    onDateChanged(args) {
        console.log("Date changed");
        console.log("New value: " + args.value);
        console.log("Old value: " + args.oldValue);
        this.newWorkshop.date = args.value;
    }

    AddEvent(){
        console.log("adding Event")
        console.log(this.newEvent.title)
        console.log(this.newEvent.date)
        console.log(this.newEvent.description)

        this.manage_service.postWorkshop(this.newEvent,  getNumber("sp_id",0))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("workshops Saved Success")

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



    AddWorkshop(){
        console.log("adding workshop")
        console.log(this.newWorkshop.title)
        console.log(this.newWorkshop.date)
        console.log(this.newWorkshop.description)

        this.manage_service.postWorkshop(this.newWorkshop,  getNumber("sp_id",0))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("workshops Saved Success")

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
        let id = +this.route.snapshot.params["id"];
        id=  getNumber("sp_id",0)
        //console.log("this is how  you repay me!",id,"this is how you repay my love!")       
        this.manage_service.getOrganization(id)
        .subscribe((res)=>{
            console.log("retreived details successfully")
            res = res["_body"]
            console.log(JSON.stringify(res))            
            console.log()            
            this.org.name = res["name"];
            this.org.university = res["university"];
            this.org.phone = res["phone"];
            this.org.email = res["email"];
            this.org.logo = res["logo"];
            this.org.desc = res["description"]
            this.org.id = res["id"];
            console.log("logo is heeeeeeeeeeeeeeeeerr ::")
            console.log(this.org.logo)
            if(this.org.logo == ""||this.org.logo == null)
                this.org.logo = "res://icon"
            if(this.org.desc == ""||this.org.desc == null)
                this.org.desc = "Description Field is missing ,fill it please"

        },(error)=>{

        })        


        this.manage_service.getWorkshopsForOrganization(  getNumber("sp_id",0) )
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("workshops came")
            
   
            data["_body"].forEach((w) => {
                console.log("printing elements")
                console.log( JSON.stringify( w )    )
                this.workshops.push( new Workshop(w.title,w.date,w.id) ); 

            });
        }, (error) => {
            console.log("shit happen !");
             console.log(error);
        });




        this.manage_service.getEventsForOrganization(  getNumber("sp_id",0) )
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("workshops came")
            
        
            data["_body"].forEach((w) => {
                console.log("printing elements")
                console.log( JSON.stringify( w )    )
                this.events.push( new Event(w.title,w.date,w.id) ); 

            });
        }, (error) => {
            console.log("shit happen !");
          
             console.log(error);
        });



        this.manage_service.get_all_staff_in_org(  getNumber("sp_id",0) )
        .subscribe((data) => {
            console.log(JSON.stringify(data["_body"]));

            console.log("users came ")

            data["_body"].forEach((w) => {
                console.log("printing elements")
                console.log( JSON.stringify(w))
                this.managers.push( new Manager(w.id,w.name,w.email) ); 

            });
            console.log(this.managers.length)
        }, (error) => {
            console.log("shit happen !");
             console.log(error);
        });



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
