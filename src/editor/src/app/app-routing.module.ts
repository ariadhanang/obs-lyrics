import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from "./editor/editor.component"
import { RemoteComponent } from "./remote/remote.component"

const routes: Routes = [
	{ path: "editor", component: EditorComponent },
	{ path: "editor/:id", component: EditorComponent },
	{ path: "remote", component: RemoteComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
