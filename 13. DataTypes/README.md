# MYSQL DATA TYPES

MySQL에서는 다양한 데이터 유형을 지원합니다. 각 데이터 유형은 데이터베이스 내에서 저장되는 값의 형식을 정의하고, 해당 값들에 대한 연산 및 제약 조건을 설정하는 데 사용됩니다. 이제 MySQL에서 지원하는 일부 주요 데이터 유형을 설명해 드리겠습니다.

- String Types
- Numeric Types
- Date and Time Data Types
- Boolean Data Type
- Binary Data Type(BLOB)
- Enumerated Data Type
- JSON Type

## String Types

- CHAR: fixed-length
- VARCHAR: max: 65,353 characters (~64KB)
- MEDIUMTEXT: max: 16MB
- LONGTEXT: max: 4GB
- TINYTEXT: max 255 bytes
- TEXT: max: 64KB

CHAR (Fixed-Length): 고정 길이 문자열을 저장하는 데이터 유형입니다. 최대 길이를 지정하며, 항상 지정된 크기만큼의 고정 공간을 사용합니다.

<hr />

VARCHAR: 가변 길이 문자열을 저장하는 데이터 유형입니다. 최대 길이를 지정하며, 실제 저장되는 데이터의 길이에 따라 공간을 동적으로 할당합니다.

VARCHAR는 MySQL에서 제공하는 문자열 데이터 유형 중 하나입니다. VARCHAR는 가변 길이의 문자열 데이터를 저장하는 데 사용됩니다.

VARCHAR는 특정 길이의 문자열을 저장하지 않고, 필요에 따라 실제 데이터의 길이에 맞게 공간을 동적으로 할당합니다. 이는 VARCHAR의 주요 특징 중 하나로, 데이터의 공간 효율성을 높이는 데 도움이 됩니다.

VARCHAR를 사용할 때는 최대 길이를 지정해야 합니다. 최대 길이는 1에서 65,535 (~ 64KB) 사이의 값을 가질 수 있으며, 필요에 따라서 적절한 크기를 선택해야 합니다. 예를 들어, VARCHAR(100)은 최대 100자의 문자열을 저장할 수 있습니다.

VARCHAR는 주로 짧은 텍스트 데이터를 저장하는 데 사용됩니다. 예를 들어, 사용자의 이름, 이메일 주소, 제목 등을 저장할 수 있습니다. VARCHAR는 UTF-8 문자 인코딩을 지원하여 다양한 언어의 문자를 저장할 수 있습니다.

VARCHAR 데이터 유형은 다양한 문자열 연산을 지원합니다. 문자열 길이 계산, 문자열 결합, 부분 문자열 추출 등의 작업을 수행할 수 있습니다. 또한, VARCHAR 열에는 인덱스를 생성하여 데이터 검색 성능을 향상시킬 수 있습니다.

하지만 주의할 점은 VARCHAR는 가변 길이를 가지므로, 저장되는 데이터의 길이가 다양하게 변할 수 있습니다. 따라서, 최대 길이를 충분히 고려하여 적절한 크기를 선택해야 합니다. 너무 작은 크기로 설정하면 데이터의 일부가 잘려나가거나 데이터 저장 공간이 낭비될 수 있습니다.

<hr />

MEDIUMTEXT는 MySQL에서 제공하는 문자열 데이터 유형 중 하나입니다. MEDIUMTEXT는 가변 길이의 텍스트 데이터를 저장하는 데 사용됩니다. 이 데이터 유형은 LONGTEXT보다 작은 용량을 가지며, 최대 16MB까지의 텍스트 데이터를 저장할 수 있습니다.

MEDIUMTEXT는 주로 긴 문장, 문단, 문서 또는 대용량의 텍스트 데이터를 저장하는 데 유용합니다. 예를 들어, 웹 페이지의 본문 내용, 블로그 게시물, 이메일의 내용 등을 저장할 수 있습니다.

MEDIUMTEXT는 UTF-8 문자 인코딩을 사용하여 유니코드 문자를 지원합니다. 이를 통해 다국어 문자열 데이터를 저장할 수 있습니다.

MEDIUMTEXT는 VARCHAR와는 달리 최대 길이를 지정하지 않고, 실제 저장되는 데이터의 길이에 따라 공간을 동적으로 할당합니다. 따라서, 저장되는 텍스트의 길이에 따라 필요한 만큼의 공간을 차지하게 됩니다.

MEDIUMTEXT 데이터 유형은 다양한 문자열 연산 및 함수를 지원하여 데이터를 처리하고 검색할 수 있습니다. 예를 들어, 문자열 길이 계산, 문자열 결합, 부분 문자열 추출 등을 수행할 수 있습니다.

