# Summarizing Data

1. Aggregate Functions
2. The GROUP BY Clause
3. The HAVING Clause
4. The ROLLUP Operator

## 1. Aggregate Functions

MySQL의 집계 함수(Aggregate Functions)는 SELECT 문에서 사용됩니다. 이러한 함수는 여러 행에서 데이터를 선택하고 그룹화하여 단일 값을 반환합니다.

일반적으로 데이터를 요약하는 데 사용되며, 예를 들어 COUNT, SUM, AVG, MIN, MAX 등이 있습니다. 이러한 함수는 데이터베이스에서 데이터 분석 및 요약 작업을 수행할 때 매우 유용합니다.

다음은 MySQL에서 제공하는 일부 Aggregate Functions 예입니다.

```sql
COUNT : 선택한 열의 행 수를 반환합니다.
SUM : 선택한 열의 값의 합계를 반환합니다.
AVG : 선택한 열의 값의 평균을 반환합니다.
MIN : 선택한 열의 값 중 최소값을 반환합니다.
MAX : 선택한 열의 값 중 최대값을 반환합니다.
```

Aggregate Functions는 GROUP BY와 함께 사용하여 그룹별 집계를 수행할 수 있습니다. 이를 통해 데이터를 그룹화하고 각 그룹의 합계, 평균 또는 기타 통계를 계산할 수 있습니다.

Aggregate Functions 활용

```sql
USE sql_invoicing;

SELECT
   MAX(invoice_total) AS highest,
    MIN(invoice_total) AS lowest,
    AVG(invoice_total) AS average,
    SUM(invoice_total * 1.1) AS total,
    COUNT(invoice_total) AS number_of_invoices,
    COUNT(payment_date) AS count_of_payments,
    COUNT(*) AS total_records,
    COUNT(DISTINCT client_id) AS total_distinct_records
FROM invoices
WHERE invoice_date > "2019-07-01";
```

### Aggregate Functions Exercise

```sql
SELECT
	"First half of 2019" AS date_range,
    SUM(invoice_total) AS total_sales,
    SUM(payment_total) AS total_payments,
    SUM(invoice_total - payment_total) AS what_we_expect
FROM invoices
WHERE invoice_date
	BETWEEN "2019-01-01" AND "2019-06-30"
UNION
SELECT
	"Second half of 2019" AS date_range,
    SUM(invoice_total) AS total_sales,
    SUM(payment_total) AS total_payments,
    SUM(invoice_total - payment_total) AS what_we_expect
FROM invoices
WHERE invoice_date
	BETWEEN "2019-07-01" AND "2019-12-31"
UNION
SELECT
	"Total" AS date_range,
    SUM(invoice_total) AS total_sales,
    SUM(payment_total) AS total_payments,
    SUM(invoice_total - payment_total) AS what_we_expect
FROM invoices
WHERE invoice_date
	BETWEEN "2019-01-01" AND "2019-12-31";
```

## 2. The GROUP BY Clause

MySQL의 GROUP BY는 데이터베이스 테이블에서 특정 열(column)에 대해 그룹화를 수행하는 SQL 쿼리입니다. 이를 통해 특정 열의 고유한 값들을 그룹으로 묶어 그룹 단위로 집계(aggregate) 함수를 사용하여 데이터를 분석할 수 있습니다.

예를 들어, 아래와 같은 Sales 테이블이 있다고 가정해보겠습니다.

```sql
ID	Product	Category	Price
1	A	    X	        100
2	B       Y	        200
3	C   	X	        150
4	D	    Z	        120
5	E	    Y	        80
6	F	    Z	        250
```

위의 Sales 테이블에서 Category 별로 Price의 평균값을 구하고 싶다면, 아래와 같은 SQL 쿼리를 작성할 수 있습니다.

```sql
SELECT Category, AVG(Price)
FROM Sales
GROUP BY Category;
```

위의 쿼리는 Category 열을 기준으로 Sales 테이블을 그룹화하고, 그룹 단위로 평균값을 구합니다. 결과는 아래와 같습니다.

```sql
Category	AVG(Price)
X	        125
Y	        140
Z	        185
```

즉, GROUP BY를 사용하면 데이터를 그룹 단위로 집계하여 원하는 정보를 얻을 수 있습니다.

The GROUP BY Clause 활용

```sql
SELECT
    client_id,
    SUM(invoice_total) AS total_sales
FROM invoices
GROUP BY client_id
ORDER BY total_sales DESC;
```

```sql
SELECT
	state,
    city,
    SUM(invoice_total) AS total_sales
FROM invoices i
JOIN clients USING (client_id)
GROUP BY state, city;
```

### The GROUP BY Clause Exercise

```sql
SELECT * FROM sql_invoicing.payments;

SELECT
	date,
    pm.name AS payment_method,
    SUM(amount) AS total_payments
FROM payments p
JOIN payment_methods pm
	ON p.payment_method = pm.payment_method_id
GROUP BY date, payment_method;
```

## 3. The HAVING Clause

