# VIEWS

1. Creating Views
2. Altering or Dropping Views
3. Updatable Views
4. THE WITH OPTION CHECK Clause
5. Other Benefits of Views

## 1. Creating Views

MySQL에서 VIEW는 데이터베이스 테이블의 저장된 쿼리에 대한 가상 테이블입니다. VIEW를 사용하여 특정 쿼리의 결과를 쉽게 볼 수 있으며, 복잡한 쿼리를 단순화할 수 있습니다. VIEW를 생성하면 해당 쿼리를 실행하여 결과를 가져오기 위한 논리적 구조가 만들어집니다.

VIEW를 생성하는 방법은 다음과 같습니다:

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

위의 문법에서, view_name은 VIEW의 이름입니다. column1, column2, ...는 VIEW에서 보여줄 열의 이름입니다. table_name은 VIEW를 생성할 기본 테이블의 이름이며, condition은 필요에 따라 WHERE 절을 포함할 수 있는 선택적인 매개변수입니다.

VIEW를 사용하면 생성된 VIEW를 일반 테이블처럼 사용할 수 있습니다. 예를 들어, 다음과 같이 생성된 VIEW를 사용하여 데이터를 조회할 수 있습니다:

```sql
SELECT *
FROM view_name;
```

VIEW를 수정하거나 삭제하려면 ALTER VIEW 문과 DROP VIEW 문을 사용합니다. VIEW는 데이터베이스의 기본 테이블과 동일하게 쿼리를 실행하며, 보안상의 이유로 VIEW에 대한 변경 권한을 제한할 수 있습니다.

VIEW는 데이터 모델링, 보안 및 데이터 접근성을 향상시키는 데 유용하며, 복잡한 쿼리의 결과를 단순화하는 데 사용됩니다.

Creating Views 활용

```sql
USE sql_invoicing;

CREATE VIEW sales_by_client AS
SELECT
    c.client_id,
    c.name,
    SUM(invoice_total) AS total_sales
FROM clients c
JOIN invoices i USING (client_id)
GROUP BY client_name, name
```

```sql
-- 생성된 View를 사용
SELECT *
FROM sales_by_client
WHERE total_sales > 500
```

```sql
-- 생성된 View를 사용
SELECT *
FROM sales_by_client
JOIN clients USING (client_id)
```

### Creating Views Exercise

```sql
-- Create a view to see the balance for each client
-- client_balance

-- client_id
-- name
-- balance

CREATE VIEW clients_balance AS
SELECT
	c.client_id,
    c.name,
	SUM(invoice_total - payment_total) AS balance
FROM clients c
JOIN invoices i USING (client_id)
GROUP BY client_id, name;

SELECT *
FROM clients_balance;
```

## 2. Altering or Dropping Views

MySQL에서 VIEW를 수정하거나 삭제하려면 ALTER VIEW 문과 DROP VIEW 문을 사용합니다.

ALTER VIEW 문을 사용하여 VIEW를 수정할 수 있습니다. 다음과 같은 형식으로 작성됩니다:

```sql
ALTER VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

위의 문법에서, view_name은 수정할 VIEW의 이름입니다. column1, column2, ...는 수정된 VIEW에서 보여줄 열의 이름입니다. table_name은 수정할 VIEW를 생성할 때 사용된 기본 테이블의 이름입니다. condition은 필요에 따라 WHERE 절을 포함할 수 있는 선택적인 매개변수입니다.

DROP VIEW 문을 사용하여 VIEW를 삭제할 수 있습니다. 다음과 같은 형식으로 작성됩니다:

```sql
DROP VIEW view_name;
```

위의 문법에서, view_name은 삭제할 VIEW의 이름입니다.

VIEW를 수정하거나 삭제할 때는 주의해야 합니다. VIEW를 수정하면 뷰를 사용하는 모든 애플리케이션이 영향을 받을 수 있으며, VIEW를 삭제하면 뷰를 사용하는 모든 애플리케이션이 뷰에 액세스할 수 없게 됩니다. 따라서 VIEW를 수정하거나 삭제하기 전에 모든 영향을 고려해야 합니다.

Altering or Dropping Views 활용

```sql
USE sql_invoicing;

CREATE OR REPLACE VIEW sales_by_client AS
SELECT
    c.client_id,
    c.name,
    SUM(invoice_total) AS total_sales
