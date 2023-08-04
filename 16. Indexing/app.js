// OOP(Object Oriented Programming: 객체지향)
// 1. this ==> constructor(인스턴스를 생성하면 자동으로 호출됨(클래스 함수 호출에 전달한 인자값이 맵핑되면서))
// 2. 클래스 구성요소: 1. 속성(프로퍼티 or 어트리뷰트) 2. 함수(메소드)
// 3. public 속성 vs private 속성 ==> #:
// 4. private 속성 (생성한 인스턴스에서 직접적으로 접근할 수 없는 값: 클래스 내부에서만 접근 가능함)
// - 이러한 private 값을 읽어오는 함수(메소드): getter
// - 이러한 private 값을 설정하는 함수(메소드): setter
// 5. getter/setter: Encapsulation(캡슐화)
// - 알약 먹을 때 내용물을 확인하지 않고 삼킨다
// 6. Abstraction(추상화) ==> Encapsulation
/// - 자동차가 회사가: D, N, R (레버댕겨서 조정)
// 상세한 내부 로직을 알고 D, N, R을 사용할까? Abstraction
// 내부 로직은 모르겠고, 결과만 본다 ==> 소프트웨어 개발 학습에 Learning Curve 제곱배로 늘렸다.
// React ==> <h1></h1> ==> React.createElement();

// 7. private method 존재가능할까?
// 객체 = Object
// object: key: value(숫자, 문자, 배열, 함수, 객체)
// 8. Java ==> abstract class, interfaces

// 9. Inheritance(상속)
// 10. Overriding or Overwriting

const user = {
  name: "Yongsu Jeong",
  userName: "YongsuYongsu",
  password: "password",
  login: function (userName, password) {
    // 아하 객체 안에 key 값으로 정의한 this는 내가 위치해있는 객체가된다.
    console.log(this);

    if (userName === this.userName && password === this.password) {
      console.log("로그인 성공");
    } else {
      console.log("로그인 실패");
    }
  },
  age: 25,
};

user.login("asdasd", "asdasd");
user.login("YongsuYongsu", "password");

class Person {
  // this = {};

  // Encapsulation(캡슐화)
  #password;

  constructor(name, userName, password) {
    // 맵핑
    // public
    this.name = name;
    this.userName = userName;
    // private 형태로 값을 설정하고 싶다면: 값 앞에 #
    this.#password = password;
  }

  // getter/setter
  // Encapsulation(캡슐화) + Abstraction(추상화)
  // Encapsulation - setter
  setPassword(currentPassword, newPassword) {
    if (currentPassword === this.#password) {
      this.#password = newPassword;
      return "비밀번호변경 성공";
    } else {
      return "비밀번호변경 실패";
    }
  }

  // getter
  getPassword() {
    console.log("password: ", this.#password);
  }

  // Encapsulation (캡슐화)
  #validateEmail(email) {
    return true;
  }

  // Encapslation (캡슐화)
  #validatePassword(password) {
    return true;
  }

  // Encapsulation(캡슐화) + Abstraction (추상화)
  signup(name, email, password) {
    let isValidated = false;

    isValidated = this.#validateEmail(email);
    isValidated = this.#validatePassword(password);

    if (isValidated) {
      this.name = name;
      this.email = email;
      this.#password = password;

      console.log("새로운 사용자 등록됨: 성공");
    } else {
      console.log("비밀번호 이메일을 다시 확인해주세요");
    }
  }
}

// 클래스를 이용해서 User 생성하면 ==> User 인스턴스
// 하나의 객체가 가질 수 있는 두 가지 종료의 특성
// 정적인: 값 (속성)
// 동적인: 함수 (메소드: 클래스 안에 정의된 함수를 메소드라 칭한다)

// 1. 어떻게 클래스를 이용해 인스턴스를 생성할 때 함수 처럼 인자를 줄 수 있습니까?
// 2. 클래스 함수를 호출하면 내부적으로 constructor라는 메소드를 호출한다
// 3. 인스턴스를 생성할 때 인자값으로 전달한 값을 해당 클래스의 모든 메소드가 접근할 수 있도록 만든다.
let person = new Person("yongsu", "yongsusu", "password");
console.log(person.name);
console.log(person.userName);
// console.log(person.#password);

person.getPassword();
person.setPassword("password", "yongsuyongsu");
person.getPassword();

person.signup("sangho", "sanghoidiot", "hohoasshole");

// 사람 run ==> 군인 run
// 사람 eat ==> 군인
