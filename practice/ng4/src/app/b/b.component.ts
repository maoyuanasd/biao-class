import { AuthorService } from './../service/author.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  constructor(public data:AuthorService) { }

  ngOnInit() {
  }

}
