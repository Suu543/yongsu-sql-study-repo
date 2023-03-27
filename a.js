// Promise
// 비동기로 동작하는 요소들은 그냥 Web APIs 공간에 전달되어서 처리하는 방식
// 특정 동작이 완료되기 전까지 다른 동작을 철저하게 통제할 수 있다.

// Promise ==> 함수의 리턴 resolve, reject

function a(callback) {
  setTimeout(() => {
    console.log("a");
    callback();
  }, 1000);
}

function b(callback) {
  setTimeout(() => {
    console.log("b");
    callback();
  }, 500);
}

function c(callback) {
  setTimeout(() => {
    console.log("c");
    callback();
  }, 1500);
}

function d(callback) {
  setTimeout(() => {
    console.log("d");
    callback();
  }, 200);
}

// a
// setTimeout A
// b
// setTimeout B
// c
// setTimeout C
// d
// setTimeout D

a(() => {
  console.log("setTimeout A");
  b(() => {
    console.log("setTimeout B");
    c(() => {
      console.log("setTimeout C");
      d(() => {
        console.log("setTimeout D");
      });
    });
  });
});
