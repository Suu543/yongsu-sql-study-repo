# Essential MySQL Functions

1. Numeric Functions
2. String Functions
3. Date Functions in MySQL
4. Formatting Dates and Times
5. Calculating Dates and Times
6. The IFNULL and COALESCE Functions
7. The IF Function
8. THE CASE Operator

## 1. Numeric Functions

MySQL의 Numeric Functions는 숫자와 관련된 작업을 수행하는 함수의 집합입니다. 이러한 함수들은 데이터베이스에서 숫자를 다룰 때 매우 유용합니다. 아래는 몇 가지 예시를 포함한 MySQL에서 사용 가능한 Numeric Functions의 목록입니다.

1. ABS(): 절대값을 반환합니다.
2. CEIL(): 주어진 숫자보다 크거나 같은 최소 정수를 반환합니다.
3. FLOOR(): 주어진 숫자보다 작거나 같은 최대 정수를 반환합니다.
4. ROUND(): 주어진 숫자를 반올림합니다.
5. MOD(): 나눗셈의 나머지를 반환합니다.
6. POW(): 지수 함수를 계산합니다.
7. SQRT(): 주어진 숫자의 제곱근을 반환합니다.
8. SIN(), COS(), TAN(): 삼각 함수를 계산합니다.
9. RAND(): 0과 1 사이의 임의의 값을 반환합니다.
10. SIGN(): 주어진 숫자의 부호를 반환합니다.

이러한 함수들은 수학적인 계산을 수행할 때 유용하며, 데이터베이스에서 수치 데이터를 처리할 때 매우 유용합니다.

```sql
-- ABS(): 숫자의 절대값을 반환합니다.
SELECT ABS(-10);
-- 결과: 10

SELECT ABS(10);
-- 결과: 10
```

```sql
-- CEIL(): 주어진 숫자보다 크거나 같은 최소 정수를 반환합니다.
SELECT CEIL(2.1);
-- 결과: 3

SELECT CEIL(5);
-- 결과: 5
```

```sql
-- FLOOR(): 주어진 숫자보다 작거나 같은 최대 정수를 반환합니다.
SELECT FLOOR(2.9);
-- 결과: 2

SELECT FLOOR(5);
-- 결과: 5
```

```sql
-- ROUND(): 주어진 숫자를 반올림합니다.
SELECT ROUND(2.4);
-- 결과: 2

SELECT ROUND(2.6);
-- 결과: 3
```

```sql
-- MOD(): 나눗셈의 나머지를 반환합니다.
SELECT MOD(10, 3);
-- 결과: 1

SELECT MOD(10, 2);
-- 결과: 0
```

```sql
-- POW(): 지수 함수를 계산합니다.
SELECT POW(2, 3);
-- 결과: 8

SELECT POW(10, 2);
-- 결과: 100
```

```sql
-- SQRT(): 주어진 숫자의 제곱근을 반환합니다.
SELECT SQRT(16);
-- 결과: 4

SELECT SQRT(25);
-- 결과: 5
```

```sql
-- SIN(), COS(), TAN(): 삼각 함수를 계산합니다.
SELECT SIN(90);
-- 결과: 0.8939966636005579

SELECT COS(90);
-- 결과: -0.4480736161291702

SELECT TAN(45);
-- 결과: 1.6197751905438615
```

```sql
-- RAND(): 0과 1 사이의 임의의 값을 반환합니다.
SELECT RAND();
-- 결과: 0.9035632007481291

SELECT RAND();
-- 결과: 0.10196248195670403
```

```sql
-- SIGN(): 주어진 숫자의 부호를 반환합니다.
SELECT SIGN(-5);
-- 결과: -1

SELECT SIGN(0);
-- 결과: 0

SELECT SIGN(5);
-- 결과: 1
```

## 2. String Functions

MySQL의 String Functions은 문자열과 관련된 작업을 수행하는 함수의 집합입니다. 이러한 함수들은 데이터베이스에서 문자열을 다룰 때 매우 유용합니다. 아래는 몇 가지 예시를 포함한 MySQL에서 사용 가능한 String Functions의 목록입니다.

1. CONCAT(): 두 개 이상의 문자열을 결합합니다.
2. LENGTH(): 문자열의 길이를 반환합니다.
3. SUBSTR(): 문자열의 일부를 반환합니다.
4. TRIM(): 문자열의 앞뒤 공백을 제거합니다.
5. UPPER(), LOWER(): 대문자 또는 소문자로 문자열을 변환합니다.
6. REPLACE(): 문자열에서 지정된 문자열을 새로운 문자열로 대체합니다.
7. LEFT(), RIGHT(): 문자열의 왼쪽 또는 오른쪽 일부를 반환합니다.
8. INSTR(): 문자열에서 지정된 문자열의 위치를 찾습니다.
9. LPAD(), RPAD(): 문자열을 지정된 길이로 패딩합니다.

