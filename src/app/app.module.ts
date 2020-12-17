import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin/admin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment } from '../environments/environment';
import { RequestInterceptorService } from './request-interceptor.service';
import { FooterComponent } from './footer/footer.component';


// // Activate this line for localhost:
// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// // Activate this line for internet:
// const config: SocketIoConfig = { url: 'http://chat.gubler-it.com:3000', options: {} };

const config: SocketIoConfig = { url: environment.serverUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    HeaderComponent,
    HomeComponent,
    SettingsComponent,
    AdminComponent,
    WelcomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
