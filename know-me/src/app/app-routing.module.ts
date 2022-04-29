import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsManagerComponent } from './questions-manager/questions-manager.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'manager',
    component: QuestionsManagerComponent
  },
  {
      path: '',
      redirectTo: '/questions',
      pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '/questions',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
