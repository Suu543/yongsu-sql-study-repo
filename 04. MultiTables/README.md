# MySQL JOIN - Multiple Tables

관계형 데이터베이스에서 데이터는 여러 개의 테이블에 분산되어 저장됩니다. 이러한 데이터를 효과적으로 관리하고 검색하기 위해서는 테이블을 연결하는 JOIN이 필요합니다. MySQL JOIN은 두 개 이상의 테이블에서 데이터를 결합하여 하나의 결과 집합을 만들어주는 SQL 구문입니다. 이를 사용하여 데이터를 다양한 방법으로 분석하고, 복잡한 질의를 실행할 수 있습니다. 이 글에서는 MySQL JOIN의 개념과 종류, 그리고 각각의 사용 방법에 대해 자세히 살펴보겠습니다.

MySQL JOIN의 실생활 예시를 들어보면, 예를 들어 회사에서 직원 정보와 부서 정보를 관리하는 데이터베이스가 있다고 가정해보겠습니다. 이 경우, 직원 정보와 부서 정보는 각각 별도의 테이블에 저장됩니다. 직원 정보에는 각 직원의 이름, 부서 ID, 입사일 등이 포함되어 있고, 부서 정보에는 부서 ID, 부서 이름, 부서 위치 등이 포함되어 있습니다.

이때, 직원 이름과 함께 속한 부서 이름을 출력하려면, 두 개의 테이블을 JOIN하여야 합니다. 이를 위해 직원 정보 테이블과 부서 정보 테이블을 부서 ID를 기준으로 연결할 수 있습니다. 이렇게 JOIN을 통해 두 테이블의 데이터를 결합하면, 직원 이름과 함께 속한 부서 이름을 출력하는 결과를 얻을 수 있습니다. 이와 같이 JOIN을 사용하면 복잡한 데이터 분석 작업을 보다 쉽게 수행할 수 있습니다.

목차

1. Inner Joins
2. Joining Across Databases
3. Self Joins
4. Joining Multiple Tables
5. Compound Join Conditions
6. Implicit Join Syntax
7. Outer Joins
8. Outer Join Between Multiple Tables
9. Self Outer Joins
10. The USING Clause
11. Natural Joins
12. Cross Joins
13. Unions

## 1. Inner Joins

MySQL INNER JOIN은 두 개 이상의 테이블에서 데이터를 가져와 조합하는 SQL 구문 중 하나입니다. INNER JOIN은 데이터베이스에서 가장 많이 사용되는 Join 유형 중 하나이며, 다른 테이블에서 일치하는 열 값을 찾아 조합합니다.

INNER JOIN의 주요 목적은 데이터베이스에서 관련된 정보를 결합하는 것입니다. INNER JOIN을 사용하면 여러 테이블에서 정보를 가져와 연관된 정보를 단일 결과 집합으로 결합할 수 있습니다. 예를 들어, "주문" 테이블과 "제품" 테이블이 있을 때, INNER JOIN을 사용하여 각 주문에 대한 제품 정보를 가져와서 결합할 수 있습니다. 이를 통해 테이블 간 관계를 이해하고, 더 복잡한 쿼리를 작성할 수 있습니다.

또한 INNER JOIN은 불필요한 데이터를 제거하여 쿼리 성능을 향상시킵니다. INNER JOIN을 사용하면 조인하는 두 테이블 중 어느 한쪽의 데이터만 가져올 수 없습니다. 두 테이블 모두에서 일치하는 데이터만 가져오므로, INNER JOIN을 사용하여 검색하면 검색 결과가 정확해지고 불필요한 데이터를 걸러낼 수 있습니다.

따라서, INNER JOIN은 데이터베이스에서 두 개 이상의 테이블에서 정보를 가져와 관련된 정보를 결합하고, 쿼리 성능을 향상시키는 데 사용됩니다.

INNER JOIN은 두 개의 테이블에서 일치하는 행만을 반환합니다. INNER JOIN은 특정 테이블에서 값이 없는 경우, 결과에 포함되지 않습니다.

아래는 INNER JOIN을 사용하여 두 개의 테이블을 결합하는 예시입니다.

```sql
SELECT *
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id;
```

위 예시에서는 "employees"와 "departments"라는 두 개의 테이블을 INNER JOIN을 사용하여 결합하고 있습니다. "employees" 테이블에는 "employee_id", "employee_name", "department_id" 등의 열이 있으며, "departments" 테이블에는 "department_id", "department_name" 등의 열이 있습니다.

INNER JOIN 구문에서는 먼저 "FROM" 구문에서 두 개의 테이블을 선택합니다. 그리고 "INNER JOIN" 구문에서는 두 개의 테이블을 연결할 기준이 되는 열을 지정해 줍니다. 위 예시에서는 "employees.department_id"와 "departments.department_id"가 일치하는 경우에 두 개의 테이블에서 데이터를 가져오게 됩니다.

위 예시에서는 "\*" 기호를 사용하여 두 개의 테이블에서 모든 열을 가져오고 있습니다. INNER JOIN을 사용하면, 두 개의 테이블에서 값이 일치하는 행만을 반환하므로, "employees" 테이블에서 값이 없는 "department_id"의 경우 결과에 포함되지 않습니다. 결과적으로는 "employees" 테이블에서 값이 있는 "employee_name"과 "departments" 테이블에서 값이 있는 "department_name"을 결합한 결과가 반환됩니다.

INNER JOIN 활용 예시

```sql
SELECT order_id, orders.customer_id, first_name, last_name
FROM orders
-- INNER는 생략 가능합니다.
INNER JOIN customers
ON orders.customer_id = customers.customer_id
```

