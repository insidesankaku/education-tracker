import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  editSubjectTable = new BehaviorSubject(false);
  isTableEditable = false;

  constructor() { }

  emitEditTableEvent() {
    this.isTableEditable = !this.isTableEditable;

    this.editSubjectTable.next(this.isTableEditable);
  }
}
