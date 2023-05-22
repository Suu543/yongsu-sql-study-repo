# Stored Procedures

1. What are Stored Procedures?
2. Creating a Stored Procedures
3. Creating Procedures Using MySQL Workbench
4. Dropping Stored Procedures
5. Parameters
6. Parameters with Default Value
7. Parameter Validation
8. Output Parameters
9. Variables
10. Functions
11. Other Conventions

## 1. What are Stored Procedures?

정의:

Stored Procedures(저장 프로시저)는 데이터베이스에서 실행되는 프로그램의 일종으로, 데이터베이스 서버에 저장된 SQL 코드의 집합입니다. 이 코드는 일련의 작업을 수행하고 데이터베이스에서 결과를 반환합니다.

Stored Procedures는 일반 SQL 코드보다 더욱 효율적이며, 여러 장점이 있습니다. 먼저, 데이터베이스에서 Stored Procedures를 실행하면 네트워크 오버헤드가 줄어듭니다. 이는 Stored Procedures가 데이터베이스 서버에서 실행되므로, 결과를 반환하기 위해 네트워크를 통해 데이터를 전송하지 않아도 되기 때문입니다. 또한, Stored Procedures는 재사용성이 높습니다. 저장된 프로시저는 데이터베이스에서 실행될 수 있으며, 다른 애플리케이션에서도 호출될 수 있습니다. 이는 코드의 중복을 방지하고, 코드의 유지 보수성을 높입니다.

또한, Stored Procedures는 보안성이 높습니다. 저장된 프로시저는 사용자가 직접 SQL 코드를 실행할 수 없으므로, 데이터베이스 관리자가 권한을 부여하여 사용자가 접근할 수 있는 기능을 제한할 수 있습니다.

마지막으로, Stored Procedures는 데이터베이스의 성능을 향상시키는 데 도움을 줍니다. Stored Procedures는 데이터베이스 내부에서 미리 컴파일되기 때문에 실행 속도가 빠르며, 데이터베이스 서버의 자원을 효율적으로 사용할 수 있습니다.

실사례:

다음 사진과 같이 `C#, Java or Python`등의 프로그래밍 언어와 함께 `SQL` 코드를 섞어서 사용하는 경우, `SQL` 코드를 `Machine Code`로 변환하는 하는 데 컴파일 등으로 컴퓨팅 파워를 사용할 뿐만 아니라, 코드를 수정할 때마다 재컴파일을 해야 하기 때문에 복잡한 과정이 요구됩니다. 특정 반복되는 `SQL` 코드를 마치 프로그래밍에서 함수를 실행하는 것처럼 `Stored Procedure or Function`에 저장함으로써 이 수고를 덜 수 있습니다.

<img src="https://cdn-images-1.medium.com/max/800/1*UQ9vdk_GJv_XQGyue6D8wQ.png" />
<img src="https://cdn-images-1.medium.com/max/800/1*myK0P1jXT9QtWWAYoToAMw.png" />

Stored Procedures

- Store and organize SQL
- Faster Execution
- Data Security

## 2. Creating a Stored Procedures

기본적으로 SQL 쿼리에서 문장은 세미콜론(;)으로 구분됩니다. 그러나 때로는 세미콜론을 사용할 수 없는 상황이 발생할 수 있습니다. 예를 들어, 사용자 정의 함수나 `Stored Procedures` 등에서 세미콜론을 사용하면 구문 오류(Syntax Error)가 발생할 수 있습니다.

이러한 상황에서 "DELIMITER"를 사용하면 세미콜론 외에 다른 구분자를 사용할 수 있습니다. "DELIMITER"를 설정하면 SQL 쿼리의 끝을 나타내는 구분자를 변경할 수 있으며, 새로운 구분자를 사용하여 쿼리를 작성할 수 있습니다.

보통 "DELIMITER"는 세미콜론(;)이 아닌 다른 문자(일반적으로 "//" 또는 "$$")를 사용합니다. "DELIMITER"를 사용하면 `Stored Procedures` 혹은 저장된 프로시저 등에서 세미콜론을 사용할 수 있으며, SQL 쿼리가 실행될 때 세미콜론이 문장 구분자로 인식되지 않도록 할 수 있습니다.

