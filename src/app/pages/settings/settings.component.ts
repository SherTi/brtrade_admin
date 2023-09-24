import { Component } from '@angular/core';
import {LibraryComponent} from "../../shared/components/library/library.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent  extends LibraryComponent{

  switch:boolean = true
  modalWindow: boolean = false
  modalWin() {
    this.modalWindow = !this.modalWindow
    console.log("click")
    this.submit()
  }
}
