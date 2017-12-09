import { Injectable } from "@angular/core";
import { Workspace } from "../classes/workspaces"
//import { Organization } from "../classes/organization"
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { getString } from "tns-core-modules/application-settings/application-settings";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Injectable()
export class SearchService {
    
    private baseUrl = "https://ccampus.herokuapp.com";

    constructor(private http: Http) { }
    
    getWorkspaces(workspacename: string){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type","Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if(getString("userheaders","none")!="none"){
            console.log("parsing ......");
            headers.append("access-token", JSON.parse( getString("userheaders","none"))["Access-Token"]   ) ;
            headers.append("client", JSON.parse( getString("userheaders","none")).Client  );
            headers.append("uid", JSON.parse( getString("userheaders","none")).Uid );    
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl+"/api/workspaces?name="+ workspacename, {
            headers: headers
          })
     
    }

    getWorkspaceBranches(id: number){
     
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type","Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if(getString("userheaders","none")!="none"){
            console.log("parsing ......");
            headers.append("access-token", JSON.parse( getString("userheaders","none"))["Access-Token"]   ) ;
            headers.append("client", JSON.parse( getString("userheaders","none")).Client  );
            headers.append("uid", JSON.parse( getString("userheaders","none")).Uid );    
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl+"/api/workspaces/"+id+"/branches", {
            headers: headers
          })
    }

    getOrganization(organiztion: string){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type","Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if(getString("userheaders","none")!="none"){
            console.log("parsing ......");
            headers.append("access-token", JSON.parse( getString("userheaders","none"))["Access-Token"]   ) ;
            headers.append("client", JSON.parse( getString("userheaders","none")).Client  );
            headers.append("uid", JSON.parse( getString("userheaders","none")).Uid );    
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl+"/api/organizations?name="+ organiztion, {
            headers: headers
          })
     
    }

    getWorkspaceInfo(workspace: number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type","Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if(getString("userheaders","none")!="none"){
            console.log("parsing ......");
            headers.append("access-token", JSON.parse( getString("userheaders","none"))["Access-Token"]   ) ;
            headers.append("client", JSON.parse( getString("userheaders","none")).Client  );
            headers.append("uid", JSON.parse( getString("userheaders","none")).Uid );    
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl+"/api/workspaces/"+ workspace, {
            headers: headers
          })
    }

}
