import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'SidebarMenuItem',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.scss']
})
export class SidebarMenuItemComponent implements OnInit {

  @Input() _id = ""
  @Input() label = ""

  constructor() { }

  ngOnInit(): void {
  }

}
