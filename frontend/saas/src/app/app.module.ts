import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './registrar/productos/productos.component';
import { LotesComponent } from './registrar/lotes/lotes.component';
import { ReportesComponent } from './reportes/lotes/reportesLotes.component';
import { ReportesProductosComponent } from './reportes/productos/reportes-productos.component';
import { NgChartsModule } from 'ng2-charts';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LotesComponent,
    ReportesComponent,
    ReportesProductosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgChartsModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