```sql
SELECT order_id, o.customer_id, first_name, last_name
FROM orders o
INNER JOIN customers c
ON o.customer_id = c.customer_id
```

```sql
SELECT order_id, oi.product_id, quantity, unit_price
FROM order_items oi
JOIN products p
ON oi.product_id = p.product_id
```

## 2. Joining Across Databases

MySQL에서 여러 개의 데이터베이스가 있을 때, 때로는 두 개 이상의 데이터베이스에 있는 테이블을 조인해야 할 경우가 있습니다. 이를 "cross-database joining" 또는 "joining across databases"라고 합니다.

Joining Across Databases는 주로 데이터베이스 간의 데이터를 분석하거나 비교해야 할 때 사용됩니다. 예를 들어, 하나의 데이터베이스에는 고객 정보가 저장되어 있고, 다른 데이터베이스에는 주문 정보가 저장되어 있을 경우, 이 두 데이터베이스를 조인하여 특정 고객의 주문 내역을 얻을 수 있습니다.

Joining Across Databases는 데이터를 복사하거나 이동하지 않고도 여러 데이터베이스 간의 관계를 구축할 수 있으므로, 데이터 일관성을 유지하면서 데이터를 분석하거나 비교할 수 있습니다. 그러나 이는 일반적으로 하나의 데이터베이스에 모든 데이터를 저장하는 것이 더 효율적인 경우가 많습니다.

MySQL에서 Joining Across Databases(데이터베이스 간 조인)을 수행하려면, 각 데이터베이스에 접근할 수 있는 권한을 가진 사용자로 로그인한 후, 데이터베이스 명을 사용하여 각 데이터베이스의 테이블을 명시해야 합니다.

아래는 두 개의 데이터베이스에서 테이블을 Join하는 예시입니다.

```sql
SELECT *
FROM database1.table1
INNER JOIN database2.table2
ON database1.table1.column1 = database2.table2.column2;
```

위 예시에서는 "database1" 데이터베이스에 있는 "table1" 테이블과 "database2" 데이터베이스에 있는 "table2" 테이블을 INNER JOIN을 사용하여 결합하고 있습니다. INNER JOIN 구문에서는 두 개의 테이블을 연결할 기준이 되는 열을 지정해 줍니다. 위 예시에서는 "database1.table1.column1"과 "database2.table2.column2"가 일치하는 경우에 두 개의 테이블에서 데이터를 가져오게 됩니다.

위 예시에서는 "\*" 기호를 사용하여 두 개의 테이블에서 모든 열을 가져오고 있습니다. 두 개의 데이터베이스 간 조인을 수행할 때는, 각 데이터베이스에서 가져온 데이터를 정확하게 구분하기 위해 각 열의 소유자인 데이터베이스 이름을 함께 명시해 주는 것이 좋습니다.

Joining Across Databases를 수행할 때에는, 데이터베이스 간의 테이블 Join이므로, Join에 사용되는 필드들의 데이터 형식과 인덱스 설정 등의 성능적인 측면도 고려해야 합니다.

Joining Across Databases 활용 예시

```sql
SELECT *
FROM order_items oi
JOIN sql_inventory.products p
ON oi.product_id = p.product_id
```

```sql
USE sql_inventory

SELECT *
FROM sql_store.order_items oi
JOIN products p
ON oi.product_id = p.product_id
```

### Joining Across Databases Exercise

## 3. Self Joins

MySQL Self Join은 하나의 테이블을 자기 자신과 조인하는 것을 말합니다. 이를 사용하면 같은 테이블 내에서 다른 레코드와 관계를 분석하거나 비교할 수 있습니다.

Self Join의 대표적인 예시는 계층적 데이터를 처리하는 것입니다. 예를 들어, 조직도에서 각 부서와 부서에 속한 직원을 나타내는 테이블이 있다고 가정해보겠습니다. 이 경우, Self Join을 사용하여 각 직원의 관리자를 찾을 수 있습니다.

다른 예시로는 셀프 조인을 사용하여 연속된 일자 간의 데이터를 비교하는 것입니다. 예를 들어, 일일 주식 가격 데이터가 포함된 테이블이 있다고 가정하면, Self Join을 사용하여 현재 일자와 이전 일자의 주식 가격을 비교할 수 있습니다.

Self Join을 사용하여 테이블 내에서 관계를 분석하고 비교하는 것은 데이터베이스에서 일반적으로 사용되는 기술 중 하나입니다. Self Join을 사용하면 데이터를 효율적으로 검색하고 정리할 수 있으며, 계층적 데이터나 연속된 데이터와 같은 특정 데이터 유형을 처리하는 데 유용합니다.

예시로 Self Join을 사용하여 조직도의 관리자를 찾는 쿼리를 살펴보겠습니다. 이 예시에서는 employees 테이블이 다음과 같은 구조로 구성되어 있다고 가정합니다.

```sql
id  | name      | manager_id
----|-----------|-----------
1   | Alice     | NULL
2   | Bob       | 1
3   | Charlie   | 2
4   | Dave      | 3
5   | Eve       | 1
```

이 테이블에서 각 직원의 관리자를 찾기 위해 Self Join을 사용할 수 있습니다. 다음 쿼리는 이를 수행하는 예시입니다.

```sql
SELECT e1.name AS employee, e2.name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id
```

