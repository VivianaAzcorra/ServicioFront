import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  sesion: any;
  showFiller = false;
  constructor(private router: Router) {
    this.sesion = sessionStorage.getItem('sesion');
   }

  ngOnInit(): void {
  }

  link(){
    this.router.navigate(["/"+this.sesion, "inicio"])
  }

}
