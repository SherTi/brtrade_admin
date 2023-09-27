import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { MainComponent } from './shared/layouts/main/main.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { AddCategoriesComponent } from './pages/add-categories/add-categories.component';
import { ApplicationsComponent } from './pages/applications/applications.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { canActivate } from './shared/services/guard';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [canActivate],
        canActivateChild: [canActivate],
        children: [
          { path: '', redirectTo: 'add', pathMatch: 'full' },
          { path: 'add', component: AddItemComponent },
          { path: 'category', component: AddCategoriesComponent },
          { path: 'request', component: ApplicationsComponent },
          { path: 'setting', component: SettingsComponent },
          { path: 'catalog', component: CatalogComponent },
        ],
      },
      { path: 'sign-in', component: SingInComponent },
    ],
  },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
