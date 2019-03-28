import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {FormsModule} from "@angular/forms";
import { ResultComponent } from './search/result/result.component';
import { BindingComponent } from './binding/binding.component';
import { EventComponent } from './event/event.component';
import { Event2Component } from './event2/event2.component';
import { TwoWayComponent } from './two-way/two-way.component';
import { MyInputComponent } from './my-input/my-input.component';
import { BlackBoardComponent } from './black-board/black-board.component';
import { BlackBoard2Component } from './black-board2/black-board2.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    BindingComponent,
    EventComponent,
    Event2Component,
    TwoWayComponent,
    MyInputComponent,
    BlackBoardComponent,
    BlackBoard2Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