FROM clients c
JOIN invoices i USING (client_id)
GROUP BY client_name, name
```

## 3. Updatable Views

MySQL에서 Updatable Views란 VIEW에 대한 UPDATE, INSERT 및 DELETE 문을 사용하여 VIEW를 업데이트할 수 있는 능력을 의미합니다.

Updatable Views는 VIEW를 사용하는 애플리케이션에서 데이터를 업데이트하기 위해 매우 유용합니다. 예를 들어, VIEW를 사용하여 특정 테이블의 일부 열만 보여줄 수 있습니다. 이렇게 하면 애플리케이션이 테이블의 일부 열만 업데이트할 수 있으므로 보안을 강화할 수 있습니다.

Updatable Views를 사용하려면 다음 조건을 충족해야 합니다.

1. VIEW는 단일 기본 테이블에 대한 SELECT 문이어야 합니다.
2. SELECT 문은 집계 함수를 사용하지 않아야 합니다.
3. SELECT 문은 DISTINCT, GROUP BY, Aggregate Functions(MIN, MAX, SUM), USING 또는 HAVING 절을 사용하지 않아야 합니다.

```sql
-- DISTINCT
-- Aggregate Functions (MIN, MAX, SUM)
-- GROUP BY / HAVING
-- USING
```

4. VIEW에서 반환된 열은 다음 중 하나여야 합니다.

- 기본 테이블에서 가져온 열
- 열 별칭
- 리터럴 값 또는 연산 결과

Updatable Views를 사용하려면 다음과 같은 단계를 수행해야 합니다.

1. VIEW를 만듭니다.
2. VIEW에 대한 UPDATE, INSERT 및 DELETE 권한을 부여합니다.

```sql
GRANT UPDATE, INSERT, DELETE ON view_name TO user_name;
```

위의 문법에서, view_name은 Updatable View의 이름이며, user_name은 권한을 부여할 사용자 이름입니다.

3. 업데이트를 수행합니다.

```sql
UPDATE view_name SET column1 = value1 WHERE condition;
```

위의 문법에서, view_name은 업데이트할 VIEW의 이름입니다. column1은 업데이트할 열의 이름이며, value1은 업데이트할 값입니다. condition은 업데이트할 행을 선택하는 WHERE 절입니다.

INSERT 문과 DELETE 문도 마찬가지로 작성됩니다.

Updatable Views를 사용할 때는 데이터의 무결성을 유지하기 위해 주의해야 합니다. VIEW에서 제공하는 조건을 충족하지 않는 데이터 업데이트는 실패합니다.

Updatable Views 활용

```sql
CREATE OR REPLACE VIEW invoices_with_balance AS
SELECT
	invoice_id,
    number,
    client_id,
    invoice_total,
    payment_total,
	invoice_total - payment_total AS balance,
    invoice_date,
    due_date,
    payment_date
FROM invoices
WHERE (invoice_total - payment_total) > 0;
```

```sql
-- DISTINCT
-- Aggregate Functions (MIN, MAX, SUM)
-- GROUP BY / HAVING
-- USING
```

위 항목을 사용하지 않았기 때문에 Updatable Views로 간주됩니다.

```sql
DELETE FROM invocies_with_balance
WHERE invoice_id = 1;
```

```sql
UPDATE invoices_with_balance
SET due_date = DATE_ADD(due_date, INTERVAL 2 DAY)
WHERE invoice_id = 2;
```

## 4. THE WITH OPTION CHECK Clause

MySQL에서 WITH OPTION CHECK Clause는 Updatable Views를 사용할 때 데이터 무결성을 유지하기 위해 사용됩니다. 이 Clause를 사용하면 VIEW에 대한 업데이트 작업을 수행하기 전에 추가 검사를 수행할 수 있습니다.

WITH OPTION CHECK Clause를 사용하려면 다음과 같은 단계를 수행해야 합니다.

1. VIEW를 만듭니다.
2. VIEW에 대한 UPDATE, INSERT 및 DELETE 권한을 부여합니다.

```sql
GRANT UPDATE, INSERT, DELETE ON view_name TO user_name;
```

위의 문법에서, view_name은 Updatable View의 이름이며, user_name은 권한을 부여할 사용자 이름입니다.

3. WITH OPTION CHECK Clause를 사용하여 업데이트 작업을 제한합니다.

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT ...
FROM ...
WHERE ...
WITH CHECK OPTION;
```

위의 문법에서, view_name은 업데이트할 VIEW의 이름입니다. SELECT 문은 VIEW의 내용을 정의하며, WHERE 절은 VIEW의 필터링 조건을 지정합니다. WITH CHECK OPTION은 데이터 무결성 검사를 활성화하는 옵션입니다.

