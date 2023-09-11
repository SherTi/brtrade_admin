import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AddCategoriesComponent } from './pages/add-categories/add-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    MainComponent,
    AddItemComponent,
    AddCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
