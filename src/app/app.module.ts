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
import { TopMenuComponent } from './sections/top-menu/top-menu.component';
import { LeftMenuComponent } from './sections/left-menu/left-menu.component';
import { SearchBarComponent } from './sections/search-bar/search-bar.component';
import { InformationPanelComponent } from './sections/information-panel/information-panel.component';
import { MainPanelComponent } from './sections/main-panel/main-panel.component';
import { MainMenuComponent } from './sections/main-menu/main-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LinksPanelComponent } from './components/links-panel/links-panel.component';
import { NewLinkPanelComponent } from './components/new-link-panel/new-link-panel.component';
import { LinkComponent } from './components/link/link.component';
import { CreateLinkSvgComponent } from './svg/create-link-svg/create-link-svg.component';
import { CrossSvgComponent } from './svg/cross-svg/cross-svg.component';
import { EngineButtonComponent } from './components/engine-button/engine-button.component';
import { CompressedLinkComponent } from './components/compressed-link/compressed-link.component';
import { LogoLinkComponent } from './components/logo-link/logo-link.component';
import { ConfirmMenuComponent } from './components/confirm-menu/confirm-menu.component';
;

const routes:Routes = [
  {path: 'search', component: AppComponent }
  
];

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
    TopMenuComponent,
    LeftMenuComponent,
    SearchBarComponent,
    InformationPanelComponent,
    MainPanelComponent,
    MainMenuComponent,
    LinksPanelComponent,
    NewLinkPanelComponent,
    LinkComponent,
    CreateLinkSvgComponent,
    CrossSvgComponent,
    EngineButtonComponent,
    CompressedLinkComponent,
    LogoLinkComponent,
    ConfirmMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
