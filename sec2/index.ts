import { Observable } from "rxjs";

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Alice");
  setTimeout(() => subscriber.next("Ben"), 2000);
  setTimeout(() => subscriber.next("Charlie"), 4000);
});

// const observer = {
//   next: (value: any) => console.log(value),
// };

// observable$.subscribe(observer);

const subscription = observable$.subscribe((value: any) => console.log(value));

// Observable의 논리에는 subscriber 개체가 있다.
// 이는 구독할 때 Observer가 구독자 개체에 래핑되어 완료되기 때문
// 알림을 전달하지 않는 것과 같은 Observable 인터페이스 보증을 제공하기 위해
// 구독이 종료되거나 적용되지 않는 알림 유형에 대한 기본 핸들러를 제공

// 간단히 말해서 Observable을 보다 예측 가능하게 만드는 투명한 단계

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 3000);
