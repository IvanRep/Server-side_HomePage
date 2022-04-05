import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
import { IconLinkComponent } from './icon-link/icon-link.component';
import { ListLinkComponent } from './list-link/list-link.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AsideComponent } from './aside/aside.component';
import { IconsComponent } from './icons/icons.component';
import { SearchEngineSelectorComponent } from './search-engine-selector/search-engine-selector.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    IconLinkComponent,
    ListLinkComponent,
    UserComponent,
    AsideComponent,
    IconsComponent,
    SearchEngineSelectorComponent,
    SearchComponent
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
