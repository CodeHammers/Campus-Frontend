import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { SearchWorkspaceRoutingModule } from "./search_workspace-routing.module";
import { SearchWorkspaceComponent } from "./search_workspace.component";

@NgModule({
    imports: [
        NativeScriptModule,
        SearchWorkspaceRoutingModule,
        SharedModule
    ],
    declarations: [
        SearchWorkspaceComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchWorkspaceModule { }
