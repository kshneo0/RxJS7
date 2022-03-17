import { Observable } from "rxjs";

// 29. Cancellation - Unsubscribe

const interval$ = new Observable<number>((subscriber) => {
  let counter = 1;

  const intervalId = setInterval(() => {
    console.log("Emitted", counter);
    subscriber.next(counter++);
  }, 2000);

  return () => {
    clearInterval(intervalId);
  };
});

const subscription = interval$.subscribe((value) => console.log(value));

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 7000);