주의할 점은 MEDIUMTEXT 데이터 유형은 대량의 텍스트 데이터를 저장하기에 적합하지만, 데이터베이스 성능에 영향을 줄 수 있습니다. 따라서, 실제 필요한 경우에 한정하여 사용하는 것이 좋습니다.

<hr />

LONGTEXT는 MySQL에서 제공하는 문자열 데이터 유형 중 하나입니다. LONGTEXT는 가변 길이의 매우 큰 텍스트 데이터를 저장하는 데 사용됩니다.

LONGTEXT는 MEDIUMTEXT보다 큰 용량을 가지며, 최대 4GB까지의 텍스트 데이터를 저장할 수 있습니다. 따라서, 대용량의 텍스트 데이터를 저장해야 할 때 주로 사용됩니다.

LONGTEXT는 주로 긴 문장, 문단, 문서 또는 대용량의 텍스트 데이터를 저장하는 데 유용합니다. 예를 들어, 웹 페이지의 긴 설명, 뉴스 기사, 소설 등을 저장할 수 있습니다.

LONGTEXT는 UTF-8 문자 인코딩을 사용하여 유니코드 문자를 지원합니다. 따라서, 다국어 문자열 데이터를 저장할 수 있습니다.

LONGTEXT는 VARCHAR와는 달리 최대 길이를 지정하지 않고, 실제 저장되는 데이터의 길이에 따라 공간을 동적으로 할당합니다. 이는 메모리를 효율적으로 사용하며, 실제로 저장된 데이터만큼의 공간을 차지합니다.

LONGTEXT 데이터 유형은 다양한 문자열 연산 및 함수를 지원하여 데이터를 처리하고 검색할 수 있습니다. 예를 들어, 문자열 길이 계산, 문자열 결합, 부분 문자열 추출 등을 수행할 수 있습니다.

주의할 점은 LONGTEXT 데이터 유형은 대량의 텍스트 데이터를 저장하기에 적합하지만, 데이터베이스 성능에 영향을 줄 수 있습니다. 따라서, 실제 필요한 경우에 한정하여 사용하는 것이 좋습니다.

<hr />

데이터 타입이 담을 수 있는 그 이상의 데이터를 담은 경우 초과된 부분은 삭제됩니다(Truncate).

매번 기준점을 찾기 번거롭기 때문에, 필자는 다음과 같은 기준으로 크기를 설정합니다.

대부분의 경우 `VARCHAR`를 사용합니다. 그 이유는 쿼리 속도를 높일 때 사용하는 `index` 적용이 용이하기 때문입니다.

```sql
VARCHAR(50) for short strings
VARCHAR(255) for medium-length strings
```

- ENGLISH: 1 bytes
- European + Middle-Eastern: 2 bytes
- ASIAN: 3 bytes (30글자 = 30 bytes)

## Integer Types

- TINYINT: 1 byte [-128, 127]
- UNSIGNED TINYINT: 1 byte [0, 255]
- SMALLINT: 2 bytes: [-32k, 23k]
- MEDIUMINT: 3 bytes: [-8M, 8M]
- INT: 4 bytes: [-2B, 2B]
- BIGINT: 8 bytes: [-9Z, 9Z]

INT: 정수 값을 저장하는 데이터 유형입니다. 4바이트의 범위(-2,147,483,648에서 2,147,483,647)를 가지며, UNSIGNED 옵션을 사용하여 양수 범위를 두 배로 확장할 수 있습니다.

"Use the smallest data type that suits your needs"

나이를 저장한다 생각했을 때, `UNSIGNED TINYINT`를 사용하면 메모리를 저장할 수 있고, 쿼리 속도도 높일 수 있습니다.

## Fixed-point and Floating point Types

- DECIMAL(p, s)
- DEC (DECIMAL 동의어)
- NUMERIC (DECIMAL 동의어)
- FIXED (DECIMAL 동의어)
- FLOAT (4 bytes)
- DOUBLE (8 bytes)

MySQL에서 DECIMAL(p, s)은 고정 소수점 숫자를 저장하는 데 사용되는 데이터 유형입니다. p와 s는 매개변수로, 각각 전체 자릿수와 소수점 이하 자릿수를 나타냅니다.

- p (Precision): 전체 자릿수를 나타냅니다. 즉, 숫자의 총 자릿수입니다. 이 값은 1에서 65까지의 정수를 가질 수 있습니다.
- s (Scale): 소수점 이하 자릿수를 나타냅니다. 이 값은 0에서 p까지의 정수를 가질 수 있습니다.

