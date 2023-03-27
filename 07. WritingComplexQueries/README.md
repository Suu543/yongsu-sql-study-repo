# Writing Complex Queries

1. Subqueries
2. Subqueries vs JOINs
3. The ALL Keyword
4. The ANY keyword
5. Correlated Subqueries
6. The EXISTS Operator
7. Subqueries in the SELECT Clause
8. Subqueries in the FROM Clause

## 1. Subqueries

MySQL에서 서브쿼리(subquery)는 하나의 쿼리문 안에 포함된 다른 쿼리문으로, 주로 SELECT 문에서 사용됩니다. 서브쿼리는 SELECT, INSERT, UPDATE, DELETE 등의 SQL 문에서 사용할 수 있으며, 서브쿼리 결과는 다른 쿼리문의 조건절에 사용되어 더 복잡한 질의를 수행할 수 있습니다.

MySQL에서 서브쿼리는 크게 두 가지 유형으로 구분됩니다.

인라인 서브쿼리(Inline subquery): 쿼리문 안에서 서브쿼리가 실행되며, 그 결과가 바깥 쿼리문의 조건절에 사용됩니다.

예시:

```sql
SELECT *
FROM employees
WHERE department_id IN (
  SELECT department_id
  FROM departments
  WHERE location_id = 1700
);
```

위의 예시에서, 인라인 서브쿼리는 departments 테이블에서 location_id가 1700인 부서들의 department_id를 선택합니다. 이 선택된 department_id들은 employees 테이블에서 department_id가 그 중 하나인 모든 직원들을 선택하는 데 사용됩니다.

중첩 서브쿼리(Nested subquery): 서브쿼리 안에 또 다른 서브쿼리가 있는 경우를 말합니다.

예시:

```sql
SELECT AVG(salary)
FROM (
  SELECT *
  FROM employees
  WHERE department_id = (
    SELECT department_id
    FROM departments
    WHERE department_name = 'Sales'
  )
) AS sales_employees;
```

위의 예시에서, 중첩 서브쿼리는 먼저 departments 테이블에서 department_name이 'Sales'인 부서의 department_id를 선택합니다. 그리고 그 department_id를 가지는 employees 테이블의 모든 직원들을 선택합니다. 이 선택된 직원들의 salary 평균을 계산하여 반환합니다.

서브쿼리를 사용하면 복잡한 조건을 간단하게 처리할 수 있으며, 성능상의 이점도 있습니다. 하지만 서브쿼리가 복잡해질수록 실행 속도가 느려지는 단점도 있습니다. 따라서 적절하게 사용해야 합니다.

Subqueries 활용

```sql
-- Find products that are more
-- expensive than Lettuce (id = 3)

USE sql_store;

SELECT *
FROM products
WHERE unit_price > (
	SELECT unit_price
    FROM products
    WHERE product_id = 3
);
```

```sql
-- In sql_hr database:
--    Find employees whose earn more than average

USE sql_hr;

SELECT *
FROM employees
WHERE salary > (
	SELECT AVG(salary)
    FROM employees
)
```

```sql
-- Find the products that have never been ordered

USE sql_store;

SELECT *
FROM products
WHERE product_id NOT IN (
	SELECT DISTINCT product_id
    FROM order_items
);
```

```sql
-- Find clients without invoices

SELECT *
FROM clients
WHERE client_id NOT IN (
	SELECT DISTINCT client_id
    FROM invoices
);
```

## 2. Subqueries vs JOINs

Subqueries와 JOINs는 둘 다 복잡한 질의를 수행하는 데 사용되는 SQL 문법입니다. 하지만 둘은 서로 다른 방식으로 작동합니다.

Subqueries는 하나의 쿼리문 안에 포함된 다른 쿼리문으로, 주로 SELECT 문에서 사용됩니다. Subqueries는 쿼리 결과를 먼저 계산하고, 그 결과를 다른 쿼리문의 조건절이나 SELECT 문에서 사용합니다. 즉, Subqueries는 먼저 하위 질의문을 실행하고, 이를 상위 질의문에 전달합니다.

예시:

```sql
SELECT *
FROM employees
WHERE department_id IN (
  SELECT department_id
  FROM departments
  WHERE location_id = 1700
);
```

