import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  isUser!: User;
  item: any;
  messageData: any[] = [];

  @Output() chatData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    this.isUser = JSON.parse(localStorage.getItem('user') || '{}');
  }

  ngOnInit(): void {
    this.subs.push(
      this.route.paramMap
        .pipe(map((paramMap) => paramMap.get('id')))
        .subscribe((routePathParam) =>
          this.commonService.updatePathParamState(routePathParam || '')
        )
    );
    this.subs.push(
      this.route.params.subscribe((param) => {
        // to get all data matching the document id
        this.afs
          .collection('rooms')
          .doc(param.id)
          .get()
          .subscribe((data) => {
            this.item = data;
            this.chatData.emit(this.item.data().name);
          });
        // to get the messages
        this.subs.push(
          this.afs
            .collection('rooms')
            .doc(param.id)
            .collection('messages', (ref) => ref.orderBy('time', 'asc'))
            .valueChanges()
            .subscribe((messages) => {
              this.messageData = messages;
            })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }
}
