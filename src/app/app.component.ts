import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MessageStream } from './shared/streams/message.stream';
import { Message } from './types';
import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LoadingStream } from './shared/streams/loading.stream';
import { GalleryStream } from './shared/streams/gallery.stream';
import { RequestService } from './shared/services/request.service';
import { getUtil } from './shared/services/request.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        animation([
          style({
            transform: 'translateX(20%)',
            opacity: '0',
          }),
          animate(
            '0.2s',
            style({
              transform: 'translateX(0)',
              opacity: '1',
            }),
          ),
        ]),
      ]),
      transition(':leave', [
        animation([
          style({
            transform: 'translateX(0)',
            opacity: '1',
          }),
          animate(
            '0.2s',
            style({
              transform: 'translateX(20%)',
              opacity: '0',
            }),
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private client: RequestService) {}

  @ViewChild(RouterOutlet) outlet?: RouterOutlet;
  title = 'brtrade_admin';
  messageSubscription?: Subscription;
  loadingSubscription?: Subscription;
  messageBox: Message[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.messageSubscription = MessageStream.subscribe((value) => {
      this.messageBox.push(value);
      setTimeout(() => {
        this.messageBox = this.messageBox.filter((v) => {
          return v.id !== value.id;
        });
      }, 5000);
    });
    this.isLoading = LoadingStream.loadingStatus;
    this.loadingSubscription = LoadingStream.subscribe((value) => {
      this.isLoading = value;
    });
    getUtil<any>('/api/gallery/get').subscribe((res) => {
      if (res.status) {
        GalleryStream.init(res.data);
      }
    });
  }

  ngOnDestroy(): void {
    this.messageSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
  }
}