위의 예시에서, 서브쿼리는 departments 테이블에서 location_id가 1700인 부서들의 department_id를 선택합니다. 이 선택된 department_id들은 employees 테이블에서 department_id가 그 중 하나인 모든 직원들을 선택하는 데 사용됩니다.

반면 JOINs는 두 개 이상의 테이블에서 데이터를 가져와 하나의 결과 집합을 생성하는 데 사용됩니다. JOINs는 일반적으로 FROM 절에서 사용되며, 두 개 이상의 테이블을 조인하는 방식으로 작동합니다. JOINs는 두 개 이상의 테이블에서 데이터를 가져오고, 이를 결합하여 새로운 결과 집합을 생성합니다.

```sql
SELECT *
FROM employees
JOIN departments
ON employees.department_id = departments.department_id
WHERE departments.location_id = 1700;
```

위의 예시에서, JOIN은 employees 테이블과 departments 테이블을 조인합니다. 이 때, employees.department_id와 departments.department_id가 일치하는 행들만 선택됩니다. 그리고 departments.location_id가 1700인 행들만 선택됩니다.

Subqueries는 상대적으로 단순하고 가독성이 좋지만, 대용량 데이터에서 성능이 저하될 가능성이 있습니다. JOINs는 Subqueries보다 더 복잡하지만, 대용량 데이터에서 더 빠르게 실행될 수 있습니다. 따라서 적절한 상황에서 적절한 방법을 선택해야 합니다.

```sql
-- Find clients without invoices

SELECT *
FROM clients
WHERE client_id NOT IN (
	SELECT DISTINCT client_id
    FROM invoices
);
```

Subqueries로 작성한 위 코드를 JOIN을 사용해 작성해보겠습니다.

```sql
SELECT *
FROM clients
LEFT JOIN invoices USING (client_id)
WHERE invoice_id IS NULL;
```

### Subqueries vs JOINs Exercise

```sql
-- Find customers who have ordered lettuce (id = 3)
--  Select customer_id, first_name, last_name

-- Ver #1
SELECT *
FROM customers
WHERE customer_id IN (
	SELECT o.customer_id
    FROM order_items oi
    JOIN orders o USING (order_id)
    WHERE product_id = 3
);

-- Ver #2
SELECT DISTINCT customer_id, first_name, last_name
FROM customers c
JOIN orders o USING (customer_id)
JOIN order_items oi USING (order_id)
WHERE oi.product_id = 3;
```

## 3. The ALL Keyword

MySQL에서 ALL 키워드는 비교 연산자와 함께 사용되어 여러 값을 비교할 때 사용됩니다.

ALL 키워드를 사용하면 비교 연산자 왼쪽에 있는 값을 오른쪽에 있는 값과 모두 비교합니다. 만약 왼쪽의 모든 값이 오른쪽 값과 비교해서 참이면, 전체 비교 결과는 참입니다.

예를 들어, 다음과 같은 쿼리를 생각해봅시다.

```sql
SELECT *
FROM products
WHERE price > ALL (
  SELECT price
  FROM products
  WHERE category = 'Electronics'
);
```

위의 예시에서, ALL 키워드는 price 컬럼의 값이 하위 쿼리에서 선택된 모든 price 값보다 큰지 여부를 확인합니다. 만약 price 값이 하위 쿼리에서 선택된 모든 price 값보다 크다면, 해당 행은 결과에 포함됩니다.

ALL 키워드는 언제든지 비교 연산자와 함께 사용될 수 있습니다. 그러나 주로 하위 쿼리에서 사용됩니다. ALL 키워드는 비교 대상이 될 값이 매우 많은 경우에 유용할 수 있습니다.

```sql
-- Select invoices larger than all invoices of
-- client 3

SELECT *
FROM invoices
WHERE invoice_total > (
	SELECT MAX(invoice_total)
    FROM invoices
    WHERE client_id = 3
);
```

ALL Keyword 사용시

```sql
SELECT *
FROM invoices
WHERE invoice_total > ALL (
	SELECT invoice_total
    FROM invoices
    WHERE client_id = 3
);
```

client_id = 3에 해당하는 invoice가 (150, 169, 140, ...) 등이 있다고 가정했을 때, invoice_total 값이 client_id = 3이 가지고 있는 모든 invoice_total 값보다 큰 invoice만 리턴하는 방식으로 동작합니다.

