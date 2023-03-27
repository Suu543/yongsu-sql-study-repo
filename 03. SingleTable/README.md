# 단일 테이블에서 데이터 검색

1. The SELECT Statement and Clause
2. The WHERE Clause
3. The AND, OR, and NOT Operators
4. The IN Operator
5. The BETWEEN Operator
6. The LIKE Operator
7. The REGEXP Operator
8. The IS NULL Operator
9. The ORDER BY Clause
10. The LIMIT Clause

## 1. The SELECT Statement and Clause

기본적인 SELECT 구문 사용 방법

```sql
SELECT column1, column2, ...
FROM table_name;
```

- SELECT: 데이터베이스에서 데이터를 조회할 때 사용하는 예약어입니다.
- column1, column2, ...: 조회할 열(컬럼)의 이름을 쉼표로 구분하여 지정합니다. \* 기호를 사용하면 모든 열을 조회할 수 있습니다.
- FROM: 조회할 테이블의 이름을 지정합니다. 테이블 이름은 대소문자를 구분하지 않습니다.

SELECT 구문 예시

예를 들어, `employees` 테이블에서 `first_name`, `last_name`, `email` 열을 조회하려면 다음과 같이 `SELECT` 구문을 사용할 수 있습니다.

```sql
SELECT first_name, last_name, email
FROM employees;
```

- 조회 결과는 first_name, last_name, email 열에 해당하는 모든 레코드가 반환됩니다.
- 또는 \* 기호를 사용하여 모든 열을 조회할 수도 있습니다.

```sql
SELECT *
FROM employees;
```

- 조회 결과는 `employees` 테이블의 모든 열과 해당하는 모든 레코드가 반환됩니다.

- 또한 `WHERE 절`을 사용하여 특정 조건을 만족하는 레코드만 조회할 수 있습니다. 예를 들어, `employees` 테이블에서 `department` 열이 `Sales`인 레코드만 조회하려면 다음과 같이 `SELECT` 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE department = 'Sales';
```

- 조회 결과는 `employees` 테이블에서 `department` 열이 `Sales`인 모든 레코드가 반환됩니다.

SELECT 구문 활용 예시

```sql
USE sql_store;

SELECT *
FROM customers
WHERE customer_id = 1
ORDER BY fisrt_name
```

```sql
SELECT
    last_name,
    first_name,
    points,
    (points + 10) * 100 AS discount_factor
FROM customers
```

띄어쓰기를 포함한 이름을 작성하고 싶은 경우

```sql
SELECT
    last_name,
    first_name,
    points,
    (points + 10) * 100 AS discount_factor
FROM customers
```

```sql
SELECT state
FROM sql_store.customers;
```

중복된 값은 제외하고, `state` 집합을 확인하고 싶은 경우

```sql
SELECT DISTINCT state
FROM customers;
```

### SELECT Exercise

```sql
-- Return all the products
--  name
--  unit price
--  new price (unit price * 1.1)
```

```sql
SELECT
    name,
    unit_price,
    unit_price * 1.1 AS new_price
FROM products
```

## 2. The WHERE Clause

기본적인 WHERE 구문 사용 방법

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

- SELECT: 데이터베이스에서 데이터를 조회할 때 사용하는 예약어입니다.
- column1, column2, ...: 조회할 열(컬럼)의 이름을 쉼표로 구분하여 지정합니다. \* 기호를 사용하면 모든 열을 조회할 수 있습니다.
- FROM: 조회할 테이블의 이름을 지정합니다. 테이블 이름은 대소문자를 구분하지 않습니다.
- WHERE: 조회할 레코드의 조건을 지정합니다. 이 조건은 참(True) 또는 거짓(False)을 반환해야 합니다.

WHERE 구문 예시 <br />

예를 들어, employees 테이블에서 department 열이 Sales인 레코드만 조회하려면 다음과 같이 WHERE 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE department = 'Sales';
```

조회 결과는 employees 테이블에서 department 열이 Sales인 모든 레코드가 반환됩니다.