위 쿼리에서는 employees 테이블을 e1과 e2 두 개의 별칭으로 사용하고 있습니다. Self Join을 수행하기 위해 e1.manager_id와 e2.id를 비교하고 있으며, 각 직원의 이름과 그 직원의 관리자 이름을 반환하고 있습니다. LEFT JOIN을 사용하여 관리자가 없는 직원인 Alice도 결과에 포함되도록 하였습니다.

SELF JOIN 활용 예시

```sql
USE sql_hr

SELECT *
FROM employees
```

매니저를 찾을 때 SELF JOIN을 활용할 수 있습니다.

```sql
USE sql_hr

SELECT *
FROM employees e
-- m: manager
JOIN employees m
ON e.reports_to = m.employee_id
```

```sql
USE sql_hr

SELECT
  e.employee_id,
  e.first_name,
  m.first_name AS manager
FROM employees e
JOIN employees m
ON e.reports_to = m.employee_id
```

## 4. Joining Multiple Tables

MySQL Joining Multiple Tables은 두 개 이상의 테이블을 연결하여 관련 데이터를 검색하고 표시하는 데 사용됩니다. 이를 통해 데이터베이스에서 관련 테이블의 정보를 결합하여 하나의 결과 집합으로 반환할 수 있습니다.

데이터베이스에서 여러 테이블을 사용하는 것은 일반적입니다. 예를 들어, 대부분의 응용 프로그램에서 사용자 정보, 제품 정보, 주문 정보 및 결제 정보와 같은 데이터가 여러 테이블에 분산되어 있을 수 있습니다. 이러한 경우, Join을 사용하여 데이터를 효율적으로 조합하고 필요한 정보를 반환할 수 있습니다.

Join을 사용하여 여러 테이블을 결합하는 것은 데이터를 논리적으로 구성하고 데이터베이스의 정규화를 유지하기 위한 중요한 요소입니다. Join을 사용하면 중복 데이터를 피하고 일관성을 유지할 수 있으며, 데이터 유효성 및 일관성을 보장할 수 있습니다.

Join은 데이터베이스에서 매우 중요한 기술 중 하나입니다. 데이터베이스에서 Join을 사용하여 여러 테이블을 연결하고 필요한 정보를 검색하면 데이터 검색과 분석을 용이하게 할 수 있습니다.

Join을 사용하여 여러 테이블을 연결하는 방법은 다음과 같습니다.

```sql
SELECT *
FROM table1
JOIN table2 ON table1.column = table2.column
JOIN table3 ON table2.column = table3.column
```

위의 쿼리에서는 table1, table2 및 table3의 세 개의 테이블을 Join하여 연결합니다. JOIN 절을 사용하여 column1, column2 및 column3과 같은 공통 열을 기준으로 연결합니다. 각 JOIN 절은 이전 JOIN 절의 결과 집합에 새로운 테이블을 추가하는 방식으로 구성됩니다.

여러 테이블을 조인할 때 가장 일반적인 조인 유형은 INNER JOIN, LEFT JOIN, RIGHT JOIN 및 FULL JOIN입니다. 이들은 서로 다른 방식으로 Join을 수행하며, 데이터베이스에서 필요한 정보를 반환하는 데 사용됩니다.

예를 들어, 고객 정보, 주문 정보 및 제품 정보를 담고 있는 세 개의 테이블이 있다고 가정해보겠습니다. 이 경우, 다음과 같은 쿼리를 사용하여 여러 테이블을 결합할 수 있습니다.

```sql
SELECT customers.name, orders.order_date, products.product_name
FROM customers
JOIN orders ON customers.customer_id = orders.customer_id
JOIN products ON orders.product_id = products.product_id
```

위 쿼리에서는 customers, orders 및 products 테이블을 Join하여 관련 정보를 검색합니다. 각 테이블은 공통 열인 customer_id, order_id 및 product_id를 기준으로 연결됩니다.

이 쿼리는 고객 이름, 주문 날짜 및 주문한 제품의 이름을 반환합니다. 이를 통해 데이터베이스에서 필요한 정보를 검색하고 분석하는 데 사용할 수 있습니다.

JOINING MULTIPLE TABLES 활용 예시

```sql
USE sql_store;

SELECT
  o.order_id,
  o.order_date,
  c.first_name,
  c.last_name,
  os.name AS status
FROM orders o
JOIN customers c
ON o.customer_id = c.customer_id
JOIN order_statuses os
ON o.status = os.order_status_id
```

### JOINING MULTIPLE TABLES Exercise

```sql
USE sql_invoicing;

SELECT
  p.date,
  p.invoice_id,
  p.amount,
  c.name,
  pm.name
FROM payments p
JOIN clients c
ON p.client_id = c.client_id
JOIN payment_methods pm
ON p.payment_method = pm.payment_method_id
```

## 5. Compound Join Conditions

MySQL Compound Join Conditions은 여러 개의 조건을 결합하여 더 복잡한 Join 조건을 만드는 것을 말합니다. 기본적으로 Join에서는 하나의 열을 기준으로 Join을 수행하며, 하나의 조건만을 사용하여 두 개의 테이블을 연결합니다. 그러나 때로는 더 복잡한 Join 조건이 필요할 수 있습니다. 이 때 Compound Join Conditions을 사용할 수 있습니다.

Compound Join Conditions은 다음과 같은 경우에 유용합니다.

1. 여러 개의 열을 기준으로 Join을 수행해야 하는 경우.
2. Join을 수행할 때 여러 개의 조건을 조합하여 복잡한 Join 조건을 만들어야 하는 경우.

MySQL에서는 다음과 같은 연산자를 사용하여 Compound Join Conditions을 만들 수 있습니다.

