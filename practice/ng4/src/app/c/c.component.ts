import { AuthorService } from './../service/author.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-c',
  templateUrl: './c.component.html',
  styleUrls: ['./c.component.css'],
  providers:[AuthorService]
})
export class CComponent implements OnInit {

  constructor(public data:AuthorService) { }

  ngOnInit() {
  }

}
