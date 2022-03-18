import { forkJoin, Observable } from "rxjs";

// 43. forkJoin - Error Scenario

const a$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next("A");
    subscriber.complete();
  }, 5000);
  return () => {
    console.log("A teardown");
  };
});

const b$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error("Failure!");
  }, 3000);
  return () => {
    console.log("B teardown");
  };
});

forkJoin([a$, b$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log("Error:", err),
});

// Observable B에서 오류가 발생하자마자 forkJoin의 논리가 계속 작동하는 것이 의미가 없었으므로 이 오류를 구독에 다시 보냈습니다.
// forkJoin의 논리도 Observable A에서 구독을 취소
// 따라서 Observable A가 실제 HTTP 호출이거나 다른 프로세스인 경우 forkJoin의 입력 Observable 중 하나라도 실패하면 취소