AND: 두 개의 조건이 모두 참일 때 Join이 수행됩니다.
OR: 두 개의 조건 중 하나 이상이 참일 때 Join이 수행됩니다.
예를 들어, 다음과 같은 두 개의 테이블이 있다고 가정해보겠습니다.

```sql
Table1: id, name, age, gender
Table2: id, address, city, state
```

이 두 개의 테이블을 Join하여 id 및 name 열을 기준으로 Join을 수행하고, city 열이 "New York"이고 state 열이 "NY"인 경우에만 Join 결과를 반환하려면 다음과 같은 쿼리를 사용할 수 있습니다.

```sql
SELECT *
FROM Table1
JOIN Table2 ON Table1.id = Table2.id
  AND Table1.name = Table2.name
  AND Table2.city = 'New York'
  AND Table2.state = 'NY'
```

위의 쿼리에서는 AND를 사용하여 여러 개의 Join 조건을 결합합니다. id 및 name 열은 기본 Join 조건이며, city 및 state 열은 Compound Join Condition으로 추가되어 Join을 보다 복잡하게 만듭니다.

또 다른 예시로, 다음과 같은 두 개의 테이블이 있다고 가정해보겠습니다.

```sql
Table1: id, name, age, gender
Table2: id, salary, department
```

이 두 개의 테이블을 Join하여 id 열을 기준으로 Join을 수행하고, salary 열이 50000 이상이거나 department 열이 "Sales"인 경우에만 Join 결과를 반환하려면 다음과 같은 쿼리를 사용할 수 있습니다.

```sql
SELECT *
FROM Table1
JOIN Table2 ON Table1.id = Table2.id
  AND (Table2.salary >= 50000 OR Table2.department = 'Sales')
```

위의 쿼리에서는 OR를 사용하여 두 개의 조건 중 하나 이상이 참일 때 Join이 수행됩니다.

Compound Join Conditions을 사용하면 Join에서 더 복잡한 조건을 만들어 필요한 정보를 보다 정확하게 검색할 수 있습니다. 하지만 Compound Join Conditions은 조건이 복잡해질수록 성능이 저하될 수 있으므로 적절히 사용해야 합니다.

COMPOUND JOIN CONDITIONS 활용 예시

```sql
USE sql_store;

SELECT *
FROM order_items oi
JOIN order_item_notes oin
ON oi.order_id = oin.order_id
AND oi.product_id = oin.product_id
```

### COMPOUND JOIN CONDITIONS Exercise

## 6. Implicit Join Syntax

MySQL에서는 Implicit Join Syntax를 사용하여 Join을 수행할 수 있습니다. Implicit Join Syntax는 Join 조건을 명시하지 않고 테이블을 나열하여 Join을 수행하는 방법입니다.

Implicit Join Syntax의 목적은 간단한 Join 조건을 갖는 경우에 SQL 문을 보다 간결하게 만드는 것입니다.

예를 들어, 다음과 같은 두 개의 테이블이 있다고 가정해보겠습니다.

```sql
Table1: id, name, age, gender
Table2: id, address, city, state
```

이 두 개의 테이블을 Join하여 id 열을 기준으로 Join을 수행하려면 다음과 같은 쿼리를 사용할 수 있습니다.

```sql
SELECT *
FROM Table1, Table2
WHERE Table1.id = Table2.id
```

위의 쿼리에서는 WHERE 절에 Join 조건을 명시하고 있습니다. Implicit Join Syntax는 테이블 간의 Join 조건을 명시하지 않고, 테이블을 쉼표(,)로 나열하여 Join을 수행합니다. 그리고 WHERE 절에서 Join 조건을 명시합니다.

```sql
SELECT *
FROM Table1, Table2
WHERE Table1.id = Table2.id
```

위의 쿼리는 다음과 같은 Explicit Join Syntax의 쿼리와 동일한 결과를 반환합니다.

```sql
SELECT *
FROM Table1
JOIN Table2 ON Table1.id = Table2.id
```

하지만, Implicit Join Syntax는 복잡한 Join 조건을 처리할 수 없기 때문에 명확하지 않은 Join 조건을 사용할 경우에는 문제가 발생할 수 있습니다. 또한, 명시적으로 Join 조건을 명시하는 것이 SQL 문을 이해하기 쉽게 만들어 줄 수 있습니다. 그러므로 가능하면 Explicit Join Syntax를 사용하는 것이 좋습니다.

Implicit JOIN 활용 예시

```sql
-- Implicit Join Syntax
SELECT *
FROM orders o, customers c
WHERE o.customer_id = c.customer_id
```

위의 쿼리는 다음과 같은 Explicit Join Syntax의 쿼리와 동일한 결과를 반환합니다.

```sql
SELECT *
FROM orders o
JOIN customers c
ON o.customer_id = c.customer_id
```

## 7. Outer Joins

MySQL OUTER JOIN은 JOIN 작업을 수행할 때 두 개의 테이블이나 데이터 집합을 조인하면서, 연결 조건이 일치하지 않더라도 결과를 반환하는 JOIN 유형입니다.

OUTER JOIN은 다음과 같은 상황에서 유용합니다.

1. LEFT OUTER JOIN: 왼쪽 테이블의 모든 레코드와 오른쪽 테이블에서 연결되는 레코드가 있는 경우에만 결과를 반환합니다. 이 때, 오른쪽 테이블에서 연결되는 레코드가 없으면 NULL 값을 반환합니다. 이 JOIN 유형은 왼쪽 테이블에 대한 기본적인 정보를 유지하면서 오른쪽 테이블과의 연결을 통해 추가 정보를 얻고자 할 때 사용됩니다.