```sql
-- CONCAT(): 두 개 이상의 문자열을 결합합니다.
SELECT CONCAT('Hello', 'World');
-- 결과: HelloWorld
```

```sql
-- LENGTH(): 문자열의 길이를 반환합니다.
SELECT LENGTH('Hello');
-- 결과: 5
```

```sql
-- SUBSTR(): 문자열의 일부를 반환합니다.
SELECT SUBSTR('Hello World', 1, 5);
-- 결과: Hello

SELECT SUBSTR('Hello World', 7);
-- 결과: World
```

```sql
-- TRIM(): 문자열의 앞뒤 공백을 제거합니다.
SELECT TRIM('  Hello  ');
-- 결과: Hello
```

```sql
-- UPPER(), LOWER(): 대문자 또는 소문자로 문자열을 변환합니다.
SELECT UPPER('hello');
-- 결과: HELLO

SELECT LOWER('WORLD');
-- 결과: world
```

```sql
-- REPLACE(): 문자열에서 지정된 문자열을 새로운 문자열로 대체합니다.
SELECT REPLACE('Hello World', 'World', 'Universe');
-- 결과: Hello Universe
```

```sql
-- LEFT(), RIGHT(): 문자열의 왼쪽 또는 오른쪽 일부를 반환합니다.
SELECT LEFT('Hello World', 5);
-- 결과: Hello

SELECT RIGHT('Hello World', 5);
-- 결과: World
```

```sql
-- INSTR(): 문자열에서 지정된 문자열의 위치를 찾습니다.
SELECT INSTR('Hello World', 'World');
-- 결과: 7
```

```sql
-- LPAD(), RPAD(): 문자열을 지정된 길이로 패딩합니다.
SELECT LPAD('Hello', 10, '-');
-- 결과: -----Hello

SELECT RPAD('Hello', 10, '-');
-- 결과: Hello-----
```

STRING Function 활용

```sql
USE sql_store;

SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;
```

## 3. Date Functions in MySQL

MySQL의 Date Functions은 날짜와 관련된 작업을 수행하는 함수의 집합입니다. 이러한 함수들은 데이터베이스에서 날짜 및 시간 데이터를 다룰 때 매우 유용합니다. 아래는 몇 가지 예시를 포함한 MySQL에서 사용 가능한 Date Functions의 목록입니다.

1. NOW(): 현재 날짜와 시간을 반환합니다.
2. DATE(): 날짜를 추출합니다.
3. EXTRACT(): 날짜 또는 시간의 특정 부분을 추출합니다.
4. DATE_ADD(), DATE_SUB(): 날짜에 대한 덧셈 또는 뺄셈을 수행합니다.
5. DATEDIFF(): 두 날짜 간의 차이를 반환합니다.
6. DATE_FORMAT(): 날짜를 특정 형식으로 포맷팅합니다.
7. DAYOFWEEK(), MONTH(), YEAR(): 날짜에서 특정 부분을 반환합니다.

```sql
-- NOW(): 현재 날짜와 시간을 반환합니다.
SELECT NOW();
-- 결과: 2023-03-27 09:45:01
```

```sql
-- DATE(): 날짜를 추출합니다.
SELECT DATE('2023-03-27 09:45:01');
-- 결과: 2023-03-27
```

```sql
-- EXTRACT(): 날짜 또는 시간의 특정 부분을 추출합니다.
SELECT EXTRACT(YEAR FROM '2023-03-27');
-- 결과: 2023

SELECT EXTRACT(MONTH FROM '2023-03-27');
-- 결과: 3

SELECT EXTRACT(DAY FROM '2023-03-27');
-- 결과: 27

SELECT EXTRACT(DAY FROM NOW());
-- 결과: 27

SELECT EXTRACT(MONTH FROM NOW());
-- 결과: 3
```

```sql
-- DATE_ADD(), DATE_SUB(): 날짜에 대한 덧셈 또는 뺄셈을 수행합니다.
SELECT DATE_ADD('2023-03-27', INTERVAL 1 DAY);
-- 결과: 2023-03-28

SELECT DATE_SUB('2023-03-27', INTERVAL 1 WEEK);
-- 결과: 2023-03-20
```

