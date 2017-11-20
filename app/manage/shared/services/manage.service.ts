import { Injectable } from "@angular/core";
import {Workspace } from "../classes/workspace"
import {Organization } from "../classes/organization"

import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Rx";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";


@Injectable()
export class ManageService {
    public workspaces: Array<Workspace>;
    public organizations: Array<Workspace>;
    
    private baseUrl = "https://httpbin.org/get/6565";


    constructor(private http: Http) { }
    
    getManagedWorkspaces(){
        
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


    getManagedOrganizations(){
        
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


    getManagedWorkspace(id: number) {
        let headers = this.createRequestHeader();
        
        return this.http.get(this.baseUrl , {
            headers: headers
          })
          .map(res => res.json())
    }   


    getManagedOrganization(id: number) {
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
