import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss'],
})
export class ChatAreaComponent implements OnInit {
  @Input() randomSeed!: string;
  paramsValue!: string;
  subs!: Subscription;
  roomName!: string;

  constructor(
    private commonService: CommonService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.subs = this.commonService.pathParam.subscribe((value) => {
      this.paramsValue = value;
    });
  }

  onSubmitForm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { message } = form.value;
    form.reset;
    this.afs
      .collection('rooms')
      .doc(this.paramsValue)
      .collection('messages')
      .add({
        message,
        user_id: this.commonService.getUser().uid,
        name: this.commonService.getUser().displayName,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    form.resetForm();
  }

  chatData(event: any): void {
    if (event.chatData !== undefined) {
      event.chatData.subscribe((roomName: any) => (this.roomName = roomName));
    }
  }
}
