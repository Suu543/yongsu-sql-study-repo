# Inserting, Updating, and Deleting Data

목차

1. Column Attributes
2. Inserting a Row
3. Inserting Multiple Rows
4. Inserting Hierarchical Rows
5. Creating a Copy of a Table
6. Updating a Single Row
7. Updating Multiple Rows
8. Using Subqueries in Updates
9. Deleting Rows
10. Restoring the Databases

## 1. Column Attributes

SQL의 Column Attributes란, 테이블의 각 컬럼(Column)이 가지는 특성을 의미합니다. 다양한 Column Attributes가 존재하며, 다음과 같은 것들이 있습니다.

1. Data Type(데이터 타입): 컬럼에 저장될 데이터의 유형을 지정합니다. 예를 들어, 문자열, 숫자, 날짜 및 시간 등이 있습니다.

2. Size(크기): 컬럼에 저장될 데이터의 크기를 지정합니다. 이는 데이터 타입에 따라 다르며, 예를 들어, 문자열의 경우 최대 길이를 지정할 수 있습니다.

3. Default Value(기본값): 컬럼에 새로운 레코드가 추가될 때, 해당 컬럼에 대한 기본값을 지정할 수 있습니다.

4. Nullable(널 허용 여부): 컬럼이 NULL 값을 가질 수 있는지 여부를 지정합니다. 이는 일부 컬럼에 대해 데이터가 없을 경우 유용합니다.

5. Constraints(제약 조건): 컬럼에 대한 제약 조건을 지정할 수 있습니다. 예를 들어, Primary Key, Unique, Not Null 등의 제약 조건이 있습니다.

6. Index(인덱스): 컬럼에 대한 인덱스를 생성할 수 있습니다. 인덱스를 생성하면 데이터를 더 빠르게 검색할 수 있습니다.

7. Auto Increment(자동 증가): 숫자형 컬럼에서 자동으로 값을 증가시키는 기능을 제공합니다. 이는 일반적으로 Primary Key를 만드는 데 사용됩니다.

이러한 Column Attributes를 사용하여 데이터베이스 테이블을 설계하면, 데이터를 더 효율적으로 저장하고 검색할 수 있습니다.

## 2. Inserting a Row

SQL에서 Inserting a Row는 테이블에 새로운 레코드를 추가하는 작업을 말합니다. 이를 통해 데이터베이스에 새로운 데이터를 저장할 수 있습니다.

Inserting a Row를 수행하려면, INSERT INTO 문을 사용해야 합니다. INSERT INTO 문은 다음과 같은 구조를 가지고 있습니다.

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

위 구문에서, table_name은 데이터를 추가하고자 하는 테이블의 이름을 나타냅니다. column1, column2, column3 등은 새로 추가하고자 하는 레코드의 각 컬럼을 나타냅니다. 마지막으로, value1, value2, value3 등은 새로 추가하고자 하는 레코드의 각 컬럼에 저장될 값을 나타냅니다.

예를 들어, 다음과 같은 Customers 테이블이 있다고 가정해봅시다.

```markdown
Customers
ㅡㅡㅡㅡㅡㅡ
CustomerID
CustomerName
ContactName
Country
```

이 테이블에 새로운 레코드를 추가하려면, 다음과 같이 INSERT INTO 문을 사용할 수 있습니다.

```sql
INSERT INTO Customers (CustomerName, ContactName, Country)
VALUES ('John Smith', 'Jane Doe', 'USA');
```

위 구문은 Customers 테이블에 CustomerName, ContactName, Country 컬럼의 값을 새로운 레코드로 추가합니다. 추가된 레코드의 CustomerName 값은 'John Smith', ContactName 값은 'Jane Doe', Country 값은 'USA'가 됩니다.

INSERT INTO 문을 사용하여 테이블에 새로운 레코드를 추가할 수 있으며, 이를 통해 데이터베이스에 새로운 데이터를 저장할 수 있습니다.

Inserting a Row 활용 예시

실습으로 제공된 DB의 Customers 테이블의 'customer_id'는 'Auto Increment'가 설정되어 있기 때문에 별도의 'customer_id'를 명시하지 않아도 됩니다.

```sql
INSERT INTO customers
VALUES (
    DEFAULT,
    'John', -- first_name
    'Smith', -- last_name
    '1990-01-01', -- birth_date
    NULL, -- phone
    'address', -- address
    'city', -- city
    'CA', -- state
    DEFAULT
    )
```