DECIMAL(p, s)의 크기는 항상 고정되며, 정확히 p자리를 차지합니다. 소수점 이하 자릿수가 s보다 작은 숫자의 경우, 남은 자리는 0으로 채워집니다.

DECIMAL(p, s)는 정밀한 숫자 연산을 위해 사용되며, 금융 관련 데이터나 정확한 숫자 계산이 필요한 경우에 유용합니다. 예를 들어, 금액, 가격, 세금 비율 등을 저장할 수 있습니다.

예를 들어, DECIMAL(8, 2)는 총 8자리 숫자를 저장하며, 소수점 이하 2자리를 가집니다. 이는 최대 999999.99까지의 숫자를 표현할 수 있습니다. DECIMAL(9, 2) => 1234567.89.

DECIMAL 데이터 유형은 숫자의 정확도를 유지하기 위해 부동 소수점 숫자 유형보다 더 적합합니다. 실수나 근사치로 처리되지 않고, 정확한 숫자 연산이 가능합니다.

FLOAT + DOUBLE은 과학 연산 등 소수점이 큰 정밀한 숫자를 다룰 때 사용할 수 있습니다.

## Boolean Types

- BOOLEAN
- BOOL (BOOLEAN 동의어)

```sql
UPDATE posts
SET is_published = TRUE -- or FALSE

-- OR
SET is_publisehd = 1 -- or 0
```

## Enum and Set Types

- ENUM("SMALL", "MEDIUM", "LARGE")

MySQL에서 ENUM과 SET은 문자열 데이터의 선택적인 값 목록을 정의하는 데 사용되는 데이터 유형입니다.

1. ENUM:

ENUM은 열(column)에 저장할 수 있는 값의 목록을 정의합니다. ENUM은 해당 열에 허용되는 값 중 하나만 저장할 수 있습니다. 예를 들어, 'Male', 'Female'과 같은 성별 값을 저장할 때 ENUM을 사용할 수 있습니다. ENUM의 장점은 데이터의 무결성을 강화하고, 정해진 목록 이외의 값이 들어가는 것을 방지할 수 있다는 점입니다. 하지만 ENUM은 변경이 어렵고, 열에 추가된 값을 관리하기가 번거롭고, 메모리 측면에서 비싼 작업이기 때문에 사용에 주의해야 합니다. 또한 변수처럼 재사용하는 것이 아닌 매번 재정의해야하기 때문에 "ENUM" 정의에 변동이 생기는 경우 변경에 큰 번거로움이 있습니다.

`sql_invoicing.payment_methods` 테이블과 같이 `Look Up` 테이블을 별도로 생성해 "ENUM" 대체제로 사용할 수 있습니다.

2. SET:

SET은 여러 값을 선택적으로 저장할 수 있는 데이터 유형입니다. SET은 열에 여러 값 중 하나 또는 복수의 값들을 저장할 수 있습니다. 예를 들어, 사용자의 취미를 저장할 때 'Reading', 'Sports', 'Cooking' 등 여러 값을 선택하고 저장할 수 있습니다. SET은 ENUM과 달리 정해진 값 목록 이외의 값을 저장할 수 없습니다. SET의 장점은 여러 값을 하나의 열에 저장하고 검색할 수 있으며, 데이터의 일관성을 유지할 수 있다는 점입니다. SET도 ENUM과 마찬가지로 열에 저장된 값의 변경이 어렵고, 추가된 값의 관리에 주의해야 합니다.

ENUM과 SET은 데이터의 선택적인 값 목록을 정의하는 데 유용하지만, 잘못 사용하면 데이터베이스의 유연성과 확장성에 영향을 줄 수 있습니다. 사용하기 전에 데이터의 특성과 요구 사항을 고려하여 적절하게 사용해야 합니다.

1. ENUM 예시:

```sql
ALTER TABLE `sql_store`.`products`
ADD COLUMN `size` ENUM("small", "medium", "large") NOT NULL AFTER `unit_price`;
```

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  gender ENUM('Male', 'Female')
);

INSERT INTO users (id, gender) VALUES (1, 'Male');
INSERT INTO users (id, gender) VALUES (2, 'Female');
INSERT INTO users (id, gender) VALUES (3, 'Other'); -- 유효하지 않은 값, 오류 발생

SELECT * FROM users;
```

위의 예시에서 users 테이블은 gender 열을 ENUM으로 정의하고 있습니다. 이 열은 'Male' 또는 'Female' 값 중 하나만 저장할 수 있습니다. 'Other'와 같이 유효하지 않은 값이 들어가면 오류가 발생합니다.

2. SET 예시:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  hobbies SET('Reading', 'Sports', 'Cooking')
);

INSERT INTO users (id, hobbies) VALUES (1, 'Reading,Sports');
INSERT INTO users (id, hobbies) VALUES (2, 'Sports,Cooking');
INSERT INTO users (id, hobbies) VALUES (3, 'Traveling'); -- 유효하지 않은 값, 오류 발생

SELECT * FROM users;
```

