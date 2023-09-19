import {Component, Input, ViewChild} from '@angular/core';
import {elementAt} from "rxjs";


@Component({
  selector: '.app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {

  items:any [] = [
    {
      id: 1,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "1",
      createdUp: "1",
    },
    {
      id: 2,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "2",
      createdUp: "2",
    },
    {
      id: 3,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "3",
      createdUp: "3",
    },
    {
      id: 4,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "4",
      createdUp: "4",
    },
    {
      id: 5,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "5",
      createdUp: "5",
    },
    {
      id: 6,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "6",
      createdUp: "6",
    },
    {
      id: 7,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "7",
      createdUp: "7",
    },
    {
      id: 8,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "8",
      createdUp: "8",
    },
    {
      id: 9,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "9",
      createdUp: "9",
    },
  ]
  newArr : any = []
  active:boolean = false
  modal: any;

  onClick(item: any) {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].selected = false;
    }
    item.selected = !item.selected;
    this.onChange()
  }

  onChange() {
   this.newArr = this.items.filter(item => item.selected == true)

   if (this.newArr.length == 1) {
     this.active = true
      console.log("Функция (: успешно работает")
   } else {
     this.active = false
     console.log("Функция ): не работает")
   }
  }
  submit() {

  }
}
