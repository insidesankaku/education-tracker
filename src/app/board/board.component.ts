import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  subjects = [
    'Physics',
    'Chemistry',
    'Biology',
    'Mathematics',
    'English',
    'Geography',
    'History',
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
