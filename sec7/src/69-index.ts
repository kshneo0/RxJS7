import { fromEvent, BehaviorSubject } from "rxjs";
import { withLatestFrom } from "rxjs/operators";
// 69. BehaviorSubject in Action

const loggedInSpan: HTMLElement = document.querySelector("span#logged-in");
const loginButton: HTMLElement = document.querySelector("button#login");
const logoutButton: HTMLElement = document.querySelector("button#logout");
const printStateButton: HTMLElement =
  document.querySelector("button#print-state");

//const isLoggedIn$ = new Subject<boolean>();
const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, "click").subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, "click").subscribe(() => isLoggedIn$.next(false));

// Navigation bar
isLoggedIn$.subscribe(
  (isLoggedIn) => (loggedInSpan.innerText = isLoggedIn.toString())
);

// Buttons
isLoggedIn$.subscribe((isLoggedIn) => {
  logoutButton.style.display = isLoggedIn ? "block" : "none";
  loginButton.style.display = !isLoggedIn ? "block" : "none";
});

fromEvent(printStateButton, "click")
  .pipe(
    // withLatestFrom
    // 이벤트가 발생할 때마다 withLatestFrom 연산자는
    // 최신 BehaviorSubject에서 값을 추가하고
    // 해당 값이 추가된 배열을 만든다.
    // 상태의 다양한 부분을 선택하는 매우 일반적인 방법
    // Angular 프로젝트에서 NgRX를 사용
    withLatestFrom(isLoggedIn$)
  )
  .subscribe(([event, isLoggedIn]) =>
    console.log("User is logged in:", isLoggedIn)
  );