```sql
-- DATEDIFF(): 두 날짜 간의 차이를 반환합니다.
SELECT DATEDIFF('2023-03-27', '2023-03-20');
-- 결과: 7
```

```sql
-- DATE_FORMAT(): 날짜를 특정 형식으로 포맷팅합니다.
SELECT DATE_FORMAT('2023-03-27', '%Y/%m/%d');
-- 결과: 2023/03/27
```

```sql
-- DAYOFWEEK(), MONTH(), YEAR(): 날짜에서 특정 부분을 반환합니다.
SELECT DAYOFWEEK('2023-03-27');
-- 결과: 1 (일요일)

SELECT MONTH('2023-03-27');
-- 결과: 3

SELECT YEAR('2023-03-27');
-- 결과: 2023
```

Date Functions 활용

```sql
SELECT *
FROM orders
WHERE YEAR(order_date) = YEAR(NOW());
```

## 4. Formatting Dates and Times

MySQL의 Formatting Dates and Times은 날짜와 시간 데이터를 특정한 형식으로 포맷하는 것입니다. 이는 날짜와 시간 데이터를 더 쉽게 읽고 이해할 수 있도록 도와줍니다. 아래는 MySQL에서 사용 가능한 날짜 및 시간 포맷의 몇 가지 예시입니다.

1. %Y: 네 자리 연도를 반환합니다.
2. %y: 두 자리 연도를 반환합니다.
3. %m: 두 자리 월을 반환합니다.
4. %d: 두 자리 일을 반환합니다.
5. %H: 24시간 형식의 두 자리 시간을 반환합니다.
6. %h: 12시간 형식의 두 자리 시간을 반환합니다.
7. %i: 두 자리 분을 반환합니다.
8. %s: 두 자리 초를 반환합니다.

```sql
-- %Y: 네 자리 연도를 반환합니다.
SELECT DATE_FORMAT('2023-03-27', '%Y');
-- 결과: 2023
```

```sql
-- %y: 두 자리 연도를 반환합니다.

SELECT DATE_FORMAT('2023-03-27', '%y');
-- 결과: 23
```

```sql
-- %m: 두 자리 월을 반환합니다.
SELECT DATE_FORMAT('2023-03-27', '%m');
-- 결과: 03
```

```sql
-- %d: 두 자리 일을 반환합니다.
SELECT DATE_FORMAT('2023-03-27', '%d');
-- 결과: 27
```

```sql
-- %H: 24시간 형식의 두 자리 시간을 반환합니다.
SELECT DATE_FORMAT('2023-03-27 13:45:01', '%H');
-- 결과: 13
```

```sql
-- %h: 12시간 형식의 두 자리 시간을 반환합니다.
SELECT DATE_FORMAT('2023-03-27 13:45:01', '%h');
-- 결과: 01
```

```sql
-- %i: 두 자리 분을 반환합니다.
SELECT DATE_FORMAT('2023-03-27 13:45:01', '%i');
-- 결과: 45
```

```sql
-- %s: 두 자리 초를 반환합니다.
SELECT DATE_FORMAT('2023-03-27 13:45:01', '%s');
-- 결과: 01
```

위와 같은 형식들을 조합하여 복잡한 날짜 및 시간 포맷을 만들 수도 있습니다. 예를 들어, '2023-03-27 13:45:01'을 '03/27/23 01:45:01 PM'으로 포맷하는 경우:

```sql
SELECT DATE_FORMAT('2023-03-27 13:45:01', '%m/%d/%y %h:%i:%s %p');
-- 결과: 03/27/23 01:45:01 PM
```

```sql
SELECT DATE_FORMAT(NOW(), '%M, %d %Y');
SELECT DATE_FORMAT(NOW(), '%H:%i');
SELECT DATE_FORMAT(NOW(), '%H:%i %p');
```

Formatting Dates and Times는 데이터베이스에서 날짜와 시간 데이터를 처리할 때 매우 유용합니다.

## 5. Calculating Dates and Times

MySQL의 Calculating Dates and Times은 날짜 및 시간 데이터에 대한 연산을 수행하는 것입니다. 이를 통해 날짜와 시간 데이터의 차이, 덧셈, 뺄셈 등을 쉽게 계산할 수 있습니다.

아래는 MySQL에서 사용 가능한 일부 날짜 및 시간 계산 함수의 예시입니다.