'Default(기본값)'이 제공되는 컬럼을 별도로 표시하고 싶지 않으면 다음과 같이 컬럼 이름을 명시해, 명시된 레코드만 추가할 수 있습니다.

```sql
INSERT INTO customers (
    first_name,
    last_name,
    birth_date,
    address,
    city,
    state
)
VALUES (
    'John', -- first_name
    'Smith', -- last_name
    '1990-01-01', -- birth_date
    'address', -- address
    'city', -- city
    'CA', -- state
    )
```

## 3. Inserting Multiple Rows

SQL의 Inserting Multiple Rows는 하나의 쿼리로 여러 개의 레코드를 한 번에 테이블에 추가하는 작업을 말합니다. 이를 통해 여러 개의 레코드를 빠르고 간편하게 추가할 수 있습니다.

Inserting Multiple Rows를 수행하려면, INSERT INTO 문을 사용해야 합니다. INSERT INTO 문은 다음과 같은 구조를 가지고 있습니다.

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1_1, value2_1, value3_1, ...),
       (value1_2, value2_2, value3_2, ...),
       (value1_3, value2_3, value3_3, ...),
       ...
```

위 구문에서, table_name은 데이터를 추가하고자 하는 테이블의 이름을 나타냅니다. column1, column2, column3 등은 새로 추가하고자 하는 레코드의 각 컬럼을 나타냅니다. 마지막으로, value1_1, value2_1, value3_1 등은 첫 번째 레코드의 각 컬럼에 저장될 값을 나타냅니다. 이어지는 (value1_2, value2_2, value3_2, ...)와 같은 형태로 각각의 레코드를 추가할 수 있습니다.

예를 들어, 다음과 같은 Customers 테이블이 있다고 가정해봅시다.

```markdown
Customers
ㅡㅡㅡㅡㅡㅡ
CustomerID
CustomerName
ContactName
Country
```

이 테이블에 새로운 레코드를 여러 개 추가하려면, 다음과 같이 INSERT INTO 문을 사용할 수 있습니다.

```sql
INSERT INTO Customers (CustomerName, ContactName, Country)
VALUES ('John Smith', 'Jane Doe', 'USA'),
       ('Peter Lee', 'David Kim', 'Korea'),
       ('Lisa Chen', 'Maggie Wong', 'China');
```

위 구문은 Customers 테이블에 새로운 레코드 3개를 한 번에 추가합니다. 추가된 레코드들의 컬럼값은 각각 다르게 지정됩니다.

INSERT INTO 문을 사용하여 테이블에 여러 개의 레코드를 한 번에 추가할 수 있으며, 이를 통해 여러 개의 레코드를 간편하게 추가할 수 있습니다.

Inserting Multiple Rows 활용

Shippers 테이블에는 두 개의 컬럼이 존재합니다.

1. shipper_id
2. name

'shipper_id' 컬럼에는 'Auto Increment'가 적용되어 있기 때문에 'name' 컬럼에 해당하는 레코드만 추가하면 됩니다.

```sql
INSERT INTO shippers (name)
VALUES
    ('Shipper1'),
    ('Shipper2'),
    ('Shipper3')
```

### Inserting Multiple Rows Exercise

이번에는 연습으로 Product 테이블에 3개의 레코드를 추가해보겠습니다.

```sql
INSERT INTO products (name, quantity_in_stock, unit_price)
VALUES
    ('Product1', 10, 1.95)
    ('Product2', 11, 1.95)
    ('Product3', 12, 1.95)
