import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SingInComponent} from "./pages/sing-in/sing-in.component";
import {MainComponent} from "./shared/layouts/main/main.component";
import {AddItemComponent} from "./pages/add-item/add-item.component";
import {AddCategoriesComponent} from "./pages/add-categories/add-categories.component";

const routes: Routes = [
  {path : "" , component:MainComponent , children:[
      {path: "" , redirectTo : "/add" , pathMatch: "full"},
      {path: "add", component:AddItemComponent},
      {path: "category" , component: AddCategoriesComponent},
    ]},
  {path : "sing-in", component: SingInComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
