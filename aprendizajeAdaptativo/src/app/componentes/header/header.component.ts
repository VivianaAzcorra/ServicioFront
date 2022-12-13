import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginbtn: boolean;
  logoutbtn: boolean;
  sesion: any;
constructor(private route: ActivatedRoute, private router: Router){
  this.sesion = sessionStorage.getItem('sesion');
  this.loginbtn = false;
  this.logoutbtn = true;
}

  /* constructor(private dataService: LoginServiceService) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.dataService.isLoggedIn()) {
      this.loginbtn = false;
      this.logoutbtn = true;
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false;
    }
  }
  */

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }

  /*logout() {
    this.dataService.deleteToken();
    window.location.href = "";
  }*/

  ngOnInit(): void {
    
  }

  link(){
    this.router.navigate(["/"+this.sesion, "inicio"])
  }

  cerrarsesion(){
    sessionStorage.clear();
    this.router.navigateByUrl('')
  }

}