```

## 4. Inserting Hierarchical Rows

SQL의 Inserting Hierarchical Rows는 계층적인 데이터를 효율적으로 저장하기 위한 방법 중 하나입니다. 계층적인 데이터는 하위 데이터가 상위 데이터에 의존하거나, 상위 데이터가 하위 데이터를 포함하는 경우에 주로 사용됩니다. 예를 들면, 조직도, 카테고리 구조, 트리 구조 등이 있습니다.

Inserting Hierarchical Rows는 부모-자식 관계를 가지는 데이터를 저장할 때 사용됩니다. 이때, 각 데이터는 부모 데이터의 id를 참조하며, 부모 데이터가 없는 루트 노드는 일반적으로 NULL 값을 가집니다.

Inserting Hierarchical Rows는 다음과 같은 장점을 가집니다.

- 데이터를 계층적으로 저장하므로, 데이터의 관리가 용이합니다.
- 데이터의 검색 및 조회에 용이합니다.
- 데이터의 추가 및 삭제가 쉽습니다.

하지만, 계층적인 데이터를 저장할 때 데이터의 추가, 수정, 삭제 등이 복잡해지는 문제가 있습니다. 이러한 문제를 해결하기 위해서는 효율적인 알고리즘과 데이터 모델링이 필요합니다.

MySQL에서 Inserting Hierarchical Rows를 구현하는 방법은 다음과 같습니다.

1. 테이블 생성하기

- 계층 구조를 저장할 테이블을 생성합니다.
- 테이블에는 id(primary key), name, parent_id(foreign key) 컬럼이 있어야 합니다.
- parent_id는 부모 노드의 id를 참조합니다.

```sql
CREATE TABLE hierarchical_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  parent_id INT DEFAULT NULL,
  FOREIGN KEY (parent_id) REFERENCES hierarchical_data(id)
);
```

2. 데이터 삽입하기

- 계층 구조 데이터를 삽입할 때, 부모 노드의 id를 함께 저장합니다.
- 루트 노드의 경우 parent_id를 NULL로 설정합니다.

```sql
INSERT INTO hierarchical_data (name, parent_id) VALUES ('root', NULL);
INSERT INTO hierarchical_data (name, parent_id) VALUES ('child1', 1);
INSERT INTO hierarchical_data (name, parent_id) VALUES ('grandchild1', 2);
INSERT INTO hierarchical_data (name, parent_id) VALUES ('child2', 1);
INSERT INTO hierarchical_data (name, parent_id) VALUES ('grandchild2', 4);
```

위와 같이 구현하면, 계층 구조 데이터를 쉽게 삽입할 수 있습니다. 하지만, 이 방법은 부모-자식 관계를 설정하는 작업이 번거로울 수 있습니다. 이를 해결하기 위해서는 저장 프로시저를 사용하거나, 애플리케이션 단에서 부모-자식 관계를 설정하는 로직을 구현할 수 있습니다.

MySQL에서 last_insert_id() 함수는 바로 직전에 실행된 INSERT 문으로 생성된 auto_increment 컬럼의 값을 반환하는 함수입니다.

last_insert_id() 함수는 다음과 같은 방법으로 사용할 수 있습니다.

1. AUTO_INCREMENT 컬럼이 하나만 있는 경우

```sql
INSERT INTO table_name (column1, column2) VALUES ('value1', 'value2');
SELECT LAST_INSERT_ID();
```

위와 같이 INSERT 문을 실행한 후, SELECT 문으로 last_insert_id() 함수를 호출하면 auto_increment 컬럼의 값을 반환합니다.

2. AUTO_INCREMENT 컬럼이 여러 개 있는 경우

```sql
INSERT INTO table_name (column1, column2) VALUES ('value1', 'value2');
SET @last_id = LAST_INSERT_ID();
INSERT INTO another_table (column3, column4) VALUES (@last_id, 'value4');
```

위와 같이 INSERT 문을 실행한 후, SET 문을 사용하여 last_insert_id() 함수의 값을 변수에 저장합니다. 그리고 다른 테이블에서 해당 값을 사용할 수 있습니다.

last_insert_id() 함수는 항상 현재 세션에서 생성된 마지막 auto_increment 값을 반환하기 때문에, 다른 세션에서 실행된 INSERT 문의 auto_increment 값을 반환하지 않습니다. 따라서, 여러 클라이언트가 동시에 INSERT 문을 실행하는 경우, 각각의 클라이언트에서 실행된 INSERT 문의 auto_increment 값을 확인해야 합니다.

Inserting Hierarchical Rows 활용

'orders(부모)' 테이블과 'order_items(자식)' 테이블이 부모-자식 관계를 이루고 있습니다.

```sql
INSERT INTO orders (customer_id, order_date, status)
VALUES (1, '2019-01-02', 1)

SELECT LAST_INSERT_ID()
```

```sql
INSERT INTO orders (customer_id, order_date, status)
VALUES (1, '2019-01-02', 1)

INSERT INTO order_items
VALUES
    (LAST_INSERT_ID(), 1, 1, 2.95),
    (LAST_INSERT_ID(), 2, 1, 3.95)