```sql
SELECT orders.order_number, customers.customer_name
FROM orders
LEFT OUTER JOIN customers ON orders.customer_id = customers.customer_id;
```

2. RIGHT OUTER JOIN: 오른쪽 테이블의 모든 레코드와 왼쪽 테이블에서 연결되는 레코드가 있는 경우에만 결과를 반환합니다. 이 때, 왼쪽 테이블에서 연결되는 레코드가 없으면 NULL 값을 반환합니다. 이 JOIN 유형은 오른쪽 테이블에 대한 기본적인 정보를 유지하면서 왼쪽 테이블과의 연결을 통해 추가 정보를 얻고자 할 때 사용됩니다.

```sql
SELECT orders.order_number, customers.customer_name
FROM orders
RIGHT OUTER JOIN customers ON orders.customer_id = customers.customer_id;
```

3. FULL OUTER JOIN: 왼쪽 테이블과 오른쪽 테이블에서 연결되는 레코드가 있거나, 양쪽 테이블에서 연결되는 레코드가 없는 경우에도 결과를 반환합니다. 이 때, 연결되는 레코드가 없는 쪽의 값은 NULL 값을 반환합니다. 이 JOIN 유형은 양쪽 테이블에 대한 모든 정보를 유지하면서 연결되는 레코드를 찾고자 할 때 사용됩니다.

MySQL에서는 FULL OUTER JOIN을 직접 지원하지 않습니다. 하지만, LEFT OUTER JOIN과 RIGHT OUTER JOIN을 UNION ALL로 연결하여 구현할 수 있습니다.

```sql
SELECT orders.order_number, customers.customer_name
FROM orders
LEFT OUTER JOIN customers ON orders.customer_id = customers.customer_id
UNION ALL
SELECT orders.order
```

이러한 OUTER JOIN 유형을 사용하면, 두 개의 테이블이나 데이터 집합을 JOIN 할 때 하나의 테이블에만 존재하는 데이터도 포함된 결과를 얻을 수 있습니다.

Outer JOIN 활용 예시

```sql
SELECT
  c.customer_id,
  c.first_name
  o.order_id
FROM customers c
JOIN orders o
ON c.customer_id = o.customer_id
ORDER BY c.customer_id
```

위 쿼리는 order_id가 있는 고객 정보만 출력하게 됩니다. order_id 여부와 상관없이 모든 고객 정보를 출력해보겠습니다.

다음 쿼리 기준 `LEFT JOIN`의 `LEFT`는 `customers` 테이블입니다.

```sql
SELECT
  c.customer_id,
  c.first_name
  o.order_id
FROM customers c
-- OUTER 키워드는 생략가능합니다.
LEFT JOIN orders o
ON c.customer_id = o.customer_id
ORDER BY c.customer_id
```

다음 쿼리 기준 `LEFT JOIN`의 `LEFT`는 `orders` 테이블입니다.
`INNER JOIN`과 같은 결과가 출력된 것을 확인할 수 있습니다.

```sql
SELECT
  c.customer_id,
  c.first_name
  o.order_id
FROM customers c
-- OUTER 키워드는 생략가능합니다.
RIGHT JOIN orders o
ON c.customer_id = o.customer_id
ORDER BY c.customer_id
```

### Outer JOIN Exercise

```sql
SELECT
  p.product_id,
  p.name,
  oi.quantity
FROM products p
LEFT JOIN order_items oi
ON p.product_id = oi.product_id
```

## 8. Outer Join Between Multiple Tables

MySQL OUTER JOIN BETWEEN MULTIPLE TABLES는 두 개 이상의 테이블을 LEFT OUTER JOIN, RIGHT OUTER JOIN, 또는 FULL OUTER JOIN으로 결합하는 작업을 수행합니다. 이를 통해 여러 개의 테이블에서 데이터를 추출하거나 특정 테이블과 다른 테이블 간의 관계를 분석할 수 있습니다.

예를 들어, "orders", "customers", "order_items" 테이블이 있다고 가정해봅시다. "orders" 테이블은 주문 정보, "customers" 테이블은 고객 정보, "order_items" 테이블은 주문 상품 정보를 담고 있습니다. 각 테이블은 아래와 같은 필드를 갖고 있다고 가정해봅시다.

- orders: order_number, customer_id
- customers: customer_id, customer_name
- order_items: order_number, product_name, quantity, price

이 경우, "orders" 테이블과 "customers" 테이블, "order_items" 테이블을 LEFT OUTER JOIN하여 모든 주문 정보와 해당 주문에 대한 고객 정보, 주문한 상품 정보를 함께 가져올 수 있습니다.

```sql
SELECT orders.order_number, customers.customer_name, order_items.product_name, order_items.quantity, order_items.price
FROM orders
LEFT OUTER JOIN customers ON orders.customer_id = customers.customer_id
LEFT OUTER JOIN order_items ON orders.order_number = order_items.order_number;
```

위와 같은 SQL 문은 "orders" 테이블, "customers" 테이블, "order_items" 테이블을 LEFT OUTER JOIN하여 모든 주문 정보와 연결된 고객 정보, 주문 상품 정보를 함께 조회합니다. 만약 "orders" 테이블에서 고객 ID나 주문 번호가 NULL인 경우에도 결과를 반환하며, 해당 필드에는 NULL 값이 출력됩니다. 이를 통해 누락된 정보도 포함한 모든 데이터를 확인할 수 있습니다.

