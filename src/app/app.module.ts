import { ImageViewComponent } from './components/image-view/image-view.component';
import { ImageService } from './services/image.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageListComponent } from './components/image-list/image-list.component';
import { HeaderComponent } from './components/header/header.component';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {DeferLoadModule} from '@trademe/ng-defer-load';


@NgModule({
  declarations: [
    AppComponent,
    ImageListComponent,
    ImageViewComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    ScrollDispatchModule,
    AppRoutingModule,
    HttpClientModule,
    ScrollingModule,
    FlexLayoutModule,
    DeferLoadModule
  ],
  providers: [
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