```

https://velog.io/@sangmin7648/MySQL-WITH-RECURSIVE
https://jjon.tistory.com/entry/Recursive-CTECommon-Table-Expression-%ED%99%9C%EC%9A%A9

## 5. Creating a Copy of a Table

MySQL에서 테이블을 복사하는 방법에는 여러 가지가 있습니다. 여기에서는 CREATE TABLE 문을 사용하여 새 테이블을 만들고 기존 테이블의 내용을 새 테이블로 복사하는 방법을 설명하겠습니다.

다음은 예제입니다.

```sql
CREATE TABLE new_table LIKE old_table;
```

위의 문장은 "old_table"의 구조를 복사하여 "new_table"을 만듭니다. 이 때, "new_table"에는 "old_table"의 데이터가 없습니다.

이제 데이터를 복사해야 합니다. 다음 문장을 사용합니다.

```sql
INSERT INTO new_table SELECT * FROM old_table;
```

위의 문장은 "old_table"의 모든 레코드를 "new_table"로 복사합니다. 이제 "new_table"에는 "old_table"의 모든 데이터가 포함됩니다.

이렇게 하면 기존 테이블의 구조와 데이터를 복사하여 새로운 테이블을 만들 수 있습니다.

MySQL에서 "CREATE TABLE AS" 구문을 사용하면 SELECT 문 결과를 새 테이블로 생성할 수 있습니다. 따라서 이 구문을 이용해 기존 테이블을 복사할 수 있습니다.

다음은 "CREATE TABLE AS" 구문을 사용하여 테이블을 복사하는 예제입니다.

```sql
CREATE TABLE new_table AS
SELECT *
FROM old_table;
```

위의 예제에서 "new_table"은 복사될 새로운 테이블의 이름입니다. "old_table"은 복사될 기존 테이블의 이름입니다. SELECT 문은 "old_table"의 모든 레코드를 가져와서 "new_table"로 복사합니다.

이렇게 하면 "CREATE TABLE" 구문과 "INSERT INTO SELECT" 구문을 사용하는 것보다 간단하게 테이블을 복사할 수 있습니다. 하지만, 주의해야 할 점은 "CREATE TABLE AS" 구문은 새로운 테이블의 구조를 기존 테이블의 구조와 동일하게 만든다는 것입니다. 따라서 복사된 테이블의 이름과 구조를 바꾸려면 ALTER TABLE 문을 사용해야 합니다.

Creating a Copy of a Table 활용

```sql
CREATE TABLE orders_archived AS
SELECT * FROM orders
```

```sql
INSERT INTO order_archived
SELECT *
FROM orders
WHERE order_date < '2019-01-01'
```

### Creating a Copy of a Table Exercise

```sql
USE sql_invoicing;

CREATE TABLE invoices_archived AS
SELECT
    i.invoice_id,
    i.number,
    c.name AS client,
    i.invoice_total,
    i.payment_total,
    invoice_date,
    payment_date,
    i.due_date,
FROM invoices i
JOIN clients c
    USING (client_id)
WHERE payment_date IS NOT NULL
```

## 6. Updating a Single Row

MySQL에서 단일 행을 업데이트하는 방법은 다음과 같습니다.

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

위의 예제에서 "table_name"은 업데이트할 테이블의 이름입니다. "column1", "column2" 등은 업데이트할 열의 이름이며, "value1", "value2" 등은 해당 열에 설정할 값입니다. "WHERE" 절은 업데이트할 행을 선택하는 조건입니다.

예를 들어, "customers" 테이블에서 "customer_id"가 1인 고객의 "first_name"을 "John"으로 업데이트하려면 다음과 같이 작성합니다.

```sql
UPDATE customers
SET first_name = 'John'
WHERE customer_id = 1;
```

위의 예제에서 "customers"는 테이블 이름이며, "first_name"은 업데이트할 열의 이름이고 'John'은 해당 열에 설정할 값입니다. "WHERE" 절은 "customer_id"가 1인 행을 선택하는 조건입니다.

이렇게 하면 "customers" 테이블에서 "customer_id"가 1인 고객의 "first_name"이 "John"으로 업데이트됩니다.

Updating a Single Row 활용

```sql
SELECT * FROM sql_invoicing.invoices;