LEFT OUTER JOIN 외에도, RIGHT OUTER JOIN, FULL OUTER JOIN을 사용하여 다른 테이블과 결합할 수 있습니다. 이를 통해 특정 테이블이나 필드를 기준으로 데이터를 분석하고, 누락된 정보도 포함한 데이터를 추출할 수 있습니다.

Outer JOIN Between Multiple Tables 활용 예시

```sql
SELECT
  p.product_id,
  p.name,
  oi.quantity
FROM products p
LEFT JOIN order_items oi
ON p.product_id = oi.product_id
ORDER BY c.customer_id
```

"shipper_id"에 해당하는 이름을 출력해보겠습니다.

```sql
SELECT
  p.product_id,
  p.name,
  oi.quantity
FROM products p
LEFT JOIN order_items oi
  ON p.product_id = oi.product_id
INNER JOIN shippers sh
  ON o.shipper_id = sh.shipper_id
ORDER BY c.customer_id
```

"shipped_id"가 없는 레코드는 출력되지 않는 문제를 해결해보겠습니다.

"order_id" 여부에 상관없이 모든 고객 정보와, "shipper_id"가 있으면 "shipper"이름이 출력되고, 없는 경우 "null"값이 출력됩니다.

```sql
SELECT
  p.product_id,
  p.name,
  oi.quantity,
  sh.name AS shipper
FROM products p
LEFT JOIN order_items oi
  ON p.product_id = oi.product_id
LEFT JOIN shippers sh
  ON o.shipper_id = sh.shipper_id
ORDER BY c.customer_id
```

가능한 "RIGHT JOIN"은 피하고 "LEFT JOIN"을 사용하는 것이 시각화에 좋습니다.

### Outer JOIN Between Multiple Tables Exercise

```sql
SELECT
  o.order_id,
  o.order_date,
  c.first_name AS customer,
  sh.name AS shipper
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
JOIN shippers sh
  ON o.shipper_id = sh.shipper_id
```

"shipper_id" 여부에 상관없이 모든 고객을 조회할 수 있도록 코드를 추가해보겠습니다.

```sql
SELECT
  o.order_id,
  o.order_date,
  c.first_name AS customer,
  sh.name AS shipper,
  os.name AS status
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
LEFT JOIN shippers sh
  ON o.shipper_id = sh.shipper_id
JOIN order_statuses os
  ON o.status = os.order_status_id
```

## 9. Self Outer Joins

MySQL Self Outer Join은 같은 테이블에서 자기 자신을 조인하는 방식으로 사용됩니다. 이 방식은 테이블에서 계층 구조를 나타내거나, 특정 필드를 비교하여 값을 찾을 때 유용합니다.

예를 들어, "employees" 테이블이 있다고 가정해봅시다. "employees" 테이블은 각 직원의 정보를 담고 있으며, 다음과 같은 필드를 가지고 있습니다.

- employee_id
- name
- manager_id

여기에서, "manager_id"는 해당 직원의 상사의 ID를 나타냅니다. 이 경우, Self Outer Join을 사용하여 각 직원과 해당 직원의 상사 정보를 함께 가져올 수 있습니다. 이를 통해 계층 구조를 확인할 수 있습니다.

```sql
SELECT e.name, m.name as manager_name
FROM employees e
LEFT OUTER JOIN employees m ON e.manager_id = m.employee_id;
```

위와 같은 SQL 문은 "employees" 테이블에서 Self Outer Join을 사용하여 모든 직원과 해당 직원의 상사를 함께 조회합니다. 여기에서, 각 직원의 이름은 "e.name"으로, 해당 직원의 상사 이름은 "m.name"으로 가져옵니다. 만약 상사가 없는 경우(즉, 상사의 ID가 NULL인 경우)에도 결과를 반환하며, 해당 필드에는 NULL 값이 출력됩니다. 이를 통해 계층 구조의 맨 위층에 있는 직원도 함께 출력됩니다.

Self Outer Join은 계층 구조뿐만 아니라, 다른 필드에서도 사용될 수 있습니다. 예를 들어, "orders" 테이블에서 같은 고객이 여러 개의 주문을 한 경우, Self Outer Join을 사용하여 각 주문에 대한 최신 주문일자를 찾을 수 있습니다. 이를 통해, 고객이 주문한 모든 제품 중에서 가장 최근의 주문이 언제 이루어졌는지 알 수 있습니다.

Self OUTER JOIN 활용 예시

```sql
USE sql_hr;

SELECT
  e.employee_id,
  e.first_name,
  m.first_name AS manager
FROM employees e
-- m = manager
JOIN employees m
  ON e.reports_to = m.employee_id
```

모든 사람의 매니저가 "Yovonnda"인 것을 확인할 수 있습니다. 문제는 "Yovonnda"에 대한 정보는 출력되지 않았다는 점입니다. 이 문제를 해결해 보겠습니다. (INNER JOIN 조건에 매니저가 있는 사람만 조회됐기 때문에 이 문제가 발생했습니다.)

"LEFT JOIN"을 사용하면 매니저 존재 여부에 상관없이 모두가 출력되는 것을 확인할 수 있습니다.

```sql
USE sql_hr;

SELECT
  e.employee_id,
  e.first_name,
  m.first_name AS manager
FROM employees e
-- m = manager
LEFT JOIN employees m
  ON e.reports_to = m.employee_id
```

### Self OUTER JOIN Exercise

## 10. The USING Clause

하거나, Join 조건을 명시적으로 지정할 때 사용됩니다.