위의 예시에서 users 테이블은 hobbies 열을 SET으로 정의하고 있습니다. 이 열은 'Reading', 'Sports', 'Cooking' 값들 중 하나 또는 복수의 값들을 선택하여 저장할 수 있습니다. 'Traveling'과 같이 유효하지 않은 값이 들어가면 오류가 발생합니다.

이러한 예시를 통해 ENUM과 SET 데이터 유형을 활용하여 열에 선택적인 값 목록을 정의하고 저장할 수 있다는 것을 보여드렸습니다.

## Date and Time Types

MySQL에서는 날짜와 시간을 저장하고 처리하기 위해 다양한 데이터 유형을 제공합니다. 주요한 데이터 유형은 다음과 같습니다.

1. DATE: 날짜를 저장하는 데 사용되는 유형입니다. 'YYYY-MM-DD' 형식으로 표현됩니다. 예를 들어, '2023-05-27'은 DATE 유형으로 저장될 수 있습니다.

2. TIME: 시간을 저장하는 데 사용되는 유형입니다. 'HH:MM:SS' 형식으로 표현됩니다. 예를 들어, '14:30:00'은 TIME 유형으로 저장될 수 있습니다.

3. DATETIME: 날짜와 시간을 모두 저장하는 데 사용되는 유형입니다. 'YYYY-MM-DD HH:MM:SS' 형식으로 표현됩니다. 예를 들어, '2023-05-27 14:30:00'은 DATETIME 유형으로 저장될 수 있습니다. (8 bytes)

4. TIMESTAMP: 날짜와 시간을 저장하는 데 사용되는 유형입니다. 'YYYY-MM-DD HH:MM:SS' 형식으로 표현됩니다. TIMESTAMP는 시간대 변환을 지원하며, 특정 이벤트가 발생한 시간을 저장하는 데에 자주 사용됩니다. (4 bytes, UP TO 2038)

5. YEAR: 연도를 저장하는 데 사용되는 유형입니다. 'YYYY' 형식으로 표현됩니다. 예를 들어, '2023'은 YEAR 유형으로 저장될 수 있습니다.

MySQL에서는 이러한 날짜 및 시간 유형을 사용하여 데이터를 저장하고 조회하며, 날짜와 시간에 대한 다양한 연산을 수행할 수 있습니다. 또한, 날짜 및 시간 함수를 사용하여 데이터를 조작하고 형식을 변경할 수도 있습니다.

## Blob Types

MySQL에서 BLOB (Binary Large Object) 타입은 이진 데이터를 저장하는 데 사용되는 데이터 유형입니다. BLOB 유형은 대용량의 이진 데이터, 예를 들면 이미지, 음악 파일, 동영상 파일 등을 저장하는 데 적합합니다.

BLOB에는 네 가지 서브유형이 있습니다.

- TINYBLOB: 최대 255바이트의 이진 데이터를 저장할 수 있는 가장 작은 BLOB 유형입니다.
- BLOB: 최대 65,535바이트의 이진 데이터를 저장할 수 있습니다.
- MEDIUMBLOB: 최대 16,777,215바이트의 이진 데이터를 저장할 수 있습니다.
- LONGBLOB: 최대 4,294,967,295바이트의 이진 데이터를 저장할 수 있습니다.

BLOB 유형은 이진 데이터의 저장 공간을 예약하고 데이터를 그대로 저장합니다. 따라서, 텍스트나 이미지 등의 이진 형태의 데이터를 무결성 손실 없이 저장할 수 있습니다. 데이터 유형의 크기에 따라 적절한 BLOB 유형을 선택해야 합니다. 작은 크기의 BLOB 데이터에는 TINYBLOB, 중간 크기의 데이터에는 BLOB 또는 MEDIUMBLOB, 대용량 데이터에는 LONGBLOB를 사용할 수 있습니다.

BLOB 데이터는 일반적으로 파일로부터 읽거나 파일로 쓰는 등의 작업을 수행합니다. 이진 데이터의 읽기 및 쓰기에 대한 지원은 MySQL 클라이언트 라이브러리 또는 프로그래밍 언어의 MySQL API를 통해 이루어집니다.

