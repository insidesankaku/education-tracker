import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { SubjectComponent } from './subject/subject.component';


const routes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: 'subject/:id', component: SubjectComponent },
  { path: '',   redirectTo: '/board', pathMatch: 'full' }, 
  { path: '**', component: BoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