## 4. The ANY keyword

MySQL에서 ANY 키워드는 비교 연산자와 함께 사용되어 여러 값을 비교할 때 사용됩니다.

ANY 키워드를 사용하면 비교 연산자 왼쪽에 있는 값을 오른쪽에 있는 값 중 하나 이상과 비교합니다. 만약 왼쪽의 값 중 하나 이상이 오른쪽 값과 비교해서 참이면, 전체 비교 결과는 참입니다.

예를 들어, 다음과 같은 쿼리를 생각해봅시다.

```sql
SELECT *
FROM products
WHERE price < ANY (
  SELECT price
  FROM products
  WHERE category = 'Electronics'
);
```

위의 예시에서, ANY 키워드는 price 컬럼의 값이 하위 쿼리에서 선택된 price 값 중 하나 이상보다 작은지 여부를 확인합니다. 만약 price 값이 하위 쿼리에서 선택된 price 값 중 하나 이상보다 작다면, 해당 행은 결과에 포함됩니다.

ANY 키워드는 언제든지 비교 연산자와 함께 사용될 수 있습니다. 그러나 주로 하위 쿼리에서 사용됩니다. ANY 키워드는 비교 대상이 될 값이 매우 많은 경우에 유용할 수 있습니다.

```sql
-- Select clients with at least two invoices
USE sql_invoicing;

-- Ver #1
SELECT *
FROM clients
WHERE client_id IN (
	SELECT client_id
	FROM invoices
	GROUP BY client_id
	HAVING COUNT(*) >= 2
);

-- Ver #2
USE sql_invoicing;

SELECT *
FROM clients
WHERE client_id = ANY (
	SELECT client_id
	FROM invoices
	GROUP BY client_id
	HAVING COUNT(*) >= 2
);
```

https://dlwjdcks5343.tistory.com/59

## 5. Correlated Subqueries

MySQL에서 Correlated Subquery는 외부 쿼리와 서브쿼리 간에 상호 의존적인 관계가 있는 서브쿼리를 말합니다. 즉, 서브쿼리가 외부 쿼리의 결과에 의존하여 실행되며, 외부 쿼리의 각 행에 대해 서브쿼리가 실행됩니다.

Correlated Subquery를 사용하면 외부 쿼리에서 선택된 각 행마다 서브쿼리가 실행되어 조건을 충족하는 추가적인 데이터를 찾을 수 있습니다. 이를 통해 데이터 검색 및 필터링이 더욱 유연하게 가능해집니다.

예를 들어, 다음과 같은 Correlated Subquery를 생각해봅시다.

```sql
SELECT *
FROM orders o
WHERE o.order_date > (
  SELECT MAX(order_date)
  FROM orders
  WHERE customer_id = o.customer_id
);
```

위의 예시에서, 외부 쿼리는 모든 주문 데이터를 반환합니다. 서브쿼리는 동일한 고객 ID를 가진 주문 중 가장 최근 주문일을 반환합니다. 서브쿼리는 외부 쿼리의 각 행마다 실행되며, 외부 쿼리의 결과에 따라 서브쿼리의 결과가 달라집니다.

Correlated Subquery를 사용하면 외부 쿼리와 서브쿼리 간의 관계를 활용하여 보다 복잡한 데이터 검색 및 필터링을 수행할 수 있습니다. 그러나 이를 사용할 때 성능상의 문제가 발생할 수 있으므로 적절한 인덱스를 설정하고 최적화된 쿼리를 작성해야 합니다.

```sql
-- for each employee
--  calculate the avg salary for employee.office
--  return the employee if salary > avg

USE sql_hr;

SELECT *
FROM employees e
WHERE salary > (
	SELECT AVG(salary)
    FROM employees
    WHERE office_id = e.office_id
);
```

```sql
-- Get invoices that are larger than the
-- client's average invoice amount
USE sql_invoicing;

SELECT *
FROM invoices i
WHERE invoice_total > (
	SELECT AVG(invoice_total)
    FROM invoices
    WHERE client_id = i.client_id
);

-- Test Version
SELECT *
FROM invoices i
WHERE invoice_total > (
	SELECT AVG(invoice_total)
	FROM invoices
    WHERE client_id = i.client_id
	GROUP BY client_id
);
```

