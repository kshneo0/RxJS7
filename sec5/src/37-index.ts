import { Observable, of } from "rxjs";

// 37. of - How Creation Functions work

// 구독 직후 모든 값이 방출
of("Alice", "Ben", "Charlie").subscribe((value) => console.log(value));

console.log("1----------");

// 마지막 알림을 보낸 직후 완료 알림을 보냄
of("Alice", "Ben", "Charlie").subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

console.log("2----------");

const names$ = new Observable<string>((subscriber) => {
  subscriber.next("Alice");
  subscriber.next("Ben");
  subscriber.next("Charlie");
  subscriber.complete();
});

names$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

console.log("3----------");

// of 생성함수처럼 작동하는 Creation 함수를 구현
// 여러 값과 함께 인수를 만들고 Observable을 만들고 반환하면 해당 값을 내보내고 완료
// 입력을 단순화하기 위해 '문자열' 값만 허용한다고 가정

function outOwnOf(...args: string[]): Observable<string> {
  return new Observable<string>((subscriber) => {
    for (let i = 0; i < args.length; i++) {
      subscriber.next(args[i]);
    }
    subscriber.complete();
  });
}

outOwnOf("Alice", "Ben", "Charlie").subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});
