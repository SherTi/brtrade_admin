import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryItem} from "../../../types";

@Component({
  selector: '.app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  @Input() category?: CategoryItem;
  @Input() hasSubCategory: boolean = false;



  ngOnInit(): void {}

  toggleSubCategory() {
    if (this.category) {
      // console.log((!!this.category.is_open)!);
      this.category.is_open = !(!!this.category.is_open);
    }
  }
}