WHERE 구문에서 비교 연산자를 사용하여 레코드를 조회할 수도 있습니다. 예를 들어, employees 테이블에서 salary 열이 50000 이상인 레코드만 조회하려면 다음과 같이 WHERE 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE salary >= 50000;
```

조회 결과는 employees 테이블에서 salary 열이 50000 이상인 모든 레코드가 반환됩니다.

또한 WHERE 구문에서 논리 연산자를 사용하여 여러 조건을 결합하여 레코드를 조회할 수도 있습니다. 예를 들어, employees 테이블에서 department 열이 Sales이고 salary 열이 50000 이상인 레코드만 조회하려면 다음과 같이 WHERE 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE department = 'Sales' AND salary >= 50000;
```

조회 결과는 employees 테이블에서 department 열이 Sales이고 salary 열이 50000 이상인 모든 레코드가 반환됩니다.

WHERE 구문 활용 예시

```sql
>
>=
<
<=
=
!= OR <>
```

```sql
SELECT *
FROM customers
WHERE state != "VA"
```

```sql
SELECT *
FROM customers
WHERE state <> "VA"
```

```sql
SELECT *
FROM customers
WHERE birth_date > '1990-01-01'
```

### WHERE Exercise

```sql
-- GET the orders placed since 2019
```

```sql
SELECT *
FROM orders
WHERE order_date >= '2019-01-01'
```

## 3. The AND, OR, and NOT Operators

MySQL에서 AND, OR, NOT 연산자는 WHERE 구문에서 논리적인 연산을 수행할 때 사용됩니다. 각 구문의 사용 방법과 예시는 다음과 같습니다.

AND 구문 사용 방법

AND 구문은 WHERE 구문에서 두 개 이상의 조건이 모두 참일 때 레코드를 선택하는 데 사용됩니다. 아래는 AND 구문의 기본적인 사용 방법입니다.

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition1 AND condition2 AND condition3 ...;
```

- condition1, condition2, condition3, ... : AND 구문으로 연결된 조건들입니다. 각각의 조건이 모두 참(True)인 경우에만 해당 레코드가 선택됩니다.

AND 구문 예시

예를 들어, employees 테이블에서 department 열이 'Sales'이고 salary 열이 50000 이상인 레코드만 조회하려면 다음과 같이 AND 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE department = 'Sales' AND salary >= 50000;
```

조회 결과는 employees 테이블에서 department 열이 'Sales'이고 salary 열이 50000 이상인 모든 레코드가 반환됩니다.

OR 구문 사용 방법

OR 구문은 WHERE 구문에서 두 개 이상의 조건 중 하나 이상이 참일 때 레코드를 선택하는 데 사용됩니다. 아래는 OR 구문의 기본적인 사용 방법입니다.

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition1 OR condition2 OR condition3 ...;
```

OR 구문 예시

예를 들어, employees 테이블에서 department 열이 'Sales'이거나 salary 열이 50000 이상인 레코드를 조회하려면 다음과 같이 OR 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE department = 'Sales' OR salary >= 50000;
```

조회 결과는 employees 테이블에서 department 열이 'Sales'이거나 salary 열이 50000 이상인 모든 레코드가 반환됩니다.

NOT 구문 사용 방법

NOT 구문은 WHERE 구문에서 조건의 반대인 레코드를 선택하는 데 사용됩니다. 아래는 NOT 구문의 기본적인 사용 방법입니다.

```sql
SELECT column1, column2, ...
FROM table_name
WHERE NOT condition;
```

- condition: 조건입니다. 해당 조건의 반대인 레코드가 선택됩니다.

NOT 구문 예시

예를 들어, employees 테이블에서 department 열이 'Sales'이 아닌 레코드를 조회하려면 NOT 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE NOT department = 'Sales';
```

조회 결과는 employees 테이블에서 department 열이 'Sales'가 아닌 모든 레코드가 반환됩니다.

위 예시에서 department 열이 'Sales'인 레코드의 조건을 부정(negation)함으로써 department 열이 'Sales'가 아닌 레코드를 선택했습니다. NOT 구문은 WHERE 구문에서 다른 논리적 연산자인 AND, OR와 함께 사용될 수도 있습니다.

AND, OR, NOT 연산자 활용 예시

```sql
SELECT *
FROM customers
WHERE birth_date > '1990-01-01' AND points > 1000
```

```sql
SELECT *
FROM customers
WHERE birth_date > '1990-01-01' OR points > 1000
```

```sql
SELECT *
FROM customers
WHERE birth_date > '1990-01-01' OR
    (points > 1000 AND state = 'VA')
