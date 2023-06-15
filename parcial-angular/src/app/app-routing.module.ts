import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticulosComponent } from './components/articulos/articulos.component';
import { FormArticuloComponent } from './components/form-articulo/form-articulo.component';

const routes: Routes = [
  { path: 'home', component: ArticulosComponent },
  { path: 'form/:id', component: FormArticuloComponent },
  { path: '**', pathMatch: 'full', component: ArticulosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }