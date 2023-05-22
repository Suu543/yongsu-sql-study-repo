# Triggers and Events

1. Triggers
2. Viewing Triggers
3. Dropping Triggers
4. Using Triggers for Auditing
5. Events
6. Viewing, Droping and Altering Events

## 1. Triggers

Trigger: A block of SQL code that automatically gets executed before or after an insert, update, or delete statement.

MySQL의 Trigger와 Events는 데이터베이스에서 특정 이벤트가 발생할 때 자동으로 실행되는 작업을 정의하는 데 사용됩니다.

Trigger는 데이터베이스에서 INSERT, UPDATE, DELETE와 같은 특정 이벤트가 발생할 때 실행되는 작업을 정의하는 데 사용됩니다. 예를 들어, 데이터베이스에 새로운 레코드가 삽입되면, Trigger는 해당 레코드에 대한 추가 작업을 자동으로 수행할 수 있습니다. Trigger는 데이터의 무결성을 유지하고, 데이터베이스를 자동화하며, 일관성 있는 처리를 보장하는 데 사용됩니다.

MySQL의 Trigger는 BEFORE 또는 AFTER 이벤트에서 실행할 수 있으며, 테이블에 대한 INSERT, UPDATE, DELETE 이벤트와 같은 트리거 액션을 수행할 수 있습니다.

Events는 주기적으로 실행되는 스케줄링 작업을 정의하는 데 사용됩니다. 예를 들어, 데이터베이스에 매일 밤 자동으로 백업 파일을 만들도록 스케줄링할 수 있습니다. Events는 스케줄링 작업을 수행하고, 데이터베이스 관리를 자동화하는 데 사용됩니다.

MySQL의 Events는 특정 시간 또는 주기적으로 실행할 수 있으며, 지정된 SQL 문을 수행할 수 있습니다. 또한, Events는 데이터베이스 서버에서 실행되기 때문에, 시스템이 사용 가능한 경우에만 작업이 수행되도록 스케줄링할 수 있습니다.

이러한 Trigger와 Events는 MySQL 데이터베이스에서 자동화된 작업을 수행하고, 일관성 있는 처리와 데이터 무결성을 유지하는 데 매우 유용합니다.

Trigger 정의 방법은 다음과 같습니다.

1. Trigger를 생성할 테이블을 선택합니다.

```sql
USE your_database;
```

2. 테이블에 대한 Trigger를 생성합니다.

```sql
CREATE TRIGGER trigger_name
    BEFORE INSERT      -- Trigger가 실행될 이벤트 (INSERT, UPDATE, DELETE)
    ON table_name      -- Trigger가 실행될 테이블
    FOR EACH ROW      -- 트리거를 각 행에 대해 실행할 것인지 지정
    BEGIN
        -- 트리거에서 수행할 작업 (SQL문)
    END;
```

3. 트리거에서 실행할 작업을 정의합니다.

```sql
CREATE TRIGGER trigger_name
    BEFORE INSERT
    ON table_name
    FOR EACH ROW
    BEGIN
        SET NEW.column_name = 'value'; -- INSERT되는 새로운 행에 대한 열 값을 설정
    END;
```

4. Trigger를 삭제할 때는 DROP TRIGGER 문을 사용합니다.

```sql
DROP TRIGGER trigger_name;
```

Trigger는 데이터베이스의 특정 이벤트가 발생할 때 실행되기 때문에, 이벤트가 발생하기 전에 실행되어야 하는 작업을 정의할 때는 BEFORE Trigger를 사용하고, 이벤트가 발생한 후에 실행되어야 하는 작업을 정의할 때는 AFTER Trigger를 사용합니다.

또한, MySQL Trigger는 INSERT, UPDATE, DELETE 이벤트와 함께 작동할 수 있으며, 이벤트 발생 시 해당 테이블에 대해 지정된 SQL 문을 실행할 수 있습니다.

```sql
DELIMITER $$

DROP TRIGGER IF EXISTS payments_after_insert;


--  테이블 이름 + 전/후 + 테이블 동작
CREATE TRIGGER payments_after_insert
	-- BEFORE INSERT ON payments
	AFTER INSERT ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    -- OLD, NEW
    SET payment_total = payment_total + NEW.amount
    WHERE invoice_id = NEW.invoide_id;
END $$

DELIMITER ;
```

```sql
INSERT INTO payments
VALUES (DEFAULT, 5, 3, '2019-01-01', 10, 1);
```

본래는 VALUES 구문에 정의한 amount를 바로 해당 테이블에 삽입했다면,
TRIGGER를 정의했기 때문에, VALUES에 적은 AMOUNT 값 만큼 기존 테이블의 AMOUNT에 더해주는 방식으로 동작합니다.

### Trigger Exercise

```sql
-- Create a trigger that gets fired when we delete a payment
```

```sql
USE sql_invoicing;

DELIMITER $$

DROP TRIGGER IF EXISTS payments_after_delete;

--  테이블 이름 + 전/후 + 테이블 동작
CREATE TRIGGER payments_after_delete
	AFTER DELETE ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    SET payment_total = payment_total - OLD.amount
    WHERE invoice_id = OLD.invoice_id;
END $$

DELIMITER ;

DELETE FROM payments
WHERE payment_id = 10;
```

## 2. Viewing Triggers

```sql
SHOW TRIGGERS;
-- payments 테이블과 관련된 Trigger만 보고 싶은 경우
SHOW TRIGGERS LIKE "payments%"
-- table_after_insert
```

## 3. Dropping Triggers

```sql
DROP TRIGGER IF EXISTS payments_after_insert;
```

## 4. Using Triggers for Auditing

데이터베이스에 누가, 언제, 어떤 수정을 했는지 알고 싶은 경우,
payment_audit 테이블 등을 별도로 하나 생성하구 Trigger 내부에 수정 사항을 반영하는 추가적인 쿼리를 작성해
모든 수정 사항을 payment_audit 테이블에 기록할 수 있습니다.

```sql
USE sql_invoicing;

CREATE TABLE payments_audit
(
	client_id 		INT 			NOT NULL,
    date 			DATE 			NOT NULL,
    amount 			DECIMAL(9, 2) 	NOT NULL,
    action_type 	VARCHAR(50) 	NOT NULL,
    action_date 	DATETIME 		NOT NULL
)
```

```sql
USE sql_invoicing;

DELIMITER $$

DROP TRIGGER IF EXISTS payments_after_insert;

CREATE TRIGGER payments_after_insert
	AFTER INSERT ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    SET payment_total = payment_total + NEW.amount
    WHERE invoice_id = NEW.invoice_id;

    INSERT INTO payments_audit
    VALUES (NEW.client_id, NEW.date, NEW.amount, "Insert", NOW());
END $$

DELIMITER ;

INSERT INTO payments
VALUES (DEFAULT, 5, 3, "2019-01-01", 10, 1);
```

```sql
USE sql_invoicing;

DELIMITER $$

DROP TRIGGER IF EXISTS payments_after_delete;

CREATE TRIGGER payments_after_delete
	AFTER DELETE ON payments
    FOR EACH ROW
BEGIN
	UPDATE invoices
    SET payment_total = payment_total - OLD.amount
    WHERE invoice_id = OLD.invoice_id;

	INSERT INTO payments_audit
    VALUES (OLD.client_id, OLD.date, OLD.amount, "Delete", NOW());
END $$

DELIMITER ;

DELETE FROM payments
WHERE payment_id = 11;
```

## 5. Events

Events: A task (or block of SQL code) that gets executed according to a schedule.

MySQL Events는 정기적으로 실행되는 작업을 정의하는 데 사용되는 기능입니다. 이를 사용하면 시스템에서 특정 시간 또는 날짜에 작업을 자동으로 수행할 수 있습니다. 예를 들어, 데이터베이스 백업이나 일일 보고서를 자동으로 생성하는 등의 작업을 수행할 수 있습니다.

MySQL Events는 다음과 같은 이점을 제공합니다.

- 반복적인 작업을 자동화할 수 있습니다.
- 일관성 있는 처리를 보장할 수 있습니다.
- 인터벌이나 날짜에 따라 작업을 예약할 수 있습니다.

MySQL Events는 다음과 같은 구성 요소로 구성됩니다.

- Schedule : 이벤트가 실행되는 주기를 지정합니다. (예: 매 시간, 매일, 매주, 매월 등)
- SQL Statement : 실행할 SQL 문을 정의합니다.
- Status : 이벤트가 활성화되었는지 여부를 지정합니다.

MySQL Events를 사용하려면 다음과 같은 단계를 따르면 됩니다.

1. 이벤트 스케줄을 정의합니다.

```sql
CREATE EVENT event_name
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    -- 이벤트에서 실행할 SQL 문
END;
```

2. 이벤트를 활성화합니다.

```sql
ALTER EVENT event_name
ON COMPLETION PRESERVE
ENABLE;
```

3. 이벤트를 비활성화하려면 DISABLE 키워드를 사용합니다.

```sql
ALTER EVENT event_name
DISABLE;
```

4. 이벤트를 삭제하려면 DROP EVENT 문을 사용합니다.

```sql
DROP EVENT event_name;
```

MySQL Events는 일정한 간격으로 실행되어야 하는 작업을 자동화하는 데 유용한 기능입니다. 이를 사용하여 데이터베이스 유지 보수와 관리를 간편하게 할 수 있습니다.

```sql
-- 기본값으로 존재합니다.
-- 컴퓨팅 자원을 절약하기 위해 OFF로 설정하는 경우도 있습니다.
SHOW VARIABLES LIKE "event%";
SET GLOBAL event_scheduler = OFF;
```

```sql
DELIMITER $$

CREATE EVENT yearly_delete_stale_audit_rows
ON SCHEDULE
	-- 한 번만 사용하고 싶은 경우 : AT
	-- AT '2019-05-01'
    EVERY 1 YEAR STARTS "2019-01-01" ENDS "2029-01-01"
DO BEGIN
	DELETE FROM payments_audit
    WHERE action_date < NOW() - INTERVAL 1 YEAR;
    -- DATESUB(NOW(), INTERVAL - 1 YEAR)
END $$

DELIMITER ;
```

## 6. Viewing, Droping and Altering Events

```sql
-- 이벤트 확인하는 방법
SHOW EVENTS;

-- 1년 주기의 이벤트를 확인하는 방법
SHOW EVENTS LIKE 'yearly%';

-- 이벤트 삭제하는 방법
DROP EVENT IF EXISTS yearly_delete_stale_audit_rows;

-- 이벤트 비활성화 하는 방법
ALTER EVENT yearly_delete_stale_audit_rows DISABLE;
ALTER EVENT yearly_delete_stale_audit_rows ENABLE;

-- 이벤트 수정하는 방법
DELIMITER $$

ALTER EVENT yearly_delete_stale_audit_rows
ON SCHEDULE
	-- 한 번만 사용하고 싶은 경우 : AT
	-- AT '2019-05-01'
    EVERY 1 YEAR STARTS "2019-01-01" ENDS "2029-01-01"
DO BEGIN
	DELETE FROM payments_audit
    WHERE action_date < NOW() - INTERVAL 1 YEAR;
    -- DATESUB(NOW(), INTERVAL - 1 YEAR)
END $$

DELIMITER ;
```