예를 들어, "customers" 테이블과 "orders" 테이블이 있다고 가정해봅시다. "customers" 테이블에는 "customer_id"와 "customer_name" 필드가 있으며, "orders" 테이블에는 "customer_id"와 "order_date" 필드가 있습니다.

두 테이블을 "customer_id" 필드를 기준으로 Join하는 경우, 다음과 같이 Using 절을 사용하여 Join 조건을 명시할 수 있습니다.

```sql
SELECT *
FROM customers
JOIN orders USING (customer_id);
```

위의 예제에서, "customers" 테이블과 "orders" 테이블을 "customer_id" 필드를 기준으로 Join합니다. 이때, "customer_id" 필드는 두 테이블에서 동일한 이름을 가지므로, Using 절을 사용하여 명시적으로 Join 조건을 설정할 수 있습니다. 결과적으로, 각 고객이 주문한 내역을 함께 조회할 수 있습니다.

Using 절은 Join 조건을 간단하게 명시할 수 있으며, 특히 Join할 테이블이 여러 개일 때 코드의 가독성을 높일 수 있습니다. 또한, 동일한 이름을 가진 필드만 Join 대상으로 설정되므로, 의도하지 않은 결과가 발생할 가능성이 줄어듭니다.

USING 절 예시

다음 코드는 두 테이블에 존재하는 "customer_id"를 비교해 조인하는 코드입니다. 지금은 코드가 단순해서 처리하는 데 문제가 없지만, 코드양이 많아지고 내용이 복잡해지면 가독성이 떨어집니다. 이러한 문제를 "USING" 절을 통해 해결할 수 있습니다.

```sql
SELECT
  o.order_id,
  c.fist_name,
  sh.name AS shipper
FROM orders o
JOIN customers c
  USING (customer_id)
--  ON o.customer_id = c.customer_id
JOIN shippers sh
-- ON o.shipper_id = sh.shipper_id
  USING (shipper_id)
```

"shipped"되지 않은 "order"를 추출하기 위해 "INNER JOIN ==> OUTER JOIN"으로 설정할 수 있습니다.

```sql
SELECT
  o.order_id,
  c.fist_name,
  sh.name AS shipper
FROM orders o
JOIN customers c
  USING (customer_id)
LEFT JOIN shippers sh
  USING (shipper_id)
```

"USING"은 열(컬럼) 이름이 같을 때에만 사용할 수 있습니다.

```sql
SELECT *
FROM order_items oi
JOIN order_item_notes oin
  -- ON oi.order_id = oin.order_id AND
  --    oi.product_id = oin.product_id
  USING (order_id, product_id)
```

### USING 절 Exercise

```sql
USE sql_invoicing;

SELECT
  p.date,
  c.name AS client,
  p.amount,
  pm.name AS payment_method
FROM payments p
JOIN clients c
  USING (client_id)
JOIN payment_methods pm
  ON p.payment_method = pm.payment_method_id
```

## 11. Natural Joins

MySQL Natural Join은 두 개 이상의 테이블에서 동일한 이름을 가진 열(컬럼)을 기준으로 자동으로 조인을 수행하는 방법입니다. 이를 통해 복잡한 조인 구문을 간단하게 작성할 수 있습니다.

Natural Join은 두 테이블에서 동일한 이름을 가진 열을 찾아서 자동으로 조인합니다. 예를 들어, "customers" 테이블과 "orders" 테이블이 있다고 가정해봅시다. "customers" 테이블에는 "customer_id"와 "customer_name" 필드가 있으며, "orders" 테이블에는 "customer_id"와 "order_date" 필드가 있습니다. 두 테이블을 Natural Join 하는 경우, 다음과 같이 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM customers
NATURAL JOIN orders;
```

위의 예제에서, "customers" 테이블과 "orders" 테이블을 "customer_id" 필드를 기준으로 Natural Join합니다. 이때, "customer_id" 필드는 두 테이블에서 동일한 이름을 가지므로, Natural Join을 사용하여 명시적으로 Join 조건을 설정할 필요가 없습니다. 결과적으로, 각 고객이 주문한 내역을 함께 조회할 수 있습니다.

Natural Join은 Join 조건을 간단하게 명시할 수 있으며, 특히 Join할 테이블이 여러 개일 때 코드의 가독성을 높일 수 있습니다. 또한, 동일한 이름을 가진 필드만 Join 대상으로 설정되므로, 의도하지 않은 결과가 발생할 가능성이 줄어듭니다. 하지만, Natural Join은 Join 대상 컬럼이름이 변경될 경우 Join 조건도 변경되므로, 컬럼 이름을 변경할 가능성이 높은 경우에는 사용하지 않는 것이 좋습니다.

Natural JOIN 활용 예시

```sql
SELECT
  o.order_id,
  c.first_name
