import { Injectable } from "@angular/core";
import { Workspace } from "../classes/workspaces";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Injectable()
export class SearchService {
    public items: Array<Workspace>;
    
    private baseUrl = "https://ccampus.herokuapp.com/api/branches";


    constructor(private http: Http) { }
    
    getOrganizations(){
        
        let headers = this.createRequestHeader();
        
        return this.http.get(this.baseUrl , {
            headers: headers
          })
          .map(res => res.json())
          /*
          .map(data => {
            //data.Result.forEach((workspace) => {
              //  this.items.push( new Workspace(workspace.id,workspace.name) ); 
            //});
            console.log("Retreived !");
            return this.items;
          })
          .catch(
            function(error: Response){
                console.log("shit happen !");
                this.items = [ new Workspace(1,"Ebda3"),new Workspace(2,"El madrsa") ];
                return this.items;
            }
          )
          */
    }

    getWorkingSpaces( ) {

        console.log("service called");
        
        let headers = this.createRequestHeader();
        
        return this.http.get(this.baseUrl , {
            headers: headers
          })
        .map(res => res.json())
    }

    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");

        return headers;
    }
}