- "DELIMITER"를 사용하지 않은 경우

```sql
CREATE PROCEDURE get_clients()
BEGIN
	SELECT * FROM clients;
END
```

- "DELIMITER"를 사용한 경우

```sql
USE sql_invoicing;

DELIMITER $$
CREATE PROCEDURE get_clients()
BEGIN
	SELECT * FROM clients;
END$$

DELIMITER ;
```

생성한 "Stored Procedures"를 호출하고 싶은 경우

```sql
CALL get_clients();
```

### Creating a Stored Procedure Exercise

```sql
-- Create a stored procedure called
--      get_invoices_with_balance
--      to return all the invoices with a balance > 0
```

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

SELECT *
FROM invoices_with_balance;
```

```sql
DELIMITER $$
CREATE PROCEDURE get_invoices_with_balance()
BEGIN
	SELECT *
    FROM invoices_with_balance
    WHERE balance > 0;
END$$

DELIMITER ;

CALL get_invoices_with_balance();
```

## 3. Creating Procedures Using MySQL Workbench

"Stored Procedure"에서 우클릭 ==> "Create Stored Procedures" 클릭 후 생성

## 4. Dropping Stored Procedures

삭제하기 전, "Stored Procedures" 폴더를 하나 생성하고 해당 함수 코드를 저장해서 소스를 관리할 수 있습니다.

```sql
DROP PROCEDURE IF EXISTS get_clients;

DELIMITER $$
CREATE PROCEDURE get_clients()
BEGIN
	SELECT * FROM clients;
END $$
DELIMITER ;
```

## 5. Parameters

MySQL의 Stored Procedure(저장 프로시저)에서 Parameters(매개변수)는 프로시저를 호출할 때 전달되는 값들을 의미합니다.

프로시저의 실행 결과를 반환하는 SELECT 문이나 결과를 처리하는 INSERT, UPDATE, DELETE 문 등에 필요한 값들을 말합니다.

```sql
DROP PROCEDURE IF EXISTS get_clients_by_state;

DELIMITER $$
CREATE PROCEDURE get_clients_by_state
(
	state CHAR(2) -- NY, CA
)
BEGIN
	SELECT * FROM clients c
    WHERE c.state = state;
END $$
DELIMITER ;

CALL get_clients_by_state('CA');
```

### Parameters Exercise

```sql
-- Write a stored procedure to return invoices
--  for a given client
--  get_invoices_by_client
```

```sql
DROP PROCEDURE IF EXISTS get_invoices_by_client;

DELIMITER $$
CREATE PROCEDURE get_invoices_by_client
(
	client_id INT
)
BEGIN
	SELECT * FROM invoices i
    WHERE i.client_id = client_id;
END $$
DELIMITER ;

CALL get_invoices_by_client(1);
```

## 6. Parameters with Default Value

MySQL의 Stored Procedure(저장 프로시저)에서 매개변수(Parameters)에 기본값(Default Value)을 지정할 수 있습니다.

매개변수의 기본값을 지정하면 프로시저를 호출할 때 해당 매개변수에 값을 전달하지 않으면 기본값이 사용됩니다. 이를 통해 프로시저를 호출할 때 일부 매개변수에만 값을 전달하고 나머지 매개변수는 기본값을 사용하는 것이 가능해집니다.

매개변수의 기본값을 지정하려면 다음과 같이 프로시저를 작성하면 됩니다.

```sql
CREATE PROCEDURE myProcedure
(
    IN param1 INT,
    IN param2 VARCHAR(255) DEFAULT 'default_value'
)
BEGIN
END
```

위의 예제에서는 매개변수 param2에 'default_value'라는 기본값을 지정하였습니다. 만약, 프로시저를 호출할 때 param2에 값을 전달하지 않으면 'default_value'가 기본값으로 사용됩니다.

매개변수에 기본값을 지정하면 프로시저를 호출할 때 해당 매개변수에 값을 전달하지 않아도 되므로, 프로시저를 더 유연하게 사용할 수 있습니다. 또한, 매개변수의 기본값을 사용하면 일부 매개변수에만 값을 전달하는 것이 가능해져 프로시저를 호출할 때 매개변수의 개수를 줄일 수 있습니다.

```sql
DROP PROCEDURE IF EXISTS get_clients_by_state;

