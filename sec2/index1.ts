import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Alice");
  setTimeout(() => subscriber.next("Ben"), 2000);
  setTimeout(() => subscriber.next("Charlie"), 4000);
});

console.log("Subscription 1 starts");
observable$.subscribe((value: any) => console.log("Subscription 1:", value));

setTimeout(() => {
    console.log("Subscription 2 starts");
    observable$.subscribe((value: any) =>
      console.log("Subscription 2:", value)
    );
}, 1000);

// 구독은 Observable 내부에서 함수를 호출하는 것과 같다.
// Observable에서 subscribe 메소드를 호출할 때마다 내장된 함수가 Observable 내부가 실행
// 각 구독은 별도의 독립적인 Observable의 실행이다.
