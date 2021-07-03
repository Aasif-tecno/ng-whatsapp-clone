import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatDefaultPageComponent } from './components/mail-container/chat-area/chat-default-page/chat-default-page.component';
import { ChatRoomComponent } from './components/mail-container/chat-area/chat-room/chat-room.component';
import { MailContainerComponent } from './components/mail-container/mail-container.component';
import { ChatGuard } from './guards/chat.guard';

const routes: Routes = [
  {
    path: '',
    component: MailContainerComponent,
    children: [
      {
        path: 'room/:id',
        component: ChatRoomComponent,
      },
      {
        path: '',
        component: ChatDefaultPageComponent,
      },
    ],
    canActivate: [ChatGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