1. NOW(): 현재 날짜와 시간을 반환합니다.
2. DATE_ADD(): 날짜 또는 시간에 특정 시간 단위를 추가합니다.
3. DATE_SUB(): 날짜 또는 시간에서 특정 시간 단위를 뺍니다.
4. DATEDIFF(): 두 날짜 간의 차이를 일 수로 반환합니다.
5. TIMESTAMPDIFF(): 두 날짜 또는 시간 간의 차이를 지정한 단위(초, 분, 시간, 일 등)로 반환합니다.
6. DATE_FORMAT(): 날짜 및 시간 데이터를 원하는 형식으로 포맷합니다.
7. ADDTIME(): 시간 값에 시간 값을 더합니다.
8. SUBTIME(): 시간 값에서 시간 값을 뺍니다.

```sql
-- NOW(): 현재 날짜와 시간을 반환합니다.
SELECT NOW();
-- 결과: 2023-03-27 10:00:00
```

```sql
-- DATE_ADD(): 날짜 또는 시간에 특정 시간 단위를 추가합니다.
SELECT DATE_ADD('2023-03-27 10:00:00', INTERVAL 1 HOUR);
-- 결과: 2023-03-27 11:00:00
```

```sql
-- DATE_SUB(): 날짜 또는 시간에서 특정 시간 단위를 뺍니다.
SELECT DATE_SUB('2023-03-27 10:00:00', INTERVAL 1 HOUR);
-- 결과: 2023-03-27 09:00:00
```

```sql
-- DATEDIFF(): 두 날짜 간의 차이를 일 수로 반환합니다.
SELECT DATEDIFF('2023-03-30', '2023-03-27');
-- 결과: 3
```

```sql
-- TIMESTAMPDIFF(): 두 날짜 또는 시간 간의 차이를 지정한 단위(초, 분, 시간, 일 등)로 반환합니다.
SELECT TIMESTAMPDIFF(MINUTE, '2023-03-27 10:00:00', '2023-03-27 11:30:00');
-- 결과: 90
```

```sql
-- DATE_FORMAT(): 날짜 및 시간 데이터를 원하는 형식으로 포맷합니다.
SELECT DATE_FORMAT('2023-03-27 10:00:00', '%Y-%m-%d');
-- 결과: 2023-03-27
```

```sql
-- ADDTIME(): 시간 값에 시간 값을 더합니다.
SELECT ADDTIME('10:00:00', '01:30:00');
-- 결과: 11:30:00
```

```sql
-- SUBTIME(): 시간 값에서 시간 값을 뺍니다.
SELECT SUBTIME('10:00:00', '01:30:00');
-- 결과: 08:30:00
```

```sql
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);
SELECT DATE_ADD(NOW(), INTERVAL 1 YEAR);
SELECT DATE_ADD(NOW(), INTERVAL -1 YEAR); -- Last Year
SELECT DATE_SUB(NOW(), INTERVAL 1 YEAR);
SELECT DATEDIFF('2019-01-05', '2019-01-01');
SELECT DATEDIFF('2019-01-05 09:00', '2019-01-01 17:00');
SELECT DATEDIFF('2019-01-01 17:00', '2019-01-05 09:00');
SELECT TIME_TO_SEC("09:00") - TIME_TO_SEC("09:02");
```

위와 같은 함수를 이용하여, 날짜와 시간 데이터에 대한 다양한 계산을 수행할 수 있습니다.

## 6. The IFNULL and COALESCE Functions

MySQL의 The IFNULL and COALESCE Functions은 NULL 값을 처리하는 함수입니다. NULL 값은 데이터베이스에서 아직 값이 할당되지 않은 경우 또는 값이 존재하지 않는 경우를 나타냅니다. 이러한 NULL 값을 처리하기 위해 IFNULL 및 COALESCE 함수를 사용할 수 있습니다.

1. IFNULL 함수

- IFNULL 함수는 첫 번째 매개변수가 NULL인 경우 두 번째 매개변수를 반환합니다.

```sql
SELECT IFNULL(NULL, 'default value');
-- 결과: 'default value'
```

2. COALESCE 함수

- COALESCE 함수는 매개변수 중 첫 번째로 NULL이 아닌 값을 반환합니다. 즉, COALESCE 함수는 여러 개의 매개변수 중 NULL이 아닌 값이 있는 경우 해당 값을 반환하며, 모든 매개변수가 NULL인 경우 NULL 값을 반환합니다.

```sql
SELECT COALESCE(NULL, 'default value', 'value1', NULL, 'value2');
-- 결과: 'default value'
```

