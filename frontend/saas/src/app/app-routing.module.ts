import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cuenta/login/login.component';
import { RegisterComponent } from './cuenta/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './cuenta/auth.guard';
import { ProductosComponent } from './registrar/productos/productos.component';
import { LotesComponent } from './registrar/lotes/lotes.component';
import { ReportesComponent } from './reportes/lotes/reportesLotes.component';
import { ReportesProductosComponent } from './reportes/productos/reportes-productos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
  { path: 'lotes', component: LotesComponent, canActivate: [AuthGuard]},
  { path: 'reportes/lotes', component: ReportesComponent, canActivate: [AuthGuard]},
  { path: 'reportes/productos', component: ReportesProductosComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }