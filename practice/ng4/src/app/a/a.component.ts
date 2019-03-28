import { AuthorService } from './../service/author.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent implements OnInit {

  constructor(public data:AuthorService) { }

  ngOnInit() {
  }

}
