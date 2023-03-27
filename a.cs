// C# ver console.log
Console.WriteLine("Hello World"); // 끝에 띄어쓰기 발생
Console.Write("Hello World"); // 끝에 띄어쓰기 미발생'

// C# version 주석(comment)
// 한 줄 주석

// 이게 두 줄 이상의 주석이야 (multi-line)
/* */

// C# Variables(변수)
// C#은 변수를 정의하기 전에, 변수에 어떤 값을 담을 것인지 반드시 명시해줘야한다.

// 정수: integer
// byte (8bits): 0 ~ 255
// sbyte (8bits): -128 ~ 127
// int (32bits): -2,147,483,683 ~ 2,147,483,647
// uint (32bits): 0 ~ 4,294,975,295
// short (16bits): -32,768 ~ 32,767
// ushort (16bits): 0 ~ 65,535
// long: (64bits): -9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807
// ulong: (64bits): 0 ~ 18,446,744,073,709,551,615

// 8bit = 1byte 

// 소수: float
// float: (32bits = 4bytes): -3.402823e38 to 3.402823e38
// double: (64bits = 8bytes): ..
// decimal: (128bits = 16bytes)

// 문자: string
// char: (16bits = 2bytes)
// string: 

// 논리: bool
// bool: 1bit


// 정수 5를 담고 싶다
// myNum = 5
// let myNum = 5;
int 정수 = 5;
double 소수 = 5.99D;
float 소수플롯 = 5.99f;
bool 참 = true;
bool 거짓 = false;
char 한문자 = "a";
string 두문자 = "ab";

// C# Type Casting
// Implicit(함축) Casting (Automatic: 자동 형변환)
// chat ==> int ==> long ==> float ==> double (자동으로 형변환이 발생한다)
int myInt = 9; // int: 4 bytes
double myDouble = myInt; // int (4 bytes) ==> double (8 bytes)
// 더 큰 데이터 타입에 값을 담을 때는 자동으로 캐스팅이 발생한다: Automatic Casting

// Explicit (뚜렷한) Casting (Manually: 수동 형변환)
// double ==> float ==> long ==> int ==> char
double myDouble = 9.78;
int myInt = (int) myDouble;
bool myBool = true;

// Int ==> String
Convert.ToString(myInt);

// Int ==> Double
Convert.ToDouble(myInt);

// Double ==> Int
Convert.ToInt32(myDouble);

// Double ==> Int
Convert.ToInt64(myDouble);

// Bool ==> String
Convert.ToString(myBool)

// C# 언어가 세상에 나오기 전에 c/c++ 두 개의 언어가 존했다.
// 이 두 언어는 C/C++로 작성한 언어를 Native Code로 컴파일한다.
// 윈도우에서 작성한 코드는 리눅스 운영체제에서 작동하지 않는 문제가 생김
// 이 문제를 해결하고 ==> Java 커뮤니티를 모방해서 C#

