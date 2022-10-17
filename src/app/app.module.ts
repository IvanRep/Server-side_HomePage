import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MagnifierComponent } from './svg/magnifier/magnifier.component';
import { SvgListComponent } from './svg/svg-list/svg-list.component';
import { SvgDoubleListComponent } from './svg/svg-double-list/svg-double-list.component';
import { SvgItemsComponent } from './svg/svg-items/svg-items.component';
import { SvgSaveComponent } from './svg/svg-save/svg-save.component';
import { SvgUploadComponent } from './svg/svg-upload/svg-upload.component';
import { SvgUserComponent } from './svg/svg-user/svg-user.component';
import { SvgClockComponent } from './svg/svg-clock/svg-clock.component';
import { SvgTagsComponent } from './svg/svg-tags/svg-tags.component';import { SvgLinkComponent } from './svg/svg-link/svg-link.component';
import { SvgCopyLinkComponent } from './svg/svg-copy-link/svg-copy-link.component';
import { SvgNewTabComponent } from './svg/svg-new-tab/svg-new-tab.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
;

@NgModule({
  declarations: [
    AppComponent,
    MagnifierComponent,
    SvgListComponent,
    SvgDoubleListComponent,
    SvgItemsComponent,
    SvgSaveComponent,
    SvgUploadComponent,
    SvgUserComponent,
    SvgClockComponent,
    SvgTagsComponent,
    SvgLinkComponent,
    SvgCopyLinkComponent,
    SvgNewTabComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
