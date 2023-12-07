import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutAdminModule } from 'src/libs/component/layout/admin/layout-admin.module';
import { LayoutPageModule } from 'src/libs/component/layout/page/layout-page.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Page404Component } from './page404/page404.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageModule } from './page/page.module';
import { AccountModule } from 'src/libs/component/account/account.module';

// import { BlogDialogComponent } from 'src/app/admin/blog/components/blog-dialog/blog-dialog.component'
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { environment } from 'src/environment/environment2';

import { ToastrModule } from 'ngx-toastr';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    BrowserModule,
    AppRoutingModule,
    LayoutAdminModule,
    LayoutPageModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageModule,
    AccountModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
