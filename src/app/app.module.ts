import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MailContainerComponent } from './components/mail-container/mail-container.component';
import { SidebarComponent } from './components/mail-container/sidebar/sidebar.component';
import { SidebarContentComponent } from './components/mail-container/sidebar/sidebar-content/sidebar-content.component';
import { ChatAreaComponent } from './components/mail-container/chat-area/chat-area.component';
import { ChatDefaultPageComponent } from './components/mail-container/chat-area/chat-default-page/chat-default-page.component';
import { ChatRoomComponent } from './components/mail-container/chat-area/chat-room/chat-room.component';
import { MaterialModule } from './shared/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    MailContainerComponent,
    SidebarComponent,
    SidebarContentComponent,
    ChatAreaComponent,
    ChatDefaultPageComponent,
    ChatRoomComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