```

```sql
SELECT *
FROM customers
WHERE NOT birth_date > '1990-01-01' OR points > 1000
```

```sql
SELECT *
FROM customers
WHERE birth_date <= '1990-01-01' AND points <= 1000
```

### AND, OR, and NOT Exercise

```sql
-- From the order_items, get the items
--  for order #6
--  where the total price is greater than 30
```

```sql
SELECT *
FROM order_items
WHERE order_id = 6 AND unit_price * quantity > 30
```

## 4. The IN Operator

MySQL IN 연산자는 WHERE 구문에서 여러 개의 값을 비교할 때 사용됩니다. IN 연산자를 사용하면 OR 구문을 사용하지 않고도 여러 개의 값 중 하나와 일치하는 레코드를 검색할 수 있습니다.

다음은 IN 연산자를 사용한 예시입니다. employees 테이블에서 department 열이 'Sales' 또는 'Marketing'인 레코드를 조회하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE department IN ('Sales', 'Marketing');
```

위의 SQL 구문은 employees 테이블에서 department 열이 'Sales' 또는 'Marketing' 중 하나인 레코드를 선택합니다. IN 연산자는 괄호 안에 비교할 값들을 쉼표로 구분해서 나열합니다.

IN 연산자는 문자열, 숫자, 날짜 등 모든 데이터 타입에 대해 사용할 수 있습니다. 예를 들어, salary 열에서 특정 급여 범위에 속하는 레코드를 검색할 때도 IN 연산자를 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE salary IN (50000, 60000, 70000);
```

위의 SQL 구문은 salary 열이 50000, 60000, 70000 중 하나인 레코드를 선택합니다.

IN 연산자 활용 예시

```sql
-- Before IN Operator
SELECT *
FROM customers
WHERE state = 'VA' OR state 'GA' OR state = 'FL'
```

```sql
SELECT *
FROM customers
WHERE state IN ('VA','GA','FL')
```

```sql
SELECT *
FROM customers
WHERE state NOT IN ('VA','GA','FL')
```

### IN Exercise

```sql
-- Return products with
--  quantity in stock equal to 49, 38, 72
```

```sql
SELECT *
FROM products
WHERE quantity_in_stock IN (49, 38, 72)
```

## 5. The BETWEEN Operator

MySQL BETWEEN 연산자는 WHERE 구문에서 지정된 범위 내에 있는 값을 선택할 때 사용됩니다. BETWEEN 연산자는 AND 연산자를 사용하여 범위를 지정합니다.

다음은 BETWEEN 연산자를 사용한 예시입니다. employees 테이블에서 salary 열이 50000에서 60000 사이인 레코드를 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE salary BETWEEN 50000 AND 60000;
```

위의 SQL 구문은 employees 테이블에서 salary 열이 50000에서 60000 사이인 레코드를 선택합니다.

BETWEEN 연산자는 문자열, 숫자, 날짜 등 모든 데이터 타입에 대해 사용할 수 있습니다. 예를 들어, hire_date 열에서 특정 기간에 입사한 레코드를 선택할 때도 BETWEEN 연산자를 사용할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE hire_date BETWEEN '2000-01-01' AND '2005-12-31';
```

위의 SQL 구문은 employees 테이블에서 hire_date 열이 2000년 1월 1일부터 2005년 12월 31일까지인 레코드를 선택합니다.

BETWEEN 연산자 활용 예시

```sql
-- Before BETWEEN
SELECT *
FROM customers
WHERE points >= 1000 AND points <= 3000
```

```sql
SELECT *
FROM customers
WHERE points BETWEEN 1000 AND 3000
```

### BETWEEN Exercise

```sql
-- Return customers born
--  between 1/1/1990 and 1/1/2000
```

```sql
SELECT *
FROM customers
WHERE birth_date BETWEEN '1990-01-01' AND '2000-01-01'
```

## 6. The LIKE Operator

MySQL LIKE 연산자는 WHERE 구문에서 패턴 매칭을 수행할 때 사용됩니다. LIKE 연산자는 문자열 검색에 매우 유용한데, 특정 문자열이 다른 문자열 내에 있는지, 특정 패턴을 따르는 문자열이 있는지 등을 검색할 때 사용됩니다.

MySQL LIKE 연산자는 다음과 같은 와일드카드 문자를 사용할 수 있습니다.

- %: 0개 이상의 문자를 대체합니다.
- \_: 하나의 문자를 대체합니다.

다음은 LIKE 연산자를 사용한 예시입니다. employees 테이블에서 last_name 열이 'S%'로 시작하는 레코드를 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE last_name LIKE 'S%';
```