## 6. The EXISTS Operator

MySQL의 EXISTS 연산자는 서브쿼리의 결과가 존재하는지 여부를 확인하여 참 또는 거짓 값을 반환합니다.

EXISTS 연산자를 사용하면 서브쿼리의 결과가 중요하지 않은 경우, 즉 서브쿼리에서 선택된 행의 값이 필요하지 않은 경우에도 서브쿼리가 실행되므로 성능에 영향을 미칠 수 있습니다.

예를 들어, 다음과 같은 쿼리를 생각해봅시다.

```sql
SELECT *
FROM products
WHERE EXISTS (
  SELECT *
  FROM orders
  WHERE orders.product_id = products.id
);
```

위의 예시에서, EXISTS 연산자는 orders 테이블에서 product_id가 products 테이블의 id와 일치하는 행이 있는지 여부를 확인합니다. 만약 일치하는 행이 존재한다면, 해당 제품은 결과에 포함됩니다.

EXISTS 연산자는 IN 연산자와 유사하지만, IN 연산자는 서브쿼리의 결과값을 반환하지만 EXISTS 연산자는 서브쿼리의 결과가 존재하는지 여부만 확인합니다. 그러므로 EXISTS 연산자가 좀 더 빠르고 효율적인 경우가 많습니다.

IN 연산자를 사용하는 경우 (1, 2, 3, 5, ...) 수백, 수천의 데이터가 존재하는 경우, 그 숫자에 해당하는 값을 저장하고, 해당 리스트를 통해 값 비교가 수행되기 때문에 EXISTS 연산자와 비교했을 때 비효율적인 경우가 많습니다.

```sql
-- Select clients that have an invoice

-- Ver #1
USE sql_invoicing;

SELECT *
FROM clients
WHERE client_id IN (
	SELECT DISTINCT client_id
    FROM invoices
);

-- Ver #2
USE sql_invoicing;

SELECT *
FROM clients c
WHERE EXISTS (
	SELECT client_id
    FROM invoices
    WHERE client_id = c.client_id
);
```

### The EXISTS Operator Exercise

```sql
-- Find the products that have never been ordered
SELECT *
FROM products p
WHERE NOT EXISTS (
    SELECT product_id
    FROM order_items
    WHERE product_id = p.product_id
)
```

MySQL에서 IN 연산자와 EXISTS 연산자는 서로 다른 용도로 사용됩니다.

IN 연산자는 하나 이상의 값을 검색하거나 비교하는 데 사용됩니다. 쿼리의 WHERE 절에서 IN 연산자를 사용하여 조건에 해당하는 값을 필터링할 수 있습니다. 예를 들어, 다음과 같은 쿼리를 고려해보세요.

```sql
SELECT *
FROM employees
WHERE department IN ('HR', 'Marketing');
```

이 쿼리는 employees 테이블에서 department가 'HR' 또는 'Marketing'인 모든 행을 반환합니다.

EXISTS 연산자는 하위 쿼리의 결과가 존재하는지 여부를 검사합니다. 예를 들어, 다음과 같은 쿼리를 고려해보세요.

```sql
SELECT *
FROM employees
WHERE EXISTS (
    SELECT *
    FROM salaries
    WHERE employees.employee_id = salaries.employee_id
);
```

이 쿼리는 employees 테이블에서 salaries 테이블과 연결된 employee_id가 있는 모든 행을 반환합니다.

따라서 IN 연산자는 값을 비교하고 필터링하는 데 사용되며 EXISTS 연산자는 하위 쿼리의 결과가 존재하는지 여부를 확인하는 데 사용됩니다.

## 7. Subqueries in the SELECT Clause

MySQL에서는 SELECT 절 내에서 하위 쿼리(subquery)를 사용할 수 있습니다. 이를 Subqueries in the SELECT Clause라고 부릅니다.

Subqueries in the SELECT Clause는 SELECT 문의 결과 집합을 구성하는 동안 다른 테이블에서 데이터를 가져올 수 있도록 합니다. 이를 통해 복잡한 쿼리를 작성하거나 JOIN 문 없이도 데이터를 결합할 수 있습니다.

