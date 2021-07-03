import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { RoomData } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  @Input() roomData!: RoomData;
  @Input() randomSeed!: string;
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();
  lastMessage!: string;
  sub!: Subscription;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.sub = this.afs
      .collection('rooms')
      .doc(this.roomData.id)
      .collection('messages', (ref) => ref.orderBy('time', 'desc'))
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          this.lastMessage = data[0].message;
        }
      });
  }

  onClick(): void {
    this.seedValue.emit(this.randomSeed);
  }
}
