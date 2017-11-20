import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { SearchWorkspaceRoutingModule } from "./search_workspace-routing.module";

import { SearchWorkspaceComponent } from "./search_workspace.component";
import { WorkspaceDetailComponent } from "./workspace_detail/workspace_detail.component"

import { NativeScriptHttpModule } from "nativescript-angular/http";


@NgModule({
    imports: [
        NativeScriptModule,
        SearchWorkspaceRoutingModule,
        SharedModule,
        NativeScriptHttpModule
    ],
    declarations: [
        SearchWorkspaceComponent,
        WorkspaceDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchWorkspaceModule { }
