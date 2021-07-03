import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailContainerComponent } from './mail-container.component';

describe('MailContainerComponent', () => {
  let component: MailContainerComponent;
  let fixture: ComponentFixture<MailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
