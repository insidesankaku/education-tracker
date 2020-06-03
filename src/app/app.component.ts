import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'education-tracker';
  caption: string;
  isEditButtonShown: boolean;
  editButtonIcon = 'edit';

  constructor(private router: Router, private service: DataService) {
    this.router.events.subscribe((route :any) => {
      if (route.url) {
        this.isEditButtonShown = route.url.includes('subject');
        this.caption = route.url.includes('/subject/') ? route.url.replace('/subject/', '') : 'Education Tracker';
      } 
    });
  }

  edit() {
    this.service.emitEditTableEvent();
    this.toggleEditButtonIcon();
  }

  toggleEditButtonIcon() {
    this.editButtonIcon = this.editButtonIcon=== 'edit' ? 'done' : 'edit';
  }
}