위 예시에서, COALESCE 함수는 NULL이 아닌 'default value'를 반환합니다. 'value1'과 'value2'는 무시되었습니다.
따라서, IFNULL 함수와 COALESCE 함수는 NULL 값을 다룰 때 유용하게 사용될 수 있습니다.

The IFNULL and COALESCE Functions 활용

```sql
USE sql_store;

SELECT
    order_id,
    IFNULL(shipper_id, 'Not Assigned') AS shipper
FROM orders;
```

```sql
USE sql_store;

SELECT
    order_id,
    -- shipper_id가 null이라면 ==> comments ==> comments가 null이라면 ==> Not Assigned 할당
    COALESCE(shipper_id, comments, 'Not Assigned') AS shipper
FROM orders;
```

### The IFNULL and COALESCE Functions Exercise

```sql
SELECT
    CONCAT(first_name, ' ', last_name) AS customer,
    COALESCE(phone, "Unknown") AS phone
FROM customers;
```

## 7. The IF Function

MySQL의 IF 함수는 조건에 따라 값을 반환하는 함수입니다. IF 함수는 다음과 같은 형식으로 작성됩니다:

```sql
IF(condition, value_if_true, value_if_false)
```

condition은 평가할 조건입니다. 조건이 true인 경우, value_if_true가 반환되고, 조건이 false인 경우 value_if_false가 반환됩니다.

```sql
SELECT name, IF(score > 80, 'Pass', 'Fail') AS result FROM student;
```

위 예시에서, 학생의 이름과 점수가 포함된 student 테이블이 있다고 가정합니다. IF 함수를 사용하여 점수가 80점 이상인 경우 'Pass', 그렇지 않은 경우 'Fail'을 반환하는 result 열을 생성합니다.

IF 함수를 사용하면, 조건에 따라 결과를 반환할 수 있기 때문에 데이터베이스에서 유용하게 사용될 수 있습니다.

The IF Function 활용

```sql
SELECT
    order_id,
    order_date,
    IF(
        YEAR(order_date) = YEAR(NOW),
        'Active',
        'Archived') AS category
FROM orders
```

### The IF Function Exercise

```sql
USE sql_store;

SELECT
	product_id,
    name,
    COUNT(*) AS orders,
    IF (
		COUNT(*) > 1,
        'Many Times',
        'Once'
    ) AS frequency
FROM products
JOIN order_items USING(product_id)
GROUP BY product_id;
```

## 8. The CASE Operator

MySQL의 CASE Operator는 조건에 따라 값을 반환하는 연산자입니다. IF 함수와 유사하지만 더욱 복잡한 조건식을 다룰 수 있습니다. CASE Operator는 다음과 같은 형식으로 작성됩니다:

```sql
CASE
    WHEN condition1 THEN value1
    WHEN condition2 THEN value2
    ...
    ELSE default_value
END
```

여러 개의 조건문이 존재하며, 조건이 true인 경우에는 해당 값(value1, value2, ...)을 반환하고, 모든 조건이 false인 경우 default_value를 반환합니다.

```sql
SELECT name,
       CASE
           WHEN score >= 90 THEN 'A'
           WHEN score >= 80 THEN 'B'
           WHEN score >= 70 THEN 'C'
           WHEN score >= 60 THEN 'D'
           ELSE 'F'
       END AS grade
FROM student;
```

위 예시에서, 학생의 이름과 점수가 포함된 student 테이블이 있다고 가정합니다. CASE Operator를 사용하여 학생의 점수에 따라 A, B, C, D, F 등급을 부여하는 grade 열을 생성합니다.

CASE Operator는 복잡한 조건식을 다룰 수 있으며, 다양한 상황에서 유용하게 사용될 수 있습니다.

The CASE Operator 활용

```sql
SELECT
    order_id,
    CASE
        WHEN YEAR(order_date) = YEAR(NOW()) THEN 'Active'
        WHEN YEAR(order_date) = YEAR(NOW()) - 1 THEN 'Last Year'
        WHEN YEAR(order_date) < YEAR(NOW()) - 1 THEN 'Archived'
        ELSE 'Future'
    END AS category
FROM orders
```

### The CASE Operator Exercise

```sql
USE sql_store;

SELECT
	CONCAT(last_name, " ", first_name) AS customer,
    points,
    CASE
		WHEN points > 3000 THEN "GOLD"
        WHEN points > 2000 AND points < 3000 THEN "SILVER"
        ELSE "BRONZE"
	END AS category
FROM customers
ORDER BY customer;
```
