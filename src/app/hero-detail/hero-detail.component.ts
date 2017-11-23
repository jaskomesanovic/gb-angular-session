import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {FirebaseService}  from '../firebase.service'
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  giphies=[];
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private firebaseSerice:FirebaseService
  ) { }

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.firebaseSerice.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.firebaseSerice.updateHero(this.hero)
      .then(() => this.goBack());
  }
  
  searchImage():void{
    this.heroService.getImages(this.hero.name).subscribe((res) => {
      this.giphies = res.data; 
      console.log(res.data); 
     });
  }

  imageSelected(url:string):void{
    this.hero.url=url;
    this.firebaseSerice.updateHero(this.hero)
  }
}
