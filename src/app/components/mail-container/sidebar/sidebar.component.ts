import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { CommonService, RoomData } from 'src/app/services/common.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { database } from 'firebase';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  randomSeed: any[] = [];
  roomData: RoomData[] = [];
  lastMessage!: string;
  subs: Subscription[] = [];
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private afs: AngularFirestore,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    // Generate randm value
    this.randomSeed = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 14578765)
    );

    // Fetching data from firestore
    this.subs.push(
      this.afs
        .collection('rooms')
        .snapshotChanges()
        .pipe(
          map((actions) => {
            return actions.map((a) => {
              return {
                id: a.payload.doc.id,
                // @ts-ignore
                ...a.payload.doc.data(),
              };
            });
          })
        )
        .subscribe((rooms: RoomData[]) => {
          (this.roomData = rooms), console.log(this.roomData);
        })
    );
  }

  onSubmitForm(form: NgForm) {
    const search = form.value.search;
    console.log(search);
    if (form.invalid) {
      return;
    }
    this.afs
      .collection<RoomData>('rooms')
      .valueChanges()
      .pipe(
        map((data: RoomData[]) =>
          data.map(
            (s) => s.name?.toLowerCase() === form.value.search?.toLowerCase()
          )
        )
      )
      .subscribe((dataValue) => {
        dataValue = dataValue.filter((s) => s === true);
        console.log(dataValue);
        if (dataValue.length !== 0) {
          alert('Sorry, room already present');
          return;
        } else {
          if (form.value.search !== null) {
            this.afs.collection('rooms').add({
              name: form.value.search,
            });
          } else {
            return;
          }
          form.resetForm();
        }
      });
  }

  seedData(event: string): void {
    this.seedValue.emit(event);
  }

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  onLogout() {
    this.commonService.logout();
  }
}
