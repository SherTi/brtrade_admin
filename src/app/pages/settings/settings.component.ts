import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GalleryItem } from '../../types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  switch: boolean = true;
  form: FormGroup = new FormGroup<any>({
    images: new FormControl<GalleryItem[]>([]),
  });

  ngOnInit(): void {}
}