DELIMITER $$
CREATE PROCEDURE get_clients_by_state
(
	state CHAR(2) -- NY, CA
)
BEGIN
	IF state IS NULL THEN
		SET state = "CA";
	END IF;
END $$
DELIMITER ;

CALL get_clients_by_state(NULL);
```

```sql
DROP PROCEDURE IF EXISTS get_clients_by_state;

DELIMITER $$
CREATE PROCEDURE get_clients_by_state
(
	state CHAR(2) -- NY, CA
)
BEGIN
	IF state IS NULL THEN
		SELECT * FROM clients;
	ELSE
		SELECT * FROM clients c
        WHERE c.state = state;
	END IF;
END $$
DELIMITER ;

CALL get_clients_by_state(NULL);
CALL get_clients_by_state("CA");
```

"IF - END IF" 사용으로 인한 코드 길이 증가 문제를 해결해보겠습니다.

IFNULL: 첫번째 인자 값이 NULL 이라면, 두번째 인자 값을 리턴함.

```sql
DROP PROCEDURE IF EXISTS get_clients_by_state;

DELIMITER $$
CREATE PROCEDURE get_clients_by_state
(
	state CHAR(2) -- NY, CA
)
BEGIN
	SELECT * FROM clients c
    -- If the first value is null, it returns the second value
	WHERE c.state = IFNULL(state, c.state);
END $$
DELIMITER ;

CALL get_clients_by_state(NULL);
CALL get_clients_by_state("CA");
```

### Parameters with Default Value Exercise

```sql
-- Write a stored procedure called get_payments
-- with two parameters
--  client_id => INT(4)
--  payment_method_id => TINYINT(1) 0 - 255
```

```sql
DROP PROCEDURE IF EXISTS get_payments;

DELIMITER $$
CREATE PROCEDURE get_payments
(
	client_id INT,
    payment_method_id TINYINT
)
BEGIN
	SELECT * FROM payments p
    WHERE
		p.client_id = IFNULL(client_id, p.client_id) AND
        p.payment_method = IFNULL(payment_method_id, p.payment_method);
END $$
DELIMITER ;

CALL get_payments(NULL, NULL);
CALL get_payments(1, 1);
```

## 7. Parameter Validation

```sql
DROP PROCEDURE IF EXISTS make_payment;

DELIMITER $$
CREATE PROCEDURE make_payment
(
	invoice_id INT,
    payment_amount DECIMAL(9, 2),
    payment_date DATE
)
BEGIN
	UPDATE invoices i
    SET
		i.payment_total = payment_amount,
        i.payment_date = payment_date
	WHERE i.invoice_id = invoice_id;
END$$

DELIMITER ;

CALL make_payment(2, 100, "2019-01-01");
```

위 쿼리의 문제는 음수 값이 반영된다는 점입니다.
음수 값이 반영되지 않도록 구현해보겠습니다.

```sql
DROP PROCEDURE IF EXISTS make_payment;

DELIMITER $$
CREATE PROCEDURE make_payment
(
	invoice_id INT,
    payment_amount DECIMAL(9, 2),
    payment_date DATE
)
BEGIN
	IF payment_amount <= 0 THEN
		-- 예외처리: 22: 22003 DATA EXCEPTION
        SIGNAL SQLSTATE "22003"
			SET MESSAGE_TEXT = "Invalid Payment Amount";
	END IF;
    UPDATE invoices i
    SET
		i.payment_total = payment_amount,
        i.payment_date = payment_date
	WHERE i.invoice_id = invoice_id;
END$$

DELIMITER ;

