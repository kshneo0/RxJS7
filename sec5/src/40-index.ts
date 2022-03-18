import { timer, Observable } from "rxjs";

// 40. timer

console.log("App started");
/*
const timer$ = new Observable<number>((subscriber) => {
  setTimeout(() => {
    console.log("Timeout!");
    subscriber.next(0);
    subscriber.complete();
  }, 2000);
});

const subscription1 = timer$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

const subscription2 = timer(2000).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  subscription1.unsubscribe();
  subscription2.unsubscribe();
  console.log("Unsubscribe");
}, 1000);
*/
// 구독을 취소한 후에도 Observable에 여전히 실행 중인 남은 부분이 있음을 알 수 있다.
// 이런 잔재물을 남기지 말고 구독 후 정리를 해야 한다.

const timer$ = new Observable<number>((subscriber) => {
  const timeoutId = setTimeout(() => {
    console.log("Timeout!");
    subscriber.next(0);
    subscriber.complete();
  }, 2000);

  return () => clearTimeout(timeoutId);
});

const subscription1 = timer$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

setTimeout(() => {
  subscription1.unsubscribe();
  console.log("Unsubscribe");
}, 1000);
