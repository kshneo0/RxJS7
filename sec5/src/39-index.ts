import { fromEvent, Observable } from "rxjs";

// 39. fromEvent

const triggerButton = document.querySelector("button#trigger");

// fromEvent 생성함수를 이용해 Observable 생성
/*
fromEvent<MouseEvent>(triggerButton, "click").subscribe((event) =>
  console.log(event.type, event.x, event.y)
);
*/
//console.log("1----------");
/*
// new Observable 생성자를 이용해 Observable 생성
const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
  triggerButton.addEventListener("click", (event: MouseEvent) => {
    subscriber.next(event);
  });
});

triggerClick$.subscribe((event) => console.log(event.type, event.x, event.y));
*/

//이벤트 처리 중지
// fromEvent 생성함수를 이용해 만든 Observable의 처리 중지
/*
const subscription = fromEvent<MouseEvent>(triggerButton, "click").subscribe(
  (event) => console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 5000);
*/

// new Observable 생성자를 이용해 만든 Observable의 처리 중지
/*
const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
  triggerButton.addEventListener("click", (event: MouseEvent) => {
    console.log("Event callback executed");
    subscriber.next(event);
  });
});

const subscription = triggerClick$.subscribe((event) =>
  console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 5000);
*/
// 5초가 지난 후에도 이벤트 핸들러인 이벤트 콜백이 여전히 실행
// Observable이 이벤트 리스터를 제대로 제거하지 않고 메모리 누수를 남기기 때문
// 이를 해결하기 위해 Teardown 로직을 제공

const triggerClick$ = new Observable<MouseEvent>((subscriber) => {
  const clickHandlerFn = (event: MouseEvent) => {
    console.log("Event callback executed");
    subscriber.next(event);
  };

  triggerButton.addEventListener("click", clickHandlerFn);

  //Teardown
  return () => {
    triggerButton.removeEventListener("click", clickHandlerFn);
  };
});

const subscription = triggerClick$.subscribe((event) =>
  console.log(event.type, event.x, event.y)
);

setTimeout(() => {
  console.log("Unsubscribe");
  subscription.unsubscribe();
}, 5000);
