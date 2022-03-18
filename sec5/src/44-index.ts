import { combineLatest, fromEvent } from "rxjs";

// 44. combineLatest - Reacting to multiple input changes

const temperatureInput = document.getElementById("temperature-input");
const conversionDropdown = document.getElementById("conversion-dropdown");
const resultText = document.getElementById("result-text");

const temperatureInputEvent$ = fromEvent<any>(temperatureInput, "input");
const conversionInputEvent$ = fromEvent<any>(conversionDropdown, "input");

combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
  ([temperatureInputEvent, conversionInputEvent]) => {
    const temperature = Number(temperatureInputEvent.target["value"]);
    const conversion = conversionInputEvent.target["value"];

    let result: number;
    if (conversion === "f-to-c") {
      result = ((temperature - 32) * 5) / 9;
    } else if (conversion === "c-to-f") {
      result = (temperature * 9) / 5 + 32;
    }
    resultText.innerText = String(result);
  }
);


// combineLatest 생성 기능은 무언가를 지속적으로 유지해야 할 때 유용
// 업데이트 되고 시간이 지남에 따라 변경될 수 있는 몇 가지 소스의 최신 값 또는 이벤트의 결과