CALL make_payment(2, -100, "2019-01-01");
```

## 8. Output Parameters

IN: 매개변수를 프로시저 안에서 사용하기 위한 용도로 사용됩니다. IN 매개변수는 프로시저의 시작 부분에서 선언되며, 호출 시에 매개변수 값이 전달됩니다.

OUT: 프로시저의 실행 결과를 저장하는 용도로 사용됩니다. OUT 매개변수는 프로시저 안에서 선언되며, 호출 시에는 초기값을 전달할 필요가 없습니다. 프로시저가 실행된 후 OUT 매개변수에 저장된 값이 호출된 곳으로 반환됩니다.

INOUT: INOUT 매개변수는 IN 매개변수와 OUT 매개변수의 기능을 모두 가지고 있습니다. 호출 시에 매개변수 값이 전달되며, 프로시저가 실행되면서 값이 변경되고, 실행 결과로 변경된 값을 호출된 곳으로 반환합니다.

```sql
DROP PROCEDURE IF EXISTS get_unpaid_invoices_for_client;

DELIMITER $$
CREATE PROCEDURE get_unpaid_invoices_for_client
(
	client_id INT,
    OUT invoices_count INT,
    OUT invoices_total DECIMAL(9, 2)
)
BEGIN
	SELECT COUNT(*), SUM(invoice_total)
    INTO invoices_count, invoices_total
    FROM invoices i
    WHERE i.client_id = client_id
		AND payment_total = 0;
END$$

DELIMITER ;

set @invoices_count = 0;
set @invoices_total = 0;

CALL get_unpaid_invoices_for_client(3, @invoices_count, @invoices_total);
SELECT @invoices_count, @invoices_total;
```

## 9. Variables

MySQL에서 Variables(변수)는 프로그램에서 사용하는 일종의 저장 공간으로, 프로그램 내에서 데이터를 저장하고 관리하는 데 사용됩니다.

MySQL에서는 다양한 타입의 변수를 지원하며, 대표적으로는 다음과 같은 변수 타입이 있습니다.

- user-defined variables: 사용자가 정의한 변수로 '@' 기호를 이용하여 변수를 생성하고 사용합니다.

- local variables: 프로시저에서 사용되는 변수로, 프로시저의 선언부에서 선언되며, 프로시저가 종료되면 사라집니다.

- global variables: MySQL 서버 전체에서 사용되는 변수로, SET GLOBAL 명령을 이용하여 변수를 설정할 수 있습니다.

- session variables: MySQL 세션에서 사용되는 변수로, SET SESSION 명령을 이용하여 변수를 설정할 수 있습니다.

변수는 값을 저장하거나 저장된 값을 참조할 때 사용됩니다. MySQL에서 변수를 사용하여 쿼리를 작성하면 쿼리의 유연성을 높일 수 있습니다. 변수를 사용하면 일반적으로 동적인 쿼리를 작성할 수 있으며, 프로그램에서 쉽게 값을 변경하거나 저장할 수 있습니다.

변수는 다음과 같은 방법으로 사용할 수 있습니다.

```sql
-- user-defined variable 생성 및 사용
SET @myVariable = 10;
SELECT @myVariable;

-- local variable 생성 및 사용
CREATE PROCEDURE myProcedure()
BEGIN
  DECLARE myVariable INT DEFAULT 10;
  SELECT myVariable;
END;

-- global variable 생성 및 사용
SET GLOBAL myVariable = 10;
SELECT @@myVariable;

-- session variable 생성 및 사용
SET SESSION myVariable = 10;
SELECT @@myVariable;
```

위 예제에서는 각각의 변수 타입에 대해 생성 방법과 사용 방법이 나와있습니다. 변수를 사용하여 쿼리를 작성할 때는 쿼리 내에서 변수를 참조할 때 '@' 기호를 이용하여 변수를 참조할 수 있습니다.

```sql
-- User or Session Variables
SET @invoices_count = 0;

-- Local Variable

DROP PROCEDURE IF EXISTS get_risk_factor;

