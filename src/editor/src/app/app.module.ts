import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuItemComponent } from './sidebar-menu-item/sidebar-menu-item.component';
import { EditorComponent } from './editor/editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RemoteComponent } from './remote/remote.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarMenuItemComponent,
    EditorComponent,
    RemoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
