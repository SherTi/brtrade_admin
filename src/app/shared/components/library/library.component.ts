import {Component, Input} from '@angular/core';


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
      createdAt: "",
      createdUp: "",
    },
    {
      id: 2,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "",
      createdUp: "",
    },
    {
      id: 3,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "",
      createdUp: "",
    },
    {
      id: 4,
      name: "Тракторк",
      width: "150px",
      height: "123px",
      size: "150x123",
      selected: false,
      createdAt: "",
      createdUp: "",
    },
  ]

  check: boolean = false
  newArr : any = []
  onChange() {
    this.newArr.filter(() => {

      console.log(this.newArr)
    })
  }
  onClick(item: any) {
    item.selected = true;
    console.log(item)
  }
}
