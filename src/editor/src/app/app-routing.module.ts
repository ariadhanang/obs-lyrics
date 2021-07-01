import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from "./editor/editor.component"

const routes: Routes = [
	{ path: "editor", component: EditorComponent },
	{ path: "editor/:id", component: EditorComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
