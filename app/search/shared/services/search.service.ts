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

    getWorkspaces(workspacename: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/workspaces?name=" + workspacename, {
            headers: headers
        })

    }

    getWorkspaceBranches(id: number) {

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/workspaces/" + id + "/branches", {
            headers: headers
        })
    }

    getBranch(bId: number, wId: number) {

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/workspaces/" + wId + "/branches/" + bId, {
            headers: headers
        })
    }

    getOrganization(organiztion: string) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/organizations?name=" + organiztion, {
            headers: headers
        })

    }

    getWorkspaceInfo(workspace: number) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/workspaces/" + workspace, {
            headers: headers
        })
    }

    getOrganizationInfo(organization: number) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/organizations/" + organization, {
            headers: headers
        })
    }

    getRooms(workspaceId: number, branchId: number) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");


        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/workspaces/" + workspaceId + "/branches/" + branchId + "/rooms", {
            headers: headers
        })
    }

    getWokshops(organization: number) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");

        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.get(this.baseUrl + "/api/organizations/" + organization + "/workshops", {
            headers: headers
        })
    }

    get_reviews_for_org(org_id:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.get(this.baseUrl + "/api/organizations/" + org_id +"/reviews", {
            headers: headers
        })

    }

    get_reviews_for_bra(w_id:number,b_id:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.get(this.baseUrl + "/api/workspaces/" + w_id +"/branches/"+ b_id +"/reviews", {
            headers: headers
        })

    }

    post_review_for_org(org_id: number,feedback:string,rating:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");

        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }
        let data ={
            feedback: feedback,
            rating: rating
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.post(this.baseUrl + "/api/organizations/" + org_id +"/reviews", data,{
            headers: headers
        })
    }


    post_review_for_bra(w_id: number,b_id: number  , feedback:string,rating:number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");

        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }
        let data ={
            feedback: feedback,
            rating: rating
        }

        //https://ccampus.herokuapp.com/api/branches
        return this.http.post(this.baseUrl + "/api/workspaces/" + w_id +"/branches/"+ b_id +"/reviews", data,{
            headers: headers
        })
    }

    subscribe(organizationId: number){
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("token-type", "Bearer");

        //the header part won't change at all in all incoming services
        //you can just copy and paste 
        //those headers are for verifiying the identity of the user on the server
        if (getString("userheaders", "none") != "none") {
            console.log("parsing ......");
            headers.append("access-token", JSON.parse(getString("userheaders", "none"))["Access-Token"]);
            headers.append("client", JSON.parse(getString("userheaders", "none")).Client);
            headers.append("uid", JSON.parse(getString("userheaders", "none")).Uid);
        }

        return this.http.post(this.baseUrl + "/api/organizations/" + organizationId +"/subscribe", {},{
            headers: headers
        })
    }

}