DELIMITER $$
CREATE PROCEDURE get_risk_factor()
BEGIN
	-- declare 변수 선언
	DECLARE risk_factor DECIMAL(9, 2) DEFAULT 0;
    DECLARE invoices_total DECIMAL(9, 2);
    DECLARE invoices_count INT;

    SELECT COUNT(*), SUM(invoice_total)
    INTO invoices_count, invoices_total
    FROM invoices;

    SET risk_factor = invoices_total / invoices_count * 5;

    SELECT risk_factor;
-- risk_factor = invoices_total / invoices_count * 5;
END$$
DELIMITER ;

CALL get_risk_factor();
```

## 10. Functions

MySQL에서 Functions(함수)는 일련의 입력값에 대해 계산을 수행하고, 결과값을 반환하는 프로그램 단위입니다. 함수는 데이터베이스에서 많은 작업을 수행할 때 유용하게 사용됩니다.

MySQL에서 제공하는 함수는 매우 다양합니다. 일부 함수는 특정 타입의 데이터를 다루고, 다른 함수들은 날짜 및 시간, 문자열 처리, 수학 등의 작업을 처리할 수 있습니다. 몇 가지 예를 들면 다음과 같습니다.

- 문자열 처리 함수: CONCAT(), SUBSTR(), LENGTH(), LOWER(), UPPER() 등
- 날짜 및 시간 함수: NOW(), DATE(), TIME(), YEAR(), MONTH(), DAY() 등
- 수학 함수: ABS(), CEILING(), FLOOR(), ROUND(), TRUNCATE() 등
- 비교 함수: IF(), CASE(), COALESCE() 등

MySQL에서는 사용자 정의 함수도 생성할 수 있습니다. 사용자 정의 함수는 특정 작업을 수행하고 결과값을 반환하는 함수로, 사용자가 정의한 함수를 호출하여 사용할 수 있습니다.

MySQL 함수의 일반적인 구문은 다음과 같습니다.

```sql
CREATE FUNCTION function_name(param1 data_type, param2 data_type, ...)
RETURNS return_type
BEGIN
  -- function body
END;
```

위의 구문에서는 함수 이름, 매개변수, 반환 타입, 함수 본문이 포함됩니다. 함수 본문은 BEGIN과 END 사이에 작성됩니다.

MySQL 함수는 쿼리에서 사용할 수 있으며, 다른 함수나 프로시저 내에서도 호출할 수 있습니다. 함수는 데이터베이스에서 계산을 수행하고, 결과값을 반환하는 데 사용되므로, 데이터베이스에서 복잡한 작업을 수행할 때 유용하게 사용됩니다.

"Stored Procedures"와 가장 큰 차이 점은, "Function"은 항상 단일 값만을 리턴하다는 점 입니다.

```sql
-- function은 단일 값 만을 리턴할 수 있는 차이가 있다.
DELIMITER $$

CREATE FUNCTION get_risk_factor_for_client
(
	client_id INT
)
RETURNS INTEGER
-- 항상 같은 인풋에는 같은 결과 값을 리턴함을 의미합니다.
-- DETERMINISTIC
READS SQL DATA
-- MODIFIES SQL DATA
BEGIN
	DECLARE risk_factor DECIMAL(9, 2) DEFAULT 0;
    DECLARE invoices_total DECIMAL(9, 2);
    DECLARE invoices_count INT;

    SELECT COUNT(*), SUM(invoice_total)
    INTO invoices_count, invoices_total
    FROM invoices i
    WHERE i.client_id = client_id;

    SET risk_factor = invoices_total / invoices_count * 5;

    RETURN IFNULL(risk_factor, 0);
END$$

DELIMITER ;
```

마치 내장된 함수 처럼 사용할 수 있습니다.

```sql
SELECT
	client_id,
    name,
    get_risk_factor_for_client(client_id) AS risk_factor
FROM clients

DROP FUNCTION IF EXISTS get_risk_factor_for_client;
```

## 11. Other Conventions

```sql
-- DELIMITER // or $$
-- procGetRiskFactor
-- getRiskFactor
-- get_risk_factor
-- fnGetRiskFactor
```
