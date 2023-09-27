import {
  AfterContentChecked,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
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
  @ViewChild(RouterOutlet) outlet?: RouterOutlet;
  constructor(private router: Router) {}
  title = 'brtrade_admin';
  subscription?: Subscription;
  messageBox: Message[] = [];

  ngOnInit(): void {
    this.subscription = MessageStream.subscribe((value) => {
      this.messageBox.push(value);
      setTimeout(() => {
        this.messageBox = this.messageBox.filter((v) => {
          return v.id !== value.id;
        });
      }, 5000);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
