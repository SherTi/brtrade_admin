import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryItem, GalleryItem } from '../../types';
import { getUtil } from '../../shared/services/request.util';
import { RequestService } from '../../shared/services/request.service';
import { MessageStream } from '../../shared/streams/message.stream';
import { v4 } from 'uuid';

interface CharacterItem {
  key: FormControl<string | null>;
  value: FormControl<string | null>;
}

interface Characters {
  id: string;
  name: FormControl<string | null>;
  characters: CharacterItem[];
}

interface ProductForm {
  type: FormControl<'tractor' | 'spare' | null>;
  main_image: FormControl<GalleryItem[] | null>;
  st_image: FormControl<GalleryItem[] | null>;
  sd_image: FormControl<GalleryItem[] | null>;
  th_image: FormControl<GalleryItem[] | null>;
  name: FormControl<string | null>;
  main_chars: FormControl<CharacterItem[] | null>;
  desc: FormControl<string | null>;
  chars: FormControl<Characters[] | null>;
  category_id: FormControl<string | null>;
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  constructor(private client: RequestService) {}
  form = new FormGroup<ProductForm>({
    type: new FormControl<'tractor' | 'spare' | null>(null, {
      validators: [Validators.required],
    }),
    main_image: new FormControl<GalleryItem[] | null>([]),
    st_image: new FormControl<GalleryItem[] | null>([]),
    sd_image: new FormControl<GalleryItem[] | null>([]),
    th_image: new FormControl<GalleryItem[] | null>([]),
    name: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    main_chars: new FormControl<CharacterItem[] | null>([
      {
        key: new FormControl<string | null>(null),
        value: new FormControl<string | null>(null),
      },
    ]),
    desc: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    chars: new FormControl<Characters[] | null>([]),
    category_id: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
  });

  type: 'tractor' | 'spare' | null = null;
  tractors: CategoryItem[] = [];
  spares: CategoryItem[] = [];

  ngOnInit(): void {
    getUtil<{
      tractor: CategoryItem[];
      spare: CategoryItem[];
    }>('/api/category/get').subscribe((res) => {
      if (res.status) {
        this.tractors = res.data!.tractor;
        this.spares = res.data!.spare;
      }
    });
  }

  typeChange() {
    this.type = this.form.get('type')!.value;
    this.form.get('category_id')?.setValue(null);
  }

  createField(type: 'main_chars') {
    switch (type) {
      case 'main_chars':
        this.form.get('main_chars')?.setValue([
          ...this.form.get('main_chars')!.value!,
          {
            key: new FormControl(null),
            value: new FormControl(null),
          },
        ]);
        break;
    }
  }

  createCharacterMain() {
    this.form.get('chars')?.setValue([
      ...this.form.get('chars')?.value!,
      ...[
        {
          id: v4(),
          name: new FormControl(),
          characters: [],
        },
      ],
    ]);
  }

  createCharField(id: string) {
    const val = this.form.get('chars')?.value;
    if (val) {
      for (const char of val) {
        if (id == char.id) {
          char.characters.push({
            key: new FormControl(),
            value: new FormControl(),
          });
        }
      }
    }
  }

  getValidateImages() {
    return !!(
      this.form.get('st_image')?.value &&
      this.form.get('st_image')?.value?.length &&
      this.form.get('sd_image')?.value &&
      this.form.get('sd_image')?.value?.length &&
      this.form.get('th_image')?.value &&
      this.form.get('th_image')?.value?.length
    );
  }

  resetForm() {
    this.form.reset({
      type: null,
      main_image: [],
      st_image: [],
      sd_image: [],
      th_image: [],
      name: null,
      main_chars: [
        {
          key: new FormControl<string | null>(null),
          value: new FormControl<string | null>(null),
        },
      ],
      desc: null,
      chars: [],
      category_id: null,
    });
  }

  submitForm() {
    // main_chars
    // motor
    // trans
    // chars
    if (
      this.form.get('main_image')!.value &&
      this.form.get('main_image')!.value!.length
    ) {
      const main_chars: any[] = [];
      const chars: any[] = [];
      for (const m_char of this.form.get('main_chars')?.value!) {
        if (m_char.key.value && m_char.value.value) {
          main_chars.push({
            key: m_char.key.value,
            value: m_char.value.value,
          });
        }
      }
      for (const char of this.form.get('chars')?.value!) {
        const characters: any[] = [];
        for (const ch of char.characters) {
          if (
            ch.key.value &&
            ch.key.value?.trim() &&
            ch.value.value &&
            ch.value.value?.trim()
          ) {
            characters.push({
              key: ch.key.value,
              value: ch.value.value,
            });
          }
        }
        if (characters.length && char.name.value && char.name.value?.trim()) {
          chars.push({
            name: char.name.value,
            characters,
          });
        }
      }
      const body = {
        type: this.form.get('type')?.value,
        name: this.form.get('name')?.value,
        main_chars,
        main_image: this.form.get('main_image')?.value![0].id,
        st_image: this.getValidateImages()
          ? this.form.get('st_image')!.value![0].id
          : undefined,
        sd_image: this.getValidateImages()
          ? this.form.get('sd_image')!.value![0].id
          : undefined,
        th_image: this.getValidateImages()
          ? this.form.get('th_image')!.value![0].id
          : undefined,
        desc: this.form.get('desc')?.value,
        chars,
        category_id: this.form.get('category_id')?.value,
      };
      console.log(body);
      this.client.post('/api/product/create', body).subscribe((res) => {
        if (res.status) {
          this.resetForm();
          MessageStream.createMessage({
            id: v4(),
            error: false,
            message: 'Успешно добавлено!',
          });
        }
      });
    }
  }
}