MySQL의 HAVING 구문은 GROUP BY 구문과 함께 사용되며, 그룹화된 결과에 대한 조건을 지정하는 데 사용됩니다.

HAVING 구문은 WHERE 구문과 비슷하지만, WHERE 구문은 집계 함수에 대한 조건을 설정할 수 없습니다. 즉, HAVING 구문은 그룹화된 결과에 대한 집계 함수에 대한 조건을 설정할 수 있습니다.

예를 들어, 주문 데이터베이스에서 고객별 총 주문 금액을 계산하고 싶은 경우 다음과 같은 쿼리를 사용할 수 있습니다.

```sql
SELECT customer_id, SUM(order_total)
FROM orders
GROUP BY customer_id
HAVING SUM(order_total) > 1000;
```

위의 쿼리는 주문 데이터베이스에서 각 고객의 총 주문 금액을 계산하고, 그 중에서도 합계가 1000달러 이상인 고객만 선택합니다. 이러한 조건은 HAVING 구문에서 설정됩니다.

다음 코드는 "WHERE"절이 "GROUP BY" 앞에 있기 때문에, "total_sales"를 인식할 수 없다는 오류가 발생합니다.

```sql
SELECT
	client_id,
    SUM(invoice_total) AS total_sales
FROM invoices
WHERE total_sales > 500
GROUP BY client_id;
```

"HAVING" 절을 사용하면 위 문제를 해결할 수 있습니다.

```sql
SELECT
	client_id,
    SUM(invoice_total) AS total_sales
FROM invoices
GROUP BY client_id
HAVING total_sales > 500;
```

```sql
SELECT
	client_id,
    SUM(invoice_total) AS total_sales,
    COUNT(*) AS number_of_invoices
FROM invoices
GROUP BY client_id
HAVING total_sales > 500 AND number_of_invoices > 5;
```

하지만 다음과 같이 "SELECT" 절에 포함되지 않은 열(Column)은 "HAVING" 절에 사용할 수 없습니다.

```sql
SELECT
	client_id,
    SUM(invoice_total) AS total_sales,
    COUNT(*) AS number_of_invoices
FROM invoices
GROUP BY client_id
HAVING payment_date;
```

대신에 다음과 같이 "WHERE" 절 사용이 가능합니다.

```sql
SELECT
	client_id,
    SUM(invoice_total) AS total_sales,
    COUNT(*) AS number_of_invoices
FROM invoices
WHERE payment_date > ...
GROUP BY client_id;
```

### The HAVING Clause Exercise

```sql
-- Get the customers
--    located in Virginia
--    who have spent more than $100
```

```sql
USE sql_store;

SELECT
	c.customer_id,
    c.first_name,
    c.last_name,
	SUM(oi.quantity * oi.unit_price) AS total_sales
FROM customers c
JOIN orders o USING (customser_id)
JOIN order_items oi USING (order_id)
WHERE state = "VA"
GROUP BY
	c.customer_id,
    c.first_name,
    c.last_name
HAVING total_sales > 100
```

## 4. The ROLLUP Operator

MySQL에서 ROLLUP 연산자는 GROUP BY 구문과 함께 사용되며, 그룹화된 데이터에 대한 총계를 계산하는 데 사용됩니다.

ROLLUP 연산자는 GROUP BY 구문에서 지정한 열을 기준으로 데이터를 그룹화하고, 추가적으로 "총계" 행을 생성합니다. 이 "총계" 행은 지정된 열들의 모든 값을 합친 값을 가지며, NULL 값으로 표시되는 열은 해당 열의 모든 값을 그룹화합니다.

예를 들어, "Sales" 테이블에서 날짜(date), 지역(region), 상품(product)별 매출액(sales) 정보가 있다고 가정해 봅시다. 이 테이블에서 date, region, product 컬럼을 기준으로 GROUP BY 구문을 작성하면 다음과 같이 작성할 수 있습니다.

```sql
SELECT date, region, product, SUM(sales) as total_sales
FROM Sales
GROUP BY date, region, product WITH ROLLUP;
```

위의 쿼리에서 ROLLUP 키워드는 총계 행을 생성하기 위해 사용됩니다. 결과는 date, region, product을 기준으로 그룹화된 데이터와, 추가된 총계 행으로 구성됩니다. 총계 행의 값은 각 그룹의 합계값을 나타내며, NULL 값은 해당 열의 모든 값을 그룹화한 결과를 나타냅니다.

```sql
USE sql_invoicing;

SELECT
	client_id,
    SUM(invoice_total) AS total_sales
FROM invoices
GROUP BY client_id WITH ROLLUP;
```

- the city of San Fransisco in California
- all cities in California
- all cities in all states

### The ROLLUP Operator Exercise

```sql
SELECT * FROM sql_invoicing.payments;

SELECT
	pm.name AS payment_method,
	SUM(amount) AS total
FROM payments p
JOIN payment_methods pm
	ON p.payment_method = pm.payment_method_id
-- WITH ROLLUP을 사용할 때는 payment_method 등의 별칭을 사용할 수 없다.
GROUP BY pm.name WITH ROLLUP;
```