UPDATE invoices
SET payment_total = 10, payment_date = '2019-03-01'
WHERE invoice_id = 1
```

```sql
SELECT * FROM sql_invoicing.invoices;

UPDATE invoices
SET payment_total = DEFAULT, payment_date = NULL
WHERE invoice_id = 1
```

```sql
SELECT * FROM sql_invoicing.invoices;

UPDATE invoices
SET
    payment_total = payment_total * 0.5,
    payment_date = due_date
WHERE invoice_id = 3
```

## 7. Updating Multiple Rows

MySQL에서 다중 행을 업데이트하는 방법은 다음과 같습니다.

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

위의 예제에서 "table_name"은 업데이트할 테이블의 이름입니다. "column1", "column2" 등은 업데이트할 열의 이름이며, "value1", "value2" 등은 해당 열에 설정할 값입니다. "WHERE" 절은 업데이트할 행을 선택하는 조건입니다.

예를 들어, "customers" 테이블에서 "city"가 "New York"인 모든 고객의 "state"를 "NY"로 업데이트하려면 다음과 같이 작성합니다.

```sql
UPDATE customers
SET state = 'NY'
WHERE city = 'New York';
```

위의 예제에서 "customers"는 테이블 이름이며, "state"는 업데이트할 열의 이름이고 'NY'은 해당 열에 설정할 값입니다. "WHERE" 절은 "city"가 "New York"인 모든 행을 선택하는 조건입니다.

이렇게 하면 "customers" 테이블에서 "city"가 "New York"인 모든 고객의 "state"가 "NY"로 업데이트됩니다. 조건을 충족하는 모든 행이 업데이트됩니다.

Updating Multiple Rows 활용

```sql
UPDATE invoices
SET
    payment_total = invoice_total * 0.5,
    payment_date = due_date
WHERE client_id IN (3, 4)
```

### Updating Multiple Rows Exercise

- MacOS: MySQLWorkBench ==> Preferences ==> SQL Editor ==> Uncheck Safe Updates (rejects UPDATEs and DELETEs with no restrictions)

- Windows: Edit ==> Preferences ==> SQL Editor ==> Uncheck Safe Updates (rejects UPDATEs and DELETEs with no restrictions)

```sql
-- Write a SQL statement to
--  give any customers born before 1990
--  50 extra points
```

```sql
USE sql_store;

UPDATE customers
SET
    points = points + 50
WHERE birth_date < "1990-01-01"
```

```sql
SELECT *
FROM sql_store.customers;
```

## 8. Using Subqueries in Updates

MySQL에서 서브쿼리를 사용하여 업데이트하는 방법은 다음과 같습니다.

```sql
UPDATE table_name
SET column1 = (
    SELECT some_column
    FROM another_table
    WHERE condition
)
WHERE condition;
```

위의 예제에서 "table_name"은 업데이트할 테이블의 이름입니다. "column1"은 업데이트할 열의 이름이며, 서브쿼리의 결과로 설정됩니다. "another_table"은 서브쿼리에서 사용할 다른 테이블의 이름입니다. "some_column"은 서브쿼리에서 반환될 값입니다. "WHERE" 절은 업데이트할 행을 선택하는 조건입니다.

예를 들어, "customers" 테이블에서 "city"가 "New York"인 모든 고객의 "state"를 해당 고객이 위치한 "salespersons" 테이블의 "state"로 업데이트하려면 다음과 같이 작성합니다.

```sql
UPDATE customers
SET state = (
    SELECT state
    FROM salespersons
    WHERE customers.salesperson_id = salespersons.salesperson_id
)
WHERE city = 'New York';
```

위의 예제에서 "customers"는 업데이트할 테이블이고, "state"는 업데이트할 열입니다. 서브쿼리는 "salespersons" 테이블에서 "salesperson_id"와 일치하는 행의 "state"를 반환합니다. "WHERE" 절은 "city"가 "New York"인 모든 행을 선택합니다.

이렇게 하면 "customers" 테이블에서 "city"가 "New York"인 모든 고객의 "state"가 해당 고객이 위치한 "salespersons" 테이블의 "state"로 업데이트됩니다. 서브쿼리를 사용하면 다른 테이블에서 데이터를 가져와 업데이트할 수 있습니다.

Using Subqueries in Updates 활용

```sql
SELECT client_id
FROM clients
WHERE name = 'Myworks'
```

```sql
SELECT * FROM sql_invoicing.invoices;

