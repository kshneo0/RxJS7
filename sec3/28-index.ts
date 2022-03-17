import { Observable } from "rxjs";

// 28. Order

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Alice");
  subscriber.next("Ben");
  setTimeout(() => subscriber.error(new Error("Failure")), 2000);
  setTimeout(() => {
    subscriber.next("Charlie");
    subscriber.complete();
  }, 4000);

  return () => {
    console.log("Teardown");
  };
});

console.log("Before subscribe");
observable$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log(err.message),
  complete: () => console.log("Completed!"),
});
console.log("After subscribe");
