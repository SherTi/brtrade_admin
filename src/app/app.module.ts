import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AddCategoriesComponent } from './pages/add-categories/add-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { LibraryComponent } from './shared/components/library/library.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './shared/components/category/category.component';

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
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
