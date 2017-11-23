import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import {FirebaseService} from '../firebase.service'
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  constructor(private heroService: HeroService,
  private firebaseService: FirebaseService) { }


  ngOnInit() {
    this.getHeroes();
  }
 

  getHeroes(): void {
    
    this.firebaseService.getHeroes()
    .subscribe(heroes => {
      console.log(heroes)
    return  this.heroes = heroes
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.firebaseService.addHero({ name } as Hero)
      .then(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    debugger;
    this.firebaseService.deleteHero(hero);
  }


}
