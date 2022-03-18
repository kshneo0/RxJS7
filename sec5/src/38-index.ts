import { from } from "rxjs";

// 38. from

// 배열을 Observable로 변환하는데 사용
// 이것은 of 함수가 작동한 것과 유사한 방식으로 작동

// 전달된 배열과 함께 'from'을 사용하여 값을 내보내는 Cold Observable을 생성
// 구독할 때마다 Complete가 발생
from(["Alice", "Ben", "Charlie"]).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

console.log("1----------");

// Promise를 Observable로 변환
// Promise로 노출된 일부 코드 또는 API가 이미 있는 경우 유용

const somePromise = new Promise((resolve, reject) => {
  resolve("Resolved!");
});

// 새로 생성된 Observable의 로직은 일단 구독하면 Promise에서 'then' 메소드를 사용
// 사용 가능하면 다음 알림으로 확인 값을 내보내고 완료
const observableFromPromise$ = from(somePromise);

observableFromPromise$.subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("Completed!"),
});

console.log("2----------");
// Rejection

const somePromise1 = new Promise((resolve, reject) => {
  reject("Rejected!");
});

// 새로 생성된 Observable의 로직은 일단 구독하면 Promise에서 'then' 메소드를 사용
// 사용 가능하면 다음 알림으로 확인 값을 내보내고 완료
const observableFromPromise1$ = from(somePromise1);

observableFromPromise1$.subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log("Error:", err),
  complete: () => console.log("Completed!"),
});


// Promise가 전달된 'from' 함수를 사용하여 생성된 Observable은 
// 'then' 및 'catch' 메서드를 사용한다.
// Promise에서 해결된 값 또는 거부 오류를 다음 또는 오류 알림으로 전달한다.