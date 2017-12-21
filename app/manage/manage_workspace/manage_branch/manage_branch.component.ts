import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ManageService } from "../../shared/services/manage.service"
import { setString, getString, getNumber } from "tns-core-modules/application-settings/application-settings";
import { Branch } from "../../shared/classes/branch";
import { Room } from "../../shared/classes/room"


import * as imagepicker from "nativescript-imagepicker";


@Component({
    moduleId: module.id,
    templateUrl: "./manage_branch.component.html",
    providers: [ManageService],
    styleUrls: ["./manage_branch.component.css"]  
})
export class ManageBranchComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    public manage_service : ManageService;
    public branch : Branch;
    public room : Room;
    public rooms : Array<Room>;

    avg_review: number;




    constructor(private m_service: ManageService){
        this.manage_service = m_service;
        this.branch = new Branch("","",1,1);
        this.room = new Room(null,null,"",1);
        this.rooms = [];
    }
    
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {


       

        this.manage_service.get_avg_rating_for_b(getNumber("bbb_id",0))
        .subscribe((res)=>{
            console.log("--------------------------------rrrrrrrr--------------------")
            console.log("retreived Count successfully")
            console.log(JSON.stringify(res))
            this.avg_review = res["_body"]["count"]
            console.log("recieved avg rating")
            if(this.avg_review==null)
               this.avg_review=10
        },(error)=>{
            console.log("--------------------------------rrrrrrrr--------------------")
            
            console.log(error)
        })       
        
  
        console.log("reached branch")
        console.log(getNumber("bbb_id",0));

        console.log(getNumber("b_id",0));


        this.manage_service.get_branch(    getNumber("bbb_id",0) ,  getNumber("b_id",0)  )
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("branch retrieved")
            
            data = data["_body"]
            this.branch.address = data["address"];
            this.branch.email = data["email"];
            this.branch.number_of_rooms = data["number_of_rooms"]
            this.branch.id  = data["id"]
            this.branch.phone = data["phone"]
            this.branch.title  = data["title"]
            
            console.log(this.branch.logo)
            if(this.branch.logo == ""||this.branch.logo == null)
                this.branch.logo = "res://icon"

        }, (error) => {
            console.log("shit happen !");
             console.log(error);
        });


        this.manage_service.get_rooms_for_branch(getNumber("b_id",0),getNumber("bbb_id"))
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("rooms retrieved")
            data["_body"].forEach((org) => {
                console.log("printing elements")                
                console.log( JSON.stringify( org ) )
                this.rooms.push( new Room(org.capacity,org.price,org.services,org.id) ); 
            });
      
        }, (error) => {
            console.log("shit happen !");
             console.log(error);
        });
        
 
    }

    update_branch(){
        this.manage_service.update_branch(this.branch,getNumber("b_id",0) )
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("branch updated")
            
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
        

        }, (error) => {
            let data = error;
            console.log("shit happen !");
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
             console.log(error);
        });
    }

    createRoom(){
        this.manage_service.post_room(getNumber("b_id",0),getNumber("bbb_id"),this.room)
        .subscribe((data) => {
            console.log(JSON.stringify(data));
            //token exhange 
            //if new token introduced ,update my token
            console.log("rooom created")
            
            console.log( data.headers.get("Access-Token"))
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
        

        }, (error) => {
            let data = error;
            console.log("shit happen !");
            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                console.log("update token");
                console.log(JSON.stringify( data.headers ) )
                setString("userheaders",JSON.stringify(data.headers));                
            }
            console.log(error);
        });
    }

    addImageToRoom(id:number){
        this.browseForImage(id);
        
    }


    browseForImage(id :number){
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
                    console.log(self);
                    self.manage_service.saveImageToImgur(imageSource.toBase64String("jpg"))
                    .subscribe( (res)=>{
                        console.log(JSON.stringify(res["_body"]["data"]));
                        self.manage_service.post_room_image(getNumber("bbb_id"),getNumber("b_id",0),id,res["_body"]["data"].link)
                        .subscribe((data) => {
                            console.log(JSON.stringify(data));
                            //token exhange 
                            //if new token introduced ,update my token
                            console.log("image added")
                            
                            console.log( data.headers.get("Access-Token"))
                            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                                console.log("update token");
                                console.log(JSON.stringify( data.headers ) )
                                setString("userheaders",JSON.stringify(data.headers));                
                            }
                        
                
                        }, (error) => {
                            let data = error;
                            console.log("shit happen !");
                            if(data.headers.get("Access-Token")!=undefined && data.headers.get("Access-Token")!=null && data.headers.get("Access-Token")!=""  ){
                                console.log("update token");
                                console.log(JSON.stringify( data.headers ) )
                                setString("userheaders",JSON.stringify(data.headers));                
                            }
                            console.log(error);
                        });




                        
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