UPDATE invoices
SET
    payment_total = payment_total * 0.5,
    payment_date = due_date
WHERE client_id IN (
    SELECT client_id
    FROM clients
    WHERE state IN ('CA', 'NY')
)
```

<hr />

```sql
SELECT *
FROM invoices
WHERE payment_date IS NULL
```

```sql
SELECT * FROM sql_invoicing.invoices;

UPDATE invoices
SET
    payment_total = payment_total * 0.5,
    payment_date = due_date
WHERE payment_date IS NULL
```

<hr />

```sql
SELECT *
FROM customers
WHERE points > 3000
```

```sql
UPDATE orders
SET comments = 'Gold Customer'
WHERE customer_id IN (
    SELECT customer_id
    FROM customers
    WHERE points > 3000
)
```

## 9. Deleting Rows

MySQL에서 행을 삭제하는 방법은 다음과 같습니다.

```sql
DELETE FROM table_name
WHERE condition;
```

위의 예제에서 "table_name"은 삭제할 행이 포함된 테이블의 이름입니다. "WHERE" 절은 삭제할 행을 선택하는 조건입니다.

예를 들어, "customers" 테이블에서 "city"가 "New York"인 모든 고객을 삭제하려면 다음과 같이 작성합니다.

```sql
DELETE FROM customers
WHERE city = 'New York';
```

위의 예제에서 "customers"는 테이블 이름이며, "WHERE" 절은 "city"가 "New York"인 모든 행을 선택합니다.

이렇게 하면 "customers" 테이블에서 "city"가 "New York"인 모든 고객이 삭제됩니다. 조건을 충족하는 모든 행이 삭제됩니다. 또한, "DELETE" 명령어는 롤백이 불가능한 작업이므로, 삭제 전에 잘못 선택하지 않았는지 확인해야 합니다.

Deleting Rows 활용

```sql
DELETE FORM invocies
WHERE invoice_id = 1
```

```sql
DELETE FROM invoices
WHERE client_id = (
    SELECT *
    FROM clients
    WHERE name = 'Myworks'
)
```

## 10. Restoring the Databases

'create-databases.sql' 파일을 불러와 실행하면 모든 결과를 초기화할 수 있습니다.

MySQL에서 백업된 데이터베이스를 복원하는 방법은 다음과 같습니다.

1. 백업 파일의 위치 확인하기

- 복원하려는 백업 파일의 위치를 확인합니다.

2. MySQL 서버 접속하기

- MySQL 서버에 접속합니다.

```sql
mysql -u [username] -p
```

3. 데이터베이스 생성하기

- 복원할 데이터베이스를 생성합니다.

```sql
CREATE DATABASE database_name;
```

4. 백업 파일 적용하기

- 백업 파일을 적용합니다.

```sql
mysql -u [username] -p database_name < backup_file.sql
```

위의 명령어에서 "username"은 MySQL 서버에 접근하는 데 사용되는 사용자 이름입니다. "database_name"은 복원할 데이터베이스의 이름입니다. "backup_file.sql"은 복원하려는 백업 파일의 이름입니다.

백업 파일이 대용량인 경우, 백업 파일의 용량이 큰 경우, 데이터베이스를 복원하는 데 시간이 오래 걸리는 문제가 발생할 수 있습니다. 이 경우, "mysqlimport"를 사용하여 백업 파일을 빠르게 복원할 수 있습니다.

```sql
mysqlimport -u [username] -p database_name backup_file.sql
```

위의 명령어에서 "username"은 MySQL 서버에 접근하는 데 사용되는 사용자 이름입니다. "database_name"은 복원할 데이터베이스의 이름입니다. "backup_file.sql"은 복원하려는 백업 파일의 이름입니다.

복원된 데이터베이스를 확인하려면 MySQL 서버에 다시 로그인하고 데이터베이스를 선택한 다음 테이블과 데이터를 확인합니다.

```sql
mysql -u [username] -p
USE database_name;
SHOW TABLES;
SELECT * FROM table_name;
```

위의 예제에서 "username"은 MySQL 서버에 접근하는 데 사용되는 사용자 이름입니다. "database_name"은 복원된 데이터베이스의 이름입니다. "table_name"은 데이터베이스에 포함된 테이블의 이름입니다.