Subquery는 SELECT 절 내에서 괄호로 묶인 일반적인 SELECT 문입니다. 이를 통해 하위 쿼리의 결과를 한 개의 값으로 반환할 수 있습니다. Subquery에서 반환된 값은 외부 쿼리에서 사용될 수 있는 일반적인 열로 취급됩니다.

다음은 Subqueries in the SELECT Clause를 사용한 예제입니다.

```sql
SELECT employee_name, (SELECT MAX(salary) FROM salaries WHERE salaries.employee_id = employees.employee_id) AS max_salary
FROM employees;
```

위의 쿼리는 employees 테이블에서 각 직원의 이름과 해당 직원의 최고 급여를 반환합니다. 서브쿼리는 SELECT 문에서 MAX 함수를 사용하여 salaries 테이블에서 해당 직원의 최고 급여를 가져오고, WHERE 절을 사용하여 서브쿼리와 외부 쿼리의 employee_id를 매칭합니다. AS 절은 결과 열의 이름을 지정합니다.

Subqueries in the SELECT Clause는 복잡한 쿼리를 작성하거나 JOIN 문 없이도 데이터를 결합할 수 있는 강력한 도구입니다. 그러나 서브쿼리가 너무 복잡하거나 느리게 실행될 수 있기 때문에 성능 문제에 주의해야 합니다.

Subqueries in the SELECT Clause 활용

```sql
SELECT
    invoice_id,
    invoice_total,
    (SELECT AVG(invoice_total) FROM invoices) AS invoice_average,
    -- invoice_average 별명을 직접적으로 사용 불가
    -- invoice_total - invoice_average
    -- 대신에 다음과 같이 SELECT 구문을 통해 사용 가능
    invoice_total - (SELECT invoice_average) AS difference
FROM invoices;
```

### Subqueries in the SELECT Clause Exercise

```sql
SELECT
	client_id,
    name,
	(SELECT SUM(invoice_total) FROM invoices WHERE client_id = c.client_id) AS total_sales,
    (SELECT AVG(invoice_total) FROM invoices) AS average,
	(SELECT total_sales - average) AS difference
FROM clients c;
```

## 8. Subqueries in the FROM Clause

MySQL에서는 FROM 절 내에서 하위 쿼리(subquery)를 사용할 수 있습니다. 이를 Subqueries in the FROM Clause라고 부릅니다.

Subqueries in the FROM Clause를 사용하면 쿼리의 데이터 원본을 서브쿼리로 대체할 수 있습니다. 이를 통해 원하는 결과를 얻기 위해 데이터를 처리할 수 있습니다. FROM 절 내의 서브쿼리는 일반적으로 INNER JOIN 또는 LEFT JOIN과 같은 JOIN 조건으로 대체됩니다.

다음은 Subqueries in the FROM Clause를 사용한 예제입니다.

```sql
SELECT employee_name, department, AVG(salary)
FROM (SELECT * FROM employees WHERE hire_date > '2019-01-01') AS new_employees
INNER JOIN salaries ON new_employees.employee_id = salaries.employee_id
GROUP BY department;
```

위의 쿼리는 employees 테이블에서 2019년 1월 1일 이후에 입사한 직원의 이름, 부서 및 해당 부서의 평균 급여를 반환합니다. 서브쿼리는 FROM 절에서 필터링 조건을 사용하여 새로 입사한 직원만 선택합니다. 그런 다음 INNER JOIN을 사용하여 salaries 테이블과 조인하여 직원의 급여를 가져옵니다. 마지막으로, GROUP BY 절을 사용하여 부서별로 결과를 그룹화합니다.

Subqueries in the FROM Clause를 사용하면 데이터 원본을 서브쿼리로 대체하여 원하는 결과를 얻을 수 있습니다. 그러나 서브쿼리가 너무 복잡하거나 느리게 실행될 수 있기 때문에 성능 문제에 주의해야 합니다.

Subqueries in the FROM Clause 활용

```sql
SELECT *
FROM (
	SELECT
		client_id,
		name,
		(SELECT SUM(invoice_total) FROM invoices WHERE client_id = c.client_id) AS total_sales,
		(SELECT AVG(invoice_total) FROM invoices) AS average,
		(SELECT total_sales - average) AS difference
	FROM clients c
) AS sales_summary
WHERE total_sales IS NOT NULL;
```
