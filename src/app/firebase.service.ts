import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument  } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FirebaseService {
heroesCollection:AngularFirestoreCollection<Hero>;
heros:Observable<Hero[]>;

  constructor(private afs:AngularFirestore) { }

  getHeroes (): Observable<Hero[]> {
      
      return this.afs.collection<Hero>('words').valueChanges();
  }

getHero(id: string): Observable<Hero> {
  // const url = `${this.heroesUrl}/${id}`;
  // return this.http.get<Hero>(url).pipe(
  //   tap(_ => console.log(`fetched hero id=${id}`)),
  //   catchError(this.handleError<Hero>(`getHero id=${id}`))
  // );
 //return this.afs.collection<Hero>('words', ref => ref.where('id', '==', id)).valueChanges();
 return this.afs.doc<Hero>('words/'+id).valueChanges();
}

/** PUT: update the hero on the server */
updateHero (hero: Hero): Promise<any> {
  // return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  //   tap(_ => console.log(`updated hero id=${hero.id}`)),
  //   catchError(this.handleError<any>('updateHero'))
  // );
    return this.afs.collection('words').doc(hero.id).set({'id':hero.id ,'name': hero.name, 'url':hero.url});
}

/** POST: add a new hero to the server */
addHero (hero: Hero): Promise<any> {
 let imageUrl=  "https://media3.giphy.com/media/3xz2BIXYagz5STg0xi/200_d.gif";
  var key = this.afs.createId();
 return this.afs.collection('words').doc(key).set({'id':key ,'name': hero.name, 'url':imageUrl})

}

/** DELETE: delete the hero from the server */
deleteHero (hero: Hero ): Promise<void> {
 
  return this.afs.doc<Hero>('words/'+hero.id).delete();
}

/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.afs.collection<Hero>('words', ref => ref.where('name', '>=', term)).valueChanges();
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