위의 SQL 구문은 employees 테이블에서 last_name 열이 'S'로 시작하는 레코드를 선택합니다. '%' 와일드카드 문자를 사용하여 'S' 이후에 0개 이상의 문자가 올 수 있도록 지정했습니다.

다음은 \_ 와일드카드 문자를 사용한 예시입니다. employees 테이블에서 first_name 열이 두 글자인 레코드를 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE first_name LIKE '__';
```

위의 SQL 구문은 employees 테이블에서 first_name 열이 두 글자인 레코드를 선택합니다. \* 와일드카드 문자를 사용하여 두 글자가 올 수 있도록 지정했습니다.

LIKE 연산자 활용 예시

last_name이 `b`로 시작하는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE 'b%'
```

last_name이 `brush`로 시작하는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE 'brush%'
```

last_name 중간에 `b`를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE '%b%'
```

last_name이 `y`로 끝나는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE '%y'
```

last_name이 `y`로 끝나고 총 두 글자인 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE '_y'
```

last_name이 `y`로 끝나고 총 여섯 글자인 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE '_____y'
```

last_name이 `b`로 시작하고 `y`로 끝나는 총 여섯 글자인 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name LIKE 'b____y'
```

### BETWEEN Exercise

```sql
-- Get the customers whose
--  addresses contain TRAIL or AVENUE
--  phone numbers end with 9
```

```sql
SELECT *
FROM customers
WHERE address LIKE '%trail%' OR
    address LIKE '%avenue%'
```

```sql
SELECT *
FROM customers
WHERE phone LIKE '%9'
```

```sql
SELECT *
FROM customers
WHERE phone NOT LIKE '%9'
```

## 7. The REGEXP Operator

MySQL REGEXP 연산자는 WHERE 구문에서 정규 표현식을 사용하여 패턴 매칭을 수행할 때 사용됩니다. REGEXP 연산자는 LIKE 연산자와 유사하지만, 더욱 강력한 문자열 검색을 가능하게 합니다.

다음은 REGEXP 연산자를 사용한 예시입니다. employees 테이블에서 last_name 열이 'Patel' 또는 'Harris'인 레코드를 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE last_name REGEXP 'Patel|Harris';
```

위의 SQL 구문은 employees 테이블에서 last_name 열이 'Patel' 또는 'Harris'인 레코드를 선택합니다. '|' 기호는 OR 연산자와 같은 역할을 수행합니다.

REGEXP 연산자는 정규 표현식을 사용하기 때문에, 다양한 패턴 매칭을 가능하게 합니다. 예를 들어, employees 테이블에서 first_name 열이 알파벳 대문자로 시작하는 레코드를 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE first_name REGEXP '^[A-Z]';
```

위의 SQL 구문은 employees 테이블에서 first_name 열이 알파벳 대문자로 시작하는 레코드를 선택합니다. '^' 기호는 문자열의 시작 위치를 나타내며, '[A-Z]' 패턴은 알파벳 대문자를 의미합니다. 따라서, 이 구문은 first_name 열의 첫 글자가 알파벳 대문자인 레코드를 선택합니다. '$' 기호는 문자열의 끝 위치를 의미합니다.

- '^': 시작
- '$': 끝
- | : 논리 연사자 (or)
- [abcd]: a or b or c or d
- [a-f]: 소문자 a ~ f 패턴

REGEXP 연산자 활용 예시

