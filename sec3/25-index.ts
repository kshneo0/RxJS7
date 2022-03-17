import { Observable } from "rxjs";

// 25. Teardown - Complete Notification

const observable$ = new Observable<string>((subscriber) => {
  console.log("Observable executed");
  subscriber.next("Alice");
  subscriber.next("Ben");
  setTimeout(() => {
    subscriber.next("Charlie");
    subscriber.complete();
  }, 2000);

  return () => {
    console.log("Teardown");
  };
});

console.log("Before subscribe");
observable$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});
console.log("After subscribe");

// Teardown로직은 Observable에서 다음과 같이 사용할 수 있다.
// 메모리 누수를 방지하거나 취소 논리를 제공하기 위해 자체적으로 정리
// HTTP 요청을 사용하여 서버를 호출하는 Observable이 있다면
// Tesrdown 로직에서 해당 HTTP 요청을 중단.
// 따라서 요청이 완료되기 전에 사용자가 구독을 취소하면 HTTP 호출이 중단
// Teardown 논리는 정리 및 취소에 대한 동작을 제공하는 곳
// Observable의 중요한 장점
// Observable에 의해 초기화된 진행 중인 프로세스를 취소하는 방법을 제공한다.