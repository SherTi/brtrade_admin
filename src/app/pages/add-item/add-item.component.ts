import {Component, OnInit} from '@angular/core';
import {LibraryComponent} from "../../shared/components/library/library.component";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  part: number | null = null;
  modalWindow:boolean = false
  item: any;


  modalWin() {
    this.modalWindow = !this.modalWindow
    console.log("click")
  }

  ngOnInit(): void {
  }

}