```sql
-- Before REGEXP
SELECT *
FROM customers
WHERE last_name LIKE '%field%'
```

```sql
-- REGEXP
SELECT *
FROM customers
WHERE last_name REGEXP 'field'
```

last_name이 field 문자열로 시작하는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP '^field'
```

last_name이 field 문자열로 끝나는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'field$'
```

last_name에 'field' or 'mac' or 'rose' 문자열을 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'field|mac|rose'
```

last_name이 'field'로 시작하거나 혹은 'mac' or 'rose'를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP '^field|mac|rose'
```

last_name이 'field'로 끝나거나 혹은 'mac' or 'rose'를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'field$|mac|rose'
```

last_name에 문자 'e'를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'e'
```

last_name에 'ge' or 'ie' or 'me'를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP '[gim]e'
```

last_name에 'ef' or 'em' or 'eq'를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'e[fmq]'
```

last_name에 'ae' or 'be' or 'ce' or 'de' or 'ee' or 'fe' or 'ge'를 포함하고 있는 고객을 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE last_name REGEXP '[a-h]e'
```

### REGEXP Exercise

```sql
-- Get the customers whose
--  first names are ELKA or AMBUR
--  last names end with EY or ON
--  last names start with MY or contains SE
--  last names contain B followed by R or U
```

```sql
SELECT *
FROM customers
WHERE first_name REGEXP 'elka|ambur'
```

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'ey$|on$'
```

```sql
SELECT *
FROM customers
WHERE last_name REGEXP '^my|se'
```

```sql
SELECT *
FROM customers
WHERE last_name REGEXP 'b[ru]'
```

## 8. The IS NULL Operator

MySQL IS NULL 연산자는 WHERE 구문에서 NULL 값인 레코드를 선택할 때 사용됩니다.

다음은 IS NULL 연산자를 사용한 예시입니다. employees 테이블에서 salary 열이 NULL인 레코드를 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE salary IS NULL;
```

위의 SQL 구문은 employees 테이블에서 salary 열이 NULL인 레코드를 선택합니다.

IS NULL 연산자는 NULL 값이 아닌 레코드는 선택하지 않습니다. 따라서, employees 테이블에서 salary 열이 NULL이 아닌 레코드를 선택하려면 IS NOT NULL 연산자를 사용해야 합니다.

```sql
SELECT *
FROM employees
WHERE salary IS NOT NULL;
```

위의 SQL 구문은 employees 테이블에서 salary 열이 NULL이 아닌 레코드를 선택합니다.

IS NULL 연산자 활용 예시

customers 레코드를 조회했을 때 NULL 값이 할당된 레코드를 확인할 수 있습니다.

```sql
SELECT *
FROM customers
```

customers 레코드 중 phone 열이 NULL인 레코드를 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE phone IS NULL
```

customers 레코드 중 phone 열이 NULL인 아닌 레코드를 조회해보겠습니다.

```sql
SELECT *
FROM customers
WHERE phone IS NOT NULL
```

### IS NULL Exercise

```sql
-- Get the oreders that are not shipped
```

```sql
SELECT *
FROM sql.store.orders
```

```sql
SELECT *
FROM orders
WHERE shipped_date IS NULL
```

## 9. The ORDER BY Clause

MySQL ORDER BY 구문은 SELECT 구문의 결과를 정렬하는 데 사용됩니다. ORDER BY 구문은 하나 이상의 열을 지정하여 결과를 정렬하며, 기본적으로 오름차순으로 정렬됩니다. ORDER BY 구문은 기본값으로 기본키(Primary)를 기준으로 동작합니다.

다음은 ORDER BY 구문을 사용한 예시입니다. employees 테이블에서 salary 열을 내림차순으로 정렬하여 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
ORDER BY salary DESC;
```

위의 SQL 구문은 employees 테이블에서 salary 열을 내림차순으로 정렬하여 모든 열을 선택합니다.

ORDER BY 구문을 사용할 때는 열 이름 뒤에 ASC(오름차순) 또는 DESC(내림차순) 키워드를 지정할 수 있습니다. 또한, ORDER BY 구문은 하나 이상의 열을 지정하여 정렬할 수 있으며, 다중 열 정렬도 가능합니다. 예를 들어, employees 테이블에서 department 열을 먼저 오름차순으로 정렬한 다음, salary 열을 내림차순으로 정렬하여 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
ORDER BY department ASC, salary DESC;
```

