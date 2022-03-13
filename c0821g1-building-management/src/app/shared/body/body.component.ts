import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../service/security/token-storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  urlImg: any;
  username: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  gender: string;
  dateOfBirth: string;
  id: any;
  constructor( private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
   this.urlImg =  this.tokenStorageService.getUser().urlImg;
   this.id =  this.tokenStorageService.getUser().idEmployee;
   this.username = this.tokenStorageService.getUser().username;
   this.email = this.tokenStorageService.getUser().email;
   this.name = this.tokenStorageService.getUser().name;
   this.phone = this.tokenStorageService.getUser().phone;
   this.address = this.tokenStorageService.getUser().address;
   this.gender = this.tokenStorageService.getUser().gender;
   this.dateOfBirth = this.tokenStorageService.getUser().dayOfBirth;
   console.log(this.dateOfBirth);
   console.log(this.gender);
   console.log(this.dateOfBirth);
   console.log(this.address);
  }

}
