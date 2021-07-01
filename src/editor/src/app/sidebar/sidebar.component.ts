import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Lyric } from "../../../../types/lyric"

@Component({
	selector: 'Sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	@Input()
	menu: Lyric[] = []

	activeTab = "lyrics"

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	createNew() {
		this.router.navigate(['/editor', 'new'])
	}

	navigateTab(destination: string) {
		this.activeTab = destination
	}

}
