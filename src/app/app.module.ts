import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AddCategoriesComponent } from './pages/add-categories/add-categories.component';
import {FormsModule} from "@angular/forms";
import { ApplicationsComponent } from './pages/applications/applications.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LibraryComponent } from './shared/components/library/library.component';

@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
    MainComponent,
    AddItemComponent,
    AddCategoriesComponent,
    ApplicationsComponent,
    SettingsComponent,
    CatalogComponent,
    LibraryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
