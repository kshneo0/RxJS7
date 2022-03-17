import { Observable } from "rxjs";

// 24. Asynchronous Emission - More Next Notifications

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Alice");
  subscriber.next("Ben");
  setTimeout( () => subscriber.next('Charlie'),2000);
});

console.log("Before subscribe");
observable$.subscribe({
  next: (value) => console.log(value),
});
console.log("After subscribe");