위의 SQL 구문은 employees 테이블에서 department 열을 먼저 오름차순으로 정렬하고, 그 다음에 salary 열을 내림차순으로 정렬하여 모든 열을 선택합니다.

ORDER BY 연산자 활용 예시

first_name 기준으로 레코드를 정렬해보겠습니다.

```sql
SELECT *
FROM customers
ORDER BY first_name
```

first_name 기준으로 레코드를 내림차순 정렬해보겠습니다.

```sql
SELECT *
FROM customers
ORDER BY first_name DESC
```

state 열을 먼저 오름차순으로 정렬하고, 그다음에 first_name 열을 오름차순으로 정렬해보겠습니다.

```sql
SELECT *
FROM customers
ORDER BY state, first_name
```

state 열을 먼저 내림차순으로 정렬하고, 그다음에 first_name 열을 내림차순으로 정렬해보겠습니다.

```sql
SELECT *
FROM customers
ORDER BY state DESC, first_name DESC
```

birth_date 열을 오름차순으로 정렬하고, first_name 열과 last_name 열을 선택하겠습니다.

```sql
SELECT first_name, last_name
FROM customers
ORDER BY birth_date
```

SELECT 구문에 정의한 순서대로 별명을 이용할 수 있습니다. 다음 예시에서 first_name은 1번, last_name은 2번으로 간주합니다.

```sql
SELECT first_name, last_name
FROM customers
ORDER BY 1, 2
```

### ORDER BY Exercise

```sql
-- order_id | product_id | quantity | unit_price | total_price
-- 2          1            2          9.10         18.20
-- 2          4            4          1.66         6.64
-- 2          6            2          2.94         5.88
```

```sql
SELECT *, quantity * unit_price AS total_price
FROM order_items
WHERE order_id = 2
ORDER BY total_price DESC
```

## 10. The LIMIT Clause

MySQL LIMIT 구문은 SELECT 구문의 결과에서 반환되는 행의 수를 제한하는 데 사용됩니다. LIMIT 구문은 SELECT 구문의 끝에 추가하며, LIMIT 다음에는 반환할 행의 개수를 지정합니다.

다음은 LIMIT 구문을 사용한 예시입니다. employees 테이블에서 salary 열이 50000 이상인 레코드 중에서 5개의 레코드만 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE salary >= 50000
LIMIT 5;
```

위의 SQL 구문은 employees 테이블에서 salary 열이 50000 이상인 레코드 중에서 5개의 레코드만 선택합니다.

LIMIT 구문은 시작 행을 지정하는 OFFSET 절과 함께 사용하여 특정 범위의 행을 선택할 수도 있습니다. 예를 들어, employees 테이블에서 salary 열이 50000 이상인 레코드 중에서 6번째부터 10개의 레코드만 선택하려면 다음과 같이 SQL 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
WHERE salary >= 50000
LIMIT 10 OFFSET 5;
```

위의 SQL 구문은 employees 테이블에서 salary 열이 50000 이상인 레코드 중에서 6번째부터 10개의 레코드만 선택합니다. LIMIT 10은 10개의 레코드를 반환하도록 지정하고, OFFSET 5는 결과에서 처음 5개의 레코드를 건너뛰도록 지정합니다.

LIMIT은 페이지 당 출력되는 레코드 개수를 구현할 때 유용하게 사용할 수 있습니다.

LIMIT 연산자 활용 예시

```sql
SELECT *
FROM customers
LIMIT 300
-- page 1: 1 - 3
-- page 2: 4 - 6
-- page 3: 7 - 9
```

처음 6개의 레코드는 무시하고, 이후 3개만 보고 싶을 때 다음과 같이 작성할 수 있습니다.

```sql
SELECT *
FROM customers
LIMIT 6, 3
```

### LIMIT Exercise

```sql
-- Get the top three loyal customers
```

```sql
SELECT *
FROM customers
ORDER BY points DESC
LIMIT 3
```
