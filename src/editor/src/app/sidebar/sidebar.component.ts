import { Component, OnInit, Input } from '@angular/core';
import { Lyric } from "../../../../types/lyric"

@Component({
	selector: 'Sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input()
	menu: Lyric[] = []

	constructor() { }

	ngOnInit(): void {
	}

}
