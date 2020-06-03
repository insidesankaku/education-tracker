import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { SelectionModel } from '@angular/cdk/collections';

let SUBJECT_DATA = [
  {
    position: 1,
    studentName: 'Steve Rogers',
    academicYear: '2020/21',
    learningStyles: 'V',
    class_form: 'Class 1',
    previousFormAverage: 35,
    forces: 78,
    density: 89,
    electricity: 34,
    average: 88
  },
  {
    position: 2,
    studentName: 'Tony Stark',
    academicYear: '2020/21',
    learningStyles: 'A',
    class_form: 'Class 1',
    previousFormAverage: 99,
    forces: 99,
    density: 99,
    electricity: 99,
    average: 99
  },
  {
    position: 3,
    studentName: 'Bruce Banner',
    academicYear: '2020/21',
    learningStyles: 'V',
    class_form: 'Class 1',
    previousFormAverage: 100,
    forces: 100,
    density: 100,
    electricity: 100,
    average: 100
  },
  {
    position: 4,
    studentName: 'Nick Fury',
    academicYear: '2020/21',
    learningStyles: 'V & K',
    class_form: 'Class 1',
    previousFormAverage: 55,
    forces: 64,
    density: 78,
    electricity: 56,
    average: 34
  },
  {
    position: 4,
    studentName: 'Natasha Romanoff',
    academicYear: '2020/21',
    learningStyles: 'V & A',
    class_form: 'Class 1',
    previousFormAverage: 100,
    forces: 45,
    density: 65,
    electricity: 23,
    average: 55
  },
];

const LEARNING_STYLES = [
'V',
'A',
'K',
'V & A',
'V & K',
'A & K',
]

const ACADEMIC_YEARS = [
'2020/21',
'2021/22',
'2022/23',
'2023/24',
'2024/25',
'2025/26',
'2026/27',
'2027/28',
'2028/29',
'2029/30',
'2030/31',
'2031/32',
'2032/33',
'2033/34',
'2034/35',
'2035/36',
'2036/37',
'2037/38',
'2038/39',
'2039/40',
'2040/41',
'2041/42',
'2042/43',
'2043/44',
'2044/45',
]

const CLASS_FORM = [
'Class 1',
'Class 2',
'Class 3',
'Class 4',
'Class 5',
'Class 6',
'JHS 1',
'JHS 2',
'JHS 3',
'SHS 1',
'SHS 2',
'SHS 3',
]

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  displayedColumns: string[] = ['position', 'studentName', 'academicYear', 'learningStyles', 'class_form', 'previousFormAverage', 'forces', 'density', 'electricity', 'average'];
  learningStyles: string[] = LEARNING_STYLES;
  academicYears: string[] = ACADEMIC_YEARS;
  class_form: string[] = CLASS_FORM;
  dataSource = new MatTableDataSource(SUBJECT_DATA);
  selection = new SelectionModel<any>(true, []);
  isTableEditable: boolean;

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.editSubjectTable.subscribe((isTableEditable: boolean) => {
      this.isTableEditable = isTableEditable;

      this.toggleEditableColumns();
    });
  }
  
  addStudent() {
    SUBJECT_DATA.push({
      position: SUBJECT_DATA.length + 1,
      studentName: '',
      academicYear: '',
      learningStyles: '',
      class_form: '',
      previousFormAverage: 0,
      forces: 0,
      density: 0,
      electricity: 0,
      average: 0
    });

    this.dataSource = new MatTableDataSource(SUBJECT_DATA);
  }

  deleteStudent() {
    SUBJECT_DATA = SUBJECT_DATA.filter(student => !this.selection.selected.includes(student));

    this.dataSource = new MatTableDataSource(SUBJECT_DATA);
  }

  highlightCell(number) {
    if (number < 40) {
      return 'red';
    } else if (number >= 40 && number < 70) {
      return 'orange'
    } else {
      return 'green';
    }
  }

  getAverege(element) {
    return (+element.previousFormAverage + +element.forces + +element.density + +element.electricity) / 4;
  }

  toggleEditableColumns () {
    this.displayedColumns.shift();

    if (this.isTableEditable) {
      this.displayedColumns.unshift('select');
    } else {
      this.displayedColumns.unshift('position');
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }

    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