FROM orders o
NATURAL JOIN customers c
```

## 12. Cross Joins

MySQL CROSS Join은 두 개 이상의 테이블에서 모든 조합을 만들어 조인하는 방법입니다. 즉, 한 테이블의 모든 레코드와 다른 테이블의 모든 레코드를 결합하는 것입니다. CROSS Join은 Join 조건을 명시하지 않고, 모든 가능한 조합을 반환합니다.

CROSS Join은 두 개 이상의 테이블을 연결하고, 각 테이블의 모든 레코드 조합을 검색하여 결과를 반환합니다. 예를 들어, "employees" 테이블과 "departments" 테이블이 있다고 가정해봅시다. 두 테이블의 CROSS Join을 수행하는 경우, 다음과 같이 구문을 작성할 수 있습니다.

```sql
SELECT *
FROM employees
CROSS JOIN departments;
```

위의 예제에서, "employees" 테이블과 "departments" 테이블을 CROSS Join 합니다. CROSS Join을 사용하여 명시적으로 Join 조건을 설정할 필요가 없으므로, 각 직원과 각 부서의 모든 가능한 조합을 반환합니다.

CROSS Join은 두 테이블 간의 모든 가능한 조합을 반환하므로, 행 수가 매우 크게 증가할 수 있습니다. 따라서, 큰 테이블을 조인할 경우, 결과 세트가 매우 커져서 성능 이슈가 발생할 수 있습니다. 따라서, CROSS Join은 사용하기 전에 주의해야 합니다.

일반적으로, CROSS Join은 다른 Join 유형을 사용할 수 없는 경우에 사용됩니다. 예를 들어, 한 테이블에는 레코드가 존재하지만, 다른 테이블에는 레코드가 없는 경우에 사용할 수 있습니다. 하지만, 이 경우에도 LEFT Join 또는 RIGHT Join을 사용하는 것이 좋습니다.

Cross JOIN 활용 예시

```sql
SELECT
  c.first_name AS customer,
  p.name AS product
FROM customers c
CROSS JOIN products p
ORDER BY c.first_name
```

"CROSS JOIN"은 색상 별 사이즈 등의 상황에 사용할 수 있습니다.

### Cross JOIN Exercise

```sql
-- Do a cross join between shippers and products
--    using the implicit syntax
--    and then using the explicit syntax
```

```sql
SELECT
  sh.name AS shipper,
  p.name AS product
FROM shippers sh
CROSS JOIN products p
ORDER BY sh.name
```

## 13. Unions

MySQL UNION은 두 개 이상의 SELECT 문의 결과를 결합하여 하나의 결과 집합으로 반환하는 방법입니다. 각 SELECT 문은 같은 수의 열을 반환해야 하며, 열의 데이터 형식이 일치해야 합니다. 결과는 중복된 행을 제거하고 정렬된 결과 집합을 반환합니다.

MySQL UNION은 두 개 이상의 테이블에서 데이터를 선택하여 결합하는 경우에 유용합니다. 예를 들어, "employees"와 "customers"라는 두 개의 테이블이 있다고 가정해봅시다. 두 테이블에서 데이터를 선택하여 결합하기 위해 다음과 같은 구문을 사용할 수 있습니다.

```sql
SELECT employee_name AS name, 'Employee' AS type
FROM employees
UNION
SELECT customer_name AS name, 'Customer' AS type
FROM customers
ORDER BY name;
```

위의 예제에서, 첫 번째 SELECT 문은 "employees" 테이블에서 "employee_name" 열을 선택하고, 두 번째 SELECT 문은 "customers" 테이블에서 "customer_name" 열을 선택합니다. 이 두 개의 SELECT 문의 결과는 UNION으로 결합됩니다. "Employee"와 "Customer"를 구분하기 위해 두 번째 SELECT 문에서 "type" 열을 추가했습니다. 그리고 결과는 "name" 열을 기준으로 정렬됩니다.

UNION ALL 구문을 사용하면, 중복된 행도 결과 집합에 포함됩니다. 반면, UNION 구문은 중복된 행을 제거합니다.

하지만, UNION 구문은 여러 SELECT 문의 결과를 결합하는 경우에만 사용할 수 있으며, JOIN과는 다른 목적을 가지고 있습니다. 따라서, UNION을 사용하여 JOIN을 대체하거나 JOIN 대신 사용하는 것은 권장되지 않습니다.

UNION 활용 예시

```sql
SELECT *
FROM orders
```

"order_date"가 올해 날짜일 때 특정 라벨링을 하고 싶을 때 "UNION" 구문을 사용할 수 있습니다.

```sql
SELECT *
FROM orders
WHERE order_date >= "2019-01-01"
```

```sql
SELECT
  order_id,
  order_date,
  "Active" AS status
FROM orders
WHERE order_date >= "2019-01-01"
```

```sql
SELECT
  order_id,
  order_date,
  "Archived" AS status
FROM orders
WHERE order_date < "2019-01-01"
```

"UNION" 구문을 사용해 두 결과를 합쳐보겠습니다.

```sql
SELECT
  order_id,
  order_date,
  "Active" AS status
FROM orders
WHERE order_date >= "2019-01-01"
UNION
SELECT
  order_id,
  order_date,
  "Archived" AS status
FROM orders
WHERE order_date < "2019-01-01"
```

다음 구문은 열(컬럼) 개수가 달라서 오류가 출력됩니다.

```sql
SELECT first_name, last_name
FROM customers
UNION
SELECT name
FROM shippers
```

first_name과 name 열(컬럼)이 있음에도 처음에 정의한 열(first_name)을 기준으로 동작합니다.

```sql
SELECT first_name
FROM customers
UNION
SELECT name
FROM shippers
```

순서를 바꾸면 열(name)을 기준으로 동작합니다.

```sql
SELECT name AS full_name
FROM shippers
UNION
SELECT first_name
FROM customers
```

### UNION Exercise

```sql
SELECT
  customer_id,
  first_name,
  points,
  "Bronze" AS type
FROM customers
WHERE points < 2000
UNION
SELECT
  customer_id,
  first_name,
  points,
  "Silver" AS type
FROM customers
WHERE points BETWEEN 2000 AND 3000
UNION
SELECT
  customer_id,
  first_name,
  points,
  "Gold" AS type
FROM customers
WHERE points > 3000
ORDER BY first_name
```