BLOB 데이터는 주로 파일이나 이미지를 데이터베이스에 저장하고 필요에 따라 검색하고 처리하는 데 사용됩니다. 데이터베이스에 저장된 BLOB 데이터는 다른 테이블과의 관계를 설정하여 데이터를 조작하고 관리할 수 있습니다.

## JSON Type

JSON Type: Lightweight format for storing and transferring data over the internet.

MySQL 5.7 이상부터는 JSON 데이터를 저장하고 처리하기 위한 JSON 데이터 유형을 제공합니다. JSON 데이터 유형을 사용하면 MySQL에서는 JSON 데이터를 효과적으로 저장, 검색 및 쿼리할 수 있습니다.

JSON 데이터 유형의 주요 특징은 다음과 같습니다:

1. 저장 형식: JSON 데이터는 문자열로 저장됩니다. MySQL은 JSON 데이터를 내부적으로 효율적으로 압축하여 저장합니다.

2. 유효성 검사: MySQL은 JSON 데이터가 유효한 JSON 형식인지 검사합니다. 유효하지 않은 JSON 데이터는 저장할 수 없습니다.

3. 인덱싱 및 검색: JSON 데이터 내부의 특정 속성에 대해 인덱스를 생성하고 검색할 수 있습니다. 이를 통해 효율적인 JSON 데이터 검색이 가능합니다.

4. JSON 함수와 연산: MySQL은 JSON 데이터에 대한 다양한 함수와 연산자를 제공합니다. 이를 사용하여 JSON 데이터를 쿼리하고 조작할 수 있습니다. 예를 들어, JSON_EXTRACT() 함수를 사용하여 JSON 데이터에서 특정 속성 값을 추출할 수 있습니다.

5. 업데이트 및 수정: JSON 데이터의 특정 속성 값을 업데이트하거나 수정할 수 있습니다. JSON_SET(), JSON_INSERT(), JSON_REPLACE()와 같은 함수를 사용하여 JSON 데이터를 업데이트할 수 있습니다.

6. 외부 애플리케이션과의 상호 작용: JSON 데이터는 MySQL 서버와 외부 애플리케이션 간에 주고받을 수 있는 표준 데이터 형식입니다. 따라서 MySQL의 JSON 데이터 유형을 사용하여 다른 애플리케이션과의 상호 작용이 용이합니다.

JSON 데이터 유형은 JSON 데이터를 저장하고 검색하는 데 유용한 기능을 제공합니다. 이를 활용하여 MySQL에서 유연하고 효과적으로 JSON 데이터를 다룰 수 있습니다.

```sql
--JSON
{
    "Key" : value
}
-- Value can be anything
```

```sql
ALTER TABLE `sql_store`.`products`
ADD COLUMN `properties` JSON NULL AFTER `size`;
```

```sql
UPDATE products
SET properties = '
{
    "dimensions": [1, 2, 3],
    "weight": 10,
    "manufacturer": {
        "name": "sony"
    }
}
'
WHERE product_id = 1;


-- properties column 확인
SELECT *
FROM products;
```

```sql
-- JSON Object 만드는 또 다른 방법
UPDATE products
SET properties = JSON_OBJECT(
    "weight",
    10,
    "dimensions",
    JSON_ARRAY(1, 2, 3),
    "manufacturer", JSON_OBJECT("name", "sony")
    )
WHERE product_id = 1;

--
SELECT product_id, JSON_EXTRACT(properties, '$.weight') AS weight
FROM products
WHERE product_id = 1;

-- 위와 동일한 방법입니다.
SELECT product_id, properties -> '$.weight'
FROM products
WHERE product_id = 1;

--
SELECT product_id, properties -> '$.dimensions[0]'
FROM products
WHERE product_id = 1;

--
SELECT product_id, properties -> '$.manufacturer.name'
FROM products
WHERE product_id = 1;

-- 값으로 출력되는 Sony의 quote를 없애고 싶은 경우
SELECT product_id, properties ->> '$.manufacturer.name'
FROM products
WHERE product_id = 1;

--
SELECT product_id, properties ->> '$.manufacturer.name'
FROM products
WHERE product_id ->> '$.manufacturer.name' = 'sony'

-- weight를 변경하고 싶은 경우 전체를 수정하는 것 대신에 weight만 수정하는 방법
UPDATE products
SET properties = JSON_SET(
    properties,
    '$.weight', 20,
    '$.age', 10
)
WHERE product_id = 1;

SELECT product_id, properties
FROM products
WHERE product_id ->> '$.manufacturer.name' = 'sony'

-- 특정 프로퍼티를 삭제하고 싶은 경우
-- Take JSON Object and Modify it.
UPDATE products
SET properties = JSON_REMOVE(
    properties,
    '$.age'
)
WHERE product_id = 1;
```
