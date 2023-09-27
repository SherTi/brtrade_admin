import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  switch:boolean = true;
  modalWindow: boolean = false;
  form: FormGroup = new FormGroup<any>({
    images: new FormControl<any[]>([]),
  });

  modalWin() {
    this.modalWindow = true;
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.get("images")?.value);
  }

  change() {
    console.log(this.form.get("images")?.value);
  }
}