4. 업데이트를 수행합니다.

```sql
UPDATE view_name SET column1 = value1 WHERE condition;
```

위의 문법에서, view_name은 업데이트할 VIEW의 이름입니다. column1은 업데이트할 열의 이름이며, value1은 업데이트할 값입니다. condition은 업데이트할 행을 선택하는 WHERE 절입니다.
위의 예제에서, WITH CHECK OPTION은 업데이트 작업이 VIEW의 필터링 조건과 일치해야 한다는 것을 의미합니다. 즉, 업데이트 작업이 필터링 조건을 위반하는 경우 업데이트가 실패합니다.

WITH OPTION CHECK Clause를 사용하면 Updatable Views에서 데이터의 무결성을 보장할 수 있습니다. 이를 통해 VIEW를 통해 액세스할 수 있는 데이터에 대한 제한을 더욱 강화할 수 있습니다.

THE WITH OPTION CHECK Clause 활용

```sql
CREATE OR REPLACE VIEW invoices_with_balance AS
SELECT
	invoice_id,
    number,
    client_id,
    invoice_total,
    payment_total,
	invoice_total - payment_total AS balance,
    invoice_date,
    due_date,
    payment_date
FROM invoices
WHERE (invoice_total - payment_total) > 0;
```

위 코드를 보면 balance 컬럼의 값이 0보다 큰 경우만을 포함하고 있습니다.
하지만 다음과 같이 쿼리를 작성해 실행하게 되면, balance 값이 0이 되어 데이터 무결성을 보장할 수 없게 됩니다.

```sql
UPDATE invoices_with_balance
SET payment_total = invoice_total
WHERE invoice_id = 3;
```

WITH CHECK OPTION을 사용하면 데이터 무결성에 영향을 미치는 상황을 방지할 수 있습니다.

```sql
CREATE OR REPLACE VIEW invoices_with_balance AS
SELECT
	invoice_id,
    number,
    client_id,
    invoice_total,
    payment_total,
	invoice_total - payment_total AS balance,
    invoice_date,
    due_date,
    payment_date
FROM invoices
WHERE (invoice_total - payment_total) > 0
WITH CHECK OPTION;
```

## 5. Other Benefits of Views

1. 보안

- View는 데이터 액세스 권한을 제한할 수 있습니다. 예를 들어, 급여 정보가 있는 테이블이 있을 경우, View를 사용하여 급여 정보에 대한 액세스 권한을 부여할 수 있습니다. 이를 통해 권한이 없는 사용자가 급여 정보에 액세스하는 것을 방지할 수 있습니다.

2. 간소화된 쿼리

- View는 복잡한 쿼리를 간소화할 수 있습니다. 예를 들어, 여러 테이블에서 데이터를 가져와야 하는 복잡한 쿼리가 있다면, View를 사용하여 데이터를 단순화할 수 있습니다. 이를 통해 쿼리 작성 시간을 단축시키고, 코드 가독성을 향상시킬 수 있습니다.

3. 중복 코드 제거

- View를 사용하여 중복 코드를 제거할 수 있습니다. 예를 들어, 여러 쿼리에서 동일한 JOIN 작업을 수행해야 하는 경우, 이를 View로 추출하여 중복 코드를 제거할 수 있습니다.

4. 데이터 정제

- View를 사용하여 데이터를 정제할 수 있습니다. 예를 들어, 데이터베이스에는 수많은 테이블이 있을 수 있습니다. 이러한 테이블에서 특정 데이터만 필요한 경우, View를 사용하여 필요한 데이터만 추출할 수 있습니다. 또한, View를 사용하여 여러 테이블에서 데이터를 가져와 필요한 데이터를 생성할 수도 있습니다.

5. 효율적인 저장공간 사용

- View는 효율적인 저장공간 사용을 제공합니다. 예를 들어, 대규모 데이터베이스에서 View를 사용하면 저장공간을 절약할 수 있습니다. 이는 데이터를 미리 계산하지 않아도 되기 때문입니다.

  6.유연성

- View를 사용하여 데이터 요구 사항이 변경되는 경우 View를 업데이트하여 변경에 대응할 수 있습니다. 예를 들어, 새로운 필드를 추가하거나, 기존 필드를 삭제하거나, 데이터 정제를 변경할 수 있습니다. 이는 데이터 요구 사항이 변경되는 경우 View를 업데이트하여 변경에 대응할 수 있다는 유연성을 제공합니다.
