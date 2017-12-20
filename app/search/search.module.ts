import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";

import { SearchComponent } from "./search.component"
import { WorkspaceComponent } from "./workspace/workspace.component"
import { OrganizationComponent } from "./organization/organization.component"
import { BranchComponent } from "./branch/branch.component"

import { NativeScriptHttpModule } from "nativescript-angular/http";

import {NativeScriptFormsModule} from "nativescript-angular/forms"


@NgModule({
    imports: [
        NativeScriptModule,
        SharedModule,
        NativeScriptHttpModule,
        SearchRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SearchComponent,
        WorkspaceComponent,
        BranchComponent,
        OrganizationComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
