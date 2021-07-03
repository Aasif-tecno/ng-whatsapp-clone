import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-container',
  templateUrl: './mail-container.component.html',
  styleUrls: ['./mail-container.component.scss'],
})
export class MailContainerComponent implements OnInit {
  seedValue!: string;

  constructor() {}

  ngOnInit(): void {}

  seedData(event: string): void {
    this.seedValue = event;
  }
}
