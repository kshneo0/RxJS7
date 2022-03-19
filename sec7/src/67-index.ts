import { fromEvent, Subject } from "rxjs";
import { map } from "rxjs/operators";
// 67. Subject in Action

const emitButton = document.querySelector("button#emit");
const inputElement: HTMLInputElement = document.querySelector("#value-input");
const subscribeButton = document.querySelector("button#subscribe");

const value$ = new Subject<string>();

/*
fromEvent(emitButton, "click")
  .subscribe(() => value$.next(inputElement.value));
*/

fromEvent(emitButton, "click")
  .pipe(map(() => inputElement.value))
  .subscribe(value$);

fromEvent(subscribeButton, "click").subscribe(() => {
  console.log("New subscription");
  value$.subscribe((value) => console.log(value));
});
