# Transactions and Concurrency

Transactions: A group of SQL statements that represent a single unit of work
All there statements should be completed successfully or the transaction will fail

<img src="https://cdn-images-1.medium.com/max/800/1*KT87a_9Mtea8oixkVKrGWw.png" alt="Image Not Found" />

만 원을 송금하는 상황을 생각해보겠습니다.

1. 내 계좌에서 만 원을 출금한다.
2. 출금한 만 원을 친구 계좌에 입금한다.

만 원을 송금하는 상황에는 위와 같이 두 단계가 필요합니다. 두 과정 중 한 과정에라도 문제가 생기면 전체 과정을 초기화 해야합니다 (Revert or Roll Back). 이렇게 한 단위의 일련의 로직을 `트랜잭션(Transaction)`이라고 합니다.

둘 이상의 일련의 동작을 수행할 때는 두 가지 경우의 수만 고려했을 때 데이터베이스를 안전하게 관리할 수 있습니다.

1. 모두다 성공
2. 모두다 실패

다음과 같이 주문에 해당하는 데이터 삽입은 성공했지만, 주문 상품에 대한 데이터를 삽입하는 과정에 오류가 발생한다면 어떻게 이 문제를 처리해야할까요?

```sql
INSERT INTO orders
INSERT INTO order_items -- Fail
```

이와 같은 상황에 `트랜잭션(Transaction)` 개념을 적용할 수 있습니다.

`트랜잭션(Transaction)`을 이해하기 위해서는 `ACID`에 대해 잘 이해하고 있어야합니다.

ACID는 데이터베이스 트랜잭션의 속성을 나타내는 약어입니다. 이러한 속성은 트랜잭션이 안전하게 수행되고 데이터의 일관성을 보장하는 데 중요합니다. ACID는 다음과 같이 정의됩니다:

1. 원자성 (Atomicity):

- 트랜잭션은 원자적이어야 합니다. 이는 트랜잭션의 작업이 전부 수행되거나 전혀 수행되지 않음을 의미합니다. 즉, 트랜잭션은 완전히 성공하거나 실패하며, 중간 단계에서 중단되어서는 안 됩니다.

- 예를 들어, 은행 이체 트랜잭션을 생각해보겠습니다. 트랜잭션에서 금액을 송금하는 계좌에서 출금 작업과 수취하는 계좌로의 입금 작업이 필요합니다. 원자성을 준수하는 경우, 이체 트랜잭션은 출금과 입금 작업이 모두 성공해야만 완료됩니다. 하나의 작업이 실패하면 트랜잭션 전체는 롤백되어 이체가 취소되고 원래의 상태로 복원됩니다.

2. 일관성 (Consistency):

- 트랜잭션이 수행되면 데이터베이스는 일관된 상태를 유지해야 합니다. 트랜잭션이 실행되기 전과 실행된 후에도 데이터베이스의 일관성은 변하지 않아야 합니다. 즉, 데이터베이스는 정의된 규칙과 제약 조건을 준수해야 합니다.

- 예를 들어, 학생 성적을 업데이트하는 트랜잭션을 생각해보겠습니다. 성적 업데이트 트랜잭션은 학생의 시험 점수를 변경하고, 변경된 점수가 학교의 정책과 규칙에 부합하는지 확인해야 합니다. 일관성을 유지하기 위해 트랜잭션은 점수를 변경하기 전에 유효성을 검사하고, 변경 후에도 정책을 준수하는지 확인합니다.

3. 격리성 (Isolation):

- 동시에 여러 트랜잭션이 실행될 때, 각 트랜잭션은 다른 트랜잭션에 영향을 주지 않고 독립적으로 실행되는 것처럼 보여야 합니다. 격리성은 트랜잭션들 간의 상호작용을 제어하여 각각의 트랜잭션이 자신만의 개별적인 실행 환경을 가지도록 합니다.

- 예를 들어, 동시에 여러 사용자가 동일한 계좌에서 출금하는 트랜잭션을 생각해보겠습니다. 격리성을 보장하는 경우, 각 트랜잭션은 서로에게 영향을 주지 않고 독립적으로 수행됩니다. 한 사용자의 출금 트랜잭션이 진행되는 동안 다른 사용자는 해당 계좌에 대한 변경 내용을 볼 수 없으며, 출금 트랜잭션이 완료되기 전까지 다른 사용자는 해당 계좌에 대한 작업을 수행할 수 없습니다.

4. 지속성 (Durability):

- 트랜잭션이 성공적으로 완료되면, 그 결과는 영구적으로 저장되어야 합니다. 이는 시스템 장애나 중단이 발생하더라도 트랜잭션의 결과가 보존되고 데이터의 지속성이 보장되어야 함을 의미합니다.

- 예를 들어, 주문 처리 트랜잭션을 생각해보겠습니다. 주문이 성공적으로 처리되면, 해당 주문은 데이터베이스에 영구적으로 저장되어야 합니다. 이는 시스템 장애 또는 중단이 발생하더라도 주문 정보가 보존되고 복구될 수 있음을 의미합니다.

ACID 속성은 데이터베이스 시스템에서 트랜잭션의 안전성과 신뢰성을 보장하기 위해 사용됩니다. 이를 통해 데이터의 무결성과 일관성을 유지하며, 동시에 다중 사용자 환경에서 데이터의 격리와 지속성을 보장할 수 있습니다. ACID는 데이터베이스 시스템의 핵심 개념 중 하나이며, 트랜잭션 관리와 복구 메커니즘을 구현하는 데 중요한 역할을 합니다.

## Creating Transactions

MySQL에서 트랜잭션은 데이터베이스 작업의 논리적 단위를 구성하는 방법입니다. 트랜잭션은 데이터베이스에서 원자적(atomic), 일관성있는(consistent), 고립된(isolated), 지속적인(durable) 작업을 보장하기 위해 사용됩니다. 이러한 특성을 약어인 ACID라고도 부릅니다.

트랜잭션은 일련의 데이터베이스 작업을 그룹화하고, 모든 작업이 성공적으로 완료되거나 실패할 경우 롤백(undo)할 수 있도록 합니다. 이는 데이터의 무결성과 일관성을 보장하고, 동시에 여러 사용자가 동시에 데이터베이스를 업데이트하는 경우에도 충돌을 방지합니다.

MySQL에서 트랜잭션을 생성하려면 다음 단계를 따를 수 있습니다:

1. 다음 링크의 쿼리를 실행해서 데이터베이스를 생성해주세요

2. 트랜잭션 시작: START TRANSACTION 명령문을 사용하여 트랜잭션을 시작합니다. 예를 들면 다음과 같습니다:

```sql
START TRANSACTION;
```

3. SQL 작업 수행: 트랜잭션 내에서 수행할 데이터베이스 작업을 정의합니다. SELECT, INSERT, UPDATE, DELETE 등의 SQL 문을 사용하여 작업을 수행할 수 있습니다.
4. 커밋 또는 롤백: 작업이 성공적으로 완료되면 COMMIT 명령문을 사용하여 변경 사항을 영구적으로 저장합니다. 예를 들면 다음과 같습니다:

```sql
COMMIT;
```

작업이 실패한 경우에는 ROLLBACK 명령문을 사용하여 트랜잭션의 모든 변경 사항을 취소하고 이전 상태로 되돌립니다. 예를 들면 다음과 같습니다:

```sql
ROLLBACK;
```

트랜잭션을 사용하면 여러 작업을 논리적 단위로 그룹화하여 데이터베이스 일관성을 유지하고 데이터의 무결성을 보장할 수 있습니다. 트랜잭션을 올바르게 사용하면 데이터베이스에서 안정성과 신뢰성을 확보할 수 있습니다.

실제 예시

```sql
USE sql_store;

START TRANSACTION;

INSERT INTO orders (customer_id, order_date, status)
VALUES (1, '2019-01-01', 1);

INSERT INTO order_items
VALUES (LAST_INSERT_ID(), 1, 1, 1);

COMMIT;
```

위 쿼리 중 한 부분이라도 실패하면, 이전에 했던 변화 전체를 이전 상태로 되돌립니다. 이러한 동작은 `Rollback`이라 칭합니다.

- 중간에 연결을 끊는 방법 기록

경우에따라 수동으로 `Rollback`을 호출하는 경우가 있습니다. 주로 다음과 같은 상황에서 발생합니다.

1. 오류 처리: 트랜잭션 내에서 예외가 발생하거나 오류가 감지되었을 때, 개발자는 ROLLBACK을 호출하여 트랜잭션을 롤백시킬 수 있습니다. 이는 데이터의 무결성을 유지하고 예외 상황을 처리하는 데 도움이 됩니다.

2. 조건에 따른 롤백: 특정 조건이 충족되지 않을 때 트랜잭션을 롤백해야 할 때, 개발자는 해당 조건을 확인하고 ROLLBACK을 호출합니다. 예를 들어, 특정 데이터가 존재하지 않을 경우 트랜잭션을 롤백시킬 수 있습니다.

3. 사용자 요청에 의한 롤백: 사용자 인터페이스 또는 응용 프로그램에서 트랜잭션 롤백을 요청하는 경우, 개발자는 해당 요청을 처리하기 위해 ROLLBACK을 호출할 수 있습니다. 사용자가 작업을 취소하거나 특정 조작을 원치 않는 경우에 유용합니다.

```sql
USE sql_store;

START TRANSACTION;

INSERT INTO orders (customer_id, order_date, status)
VALUES (1, '2019-01-01', 1);

INSERT INTO order_items
VALUES (LAST_INSERT_ID(), 1, 1, 1);

ROLLBACK;
```

## Concurrency and Locking

MySQL Concurrency는 여러 클라이언트 또는 스레드가 동시에 데이터베이스에 접근하고 수정할 때 발생하는 문제를 다루는 개념입니다. 동시성은 데이터베이스 시스템의 성능, 안정성 및 일관성에 영향을 미치는 중요한 요소입니다.

MySQL에서의 동시성 문제는 주로 다음과 같은 상황에서 발생할 수 있습니다:

1. 경쟁 조건 (Race Condition): 두 개 이상의 클라이언트나 스레드가 동시에 동일한 데이터를 변경하려고 할 때 발생할 수 있는 문제입니다. 예를 들어, 두 개의 클라이언트가 동시에 동일한 계좌에서 돈을 인출하려고 할 때 잔액이 일관성 없이 갱신될 수 있습니다.

- 예시: 두 개의 스레드가 동시에 공유 변수를 수정하려고 할 때 발생할 수 있습니다.
- 상황: 스레드 A와 스레드 B가 동시에 공유 변수 X를 읽고 수정하려고 합니다.
- 결과: 스레드 A와 스레드 B가 동시에 X를 읽은 후, 각자의 계산을 수행하여 X에 대한 변경을 저장하면, 예상치 못한 결과가 발생할 수 있습니다. 이는 경쟁 조건으로 알려져 있습니다.

2. 더티 읽기 (Dirty Read): 하나의 트랜잭션이 아직 커밋되지 않은 다른 트랜잭션의 변경 사항을 읽는 경우입니다. 이로 인해 커밋되지 않은 변경 사항에 의존하는 데이터를 잘못된 결과로 읽을 수 있습니다.

- 예시: 하나의 트랜잭션이 다른 트랜잭션에서 아직 커밋되지 않은 데이터를 읽을 때 발생할 수 있습니다.
- 상황: 트랜잭션 A가 데이터를 수정한 후, 아직 커밋하지 않은 상태에서 데이터를 읽으려는 트랜잭션 B가 있습니다.
- 결과: 트랜잭션 B가 아직 완료되지 않은 변경 사항을 읽을 수 있으며, 이 변경 사항이 롤백될 경우 잘못된 데이터를 읽게 될 수 있습니다.

3. 반복 가능한 읽기 (Non-repeatable Read): 한 트랜잭션이 동일한 쿼리를 두 번 이상 실행할 때, 다른 트랜잭션에 의해 변경된 데이터를 반복해서 읽는 경우입니다. 이로 인해 동일한 쿼리를 실행할 때마다 다른 결과를 얻을 수 있습니다.

- 예시: 하나의 트랜잭션이 다른 트랜잭션에 의해 수정된 데이터를 여러 번 읽을 때 발생할 수 있습니다.
- 상황: 트랜잭션 A가 데이터를 읽은 후, 트랜잭션 B가 데이터를 수정하고 커밋합니다. 그리고 다시 트랜잭션 A가 동일한 데이터를 읽습니다.
- 결과: 트랜잭션 A가 처음과 다른 결과를 얻게 되며, 데이터의 일관성이 깨집니다.

4. 팬텀 읽기 (Phantom Read): 한 트랜잭션이 동일한 쿼리를 실행할 때, 다른 트랜잭션에 의해 삽입, 삭제 또는 변경된 데이터를 읽는 경우입니다. 이로 인해 이전에 존재하지 않던 데이터가 읽힐 수 있습니다.

- 예시: 하나의 트랜잭션이 동일한 쿼리를 실행했을 때 다른 결과를 얻을 때 발생할 수 있습니다.
- 상황: 트랜잭션 A가 조건에 따라 데이터를 읽은 후, 트랜잭션 B가 해당 조건에 맞는 데이터를 추가 또는 삭제합니다. 그리고 다시 트랜잭션 A가 동일한 쿼리를 실행합니다.
- 결과: 트랜잭션 A가 처음과 다른 결과를 얻게 되며, 데이터의 무결성이 깨집니다. 즉, 팬텀 레코드(추가된 또는 삭제된 레코드)를 읽게 됩니다.

이러한 동시성 관련 읽기 현상은 데이터베이스 시스템이나 다중 스레드 환경에서 발생할 수 있습니다. 이를 방지하기 위해 트랜잭션 격리 수준을 설정하거나 병행 제어 메커니즘을 사용하여 데이터 일관성과 동시성을 관리해야 합니다.

MySQL은 동시성 문제를 해결하기 위해 여러 기술과 기능을 제공합니다. 이러한 기능에는 트랜잭션 격리 수준 설정, 잠금(locking), 교착상태 탐지 및 해결 등이 포함됩니다. 효과적인 동시성 관리를 위해서는 적절한 격리 수준과 잠금 전략을 선택하고, 트랜잭션 범위를 최소화하는 등의 방법을 사용해야 합니다.

두 명의 고객이 동시에 한 데이터의 `point`를 업데이트 하는 상황을 생각해보겠습니다.

1. 두 개의 `MySQL Connection` 탭을 오픈합니다.
2. 쿼리 실행 전 해당 고객의 `point` 값을 확인합니다.
3. 한 줄 씩 양쪽 탭에서 쿼리를 실행하다보면, `UPDATE` 키워드에서 로딩 스피너가 출력되는 것을 확인할 수 있습니다. 그 이유는 한 데이터에 대해 `UPDATE`가 진행되고 있기때문에 내부적으로 `Locking`을 설정해줍니다.
4. 이후에 최종적으로 하나씩 `COMMIT` 부분 쿼리를 실행하면, 최종적으로 20점이 추가된 것을 확인할 수 있습니다.

기본적으로 `MySQL`에서 `Concurrency and Locking`을 지원해주기 때문에 평소 사용에는 큰 문제가 없지만, 처리해야 할 몇 가지 예외 상황이 존재합니다. 이 예외 상황을 처리하는 방법에 대해 알아보겠습니다.

## Concurrency Problems

Concurrency에서 Lost Updates는 동시에 여러 사용자 또는 프로세스가 동일한 데이터를 수정하려고 할 때 발생하는 문제입니다. 이 문제는 데이터베이스나 다중 스레드 환경에서 특히 주의해야 하는 상황에서 발생할 수 있습니다.

Lost Updates는 일반적으로 다음과 같은 시나리오에서 발생합니다:

1. 데이터 읽기: 여러 사용자가 동시에 동일한 데이터를 읽습니다.
2. 데이터 수정: 각 사용자가 읽은 데이터를 기반으로 수정 작업을 수행합니다.
3. 데이터 저장: 각 사용자가 수정한 결과를 데이터베이스에 저장합니다.

이 때, 여러 사용자가 동시에 동일한 데이터를 수정하려고 하면 문제가 발생할 수 있습니다. 예를 들어, 두 사용자가 동시에 동일한 계좌의 잔액을 확인하고, 각각 100달러를 인출하려고 한다고 가정해 봅시다.

1. 사용자 A는 잔액을 읽고 100달러를 인출하려고 합니다.
2. 사용자 B도 마찬가지로 잔액을 읽고 100달러를 인출하려고 합니다.
3. 사용자 A가 수정한 결과를 데이터베이스에 저장합니다. (잔액에서 100달러를 차감)
4. 사용자 B가 수정한 결과를 데이터베이스에 저장합니다. (잔액에서 100달러를 차감).

이렇게 되면, 사용자 A의 수정 작업이 사용자 B의 수정 작업을 덮어쓰게 되어 사용자 B의 작업이 소실되었습니다. 따라서, 최종 결과는 100달러가 아니라 0달러가 됩니다. 이것이 Lost Updates 문제의 예입니다.

이러한 문제를 해결하기 위해 병행 제어 기법과 트랜잭션 격리 수준 등을 사용하여 동시성을 관리하고 데이터 일관성을 유지할 수 있습니다. 동시성 제어 메커니즘은 동시에 실행되는 작업들 간에 충돌이 발생하지 않도록 조정하고, 데이터의 정합성을 보장하기 위한 방법을 제공합니다.

## Transaction Isolation Levels

트랜잭션 격리 수준(Transaction Isolation Levels)은 데이터베이스에서 동시성 제어를 위해 사용되는 설정입니다. 이 설정은 동시에 실행되는 여러 트랜잭션 간의 일관성, 격리 수준, 및 성능 조절을 담당합니다. 주요한 네 가지 표준 격리 수준은 다음과 같습니다:

1. Read Uncommitted (레벨 0):

- 가장 낮은 격리 수준이며, 트랜잭션이 커밋되지 않은 변경 사항을 읽을 수 있습니다.
- Dirty Read, Non-repeatable Read, Phantom Read가 모두 발생할 수 있습니다.
- 데이터 일관성과 격리 수준이 최소화되며, 동시성 문제가 많이 발생할 수 있습니다.

2. Read Committed (레벨 1):

- 트랜잭션이 커밋된 변경 사항만 읽을 수 있습니다.
- Dirty Read는 방지되지만, Non-repeatable Read와 Phantom Read는 발생할 수 있습니다.
- 대부분의 데이터베이스 시스템의 기본 격리 수준이며, 일반적으로 권장되는 격리 수준입니다.

3. Repeatable Read (레벨 2):

- 트랜잭션 동안 같은 쿼리를 여러 번 실행하더라도 항상 동일한 결과를 보장합니다.
- Dirty Read와 Non-repeatable Read는 방지되지만, Phantom Read는 발생할 수 있습니다.
- 읽은 데이터에 대해 트랜잭션 동안 락을 유지하여 다른 트랜잭션이 데이터를 수정하는 것을 방지합니다.

4. Serializable (레벨 3):

- 가장 높은 격리 수준이며, 트랜잭션 간의 완전한 격리를 제공합니다.
- 트랜잭션 동안에는 다른 트랜잭션에서 데이터를 수정할 수 없습니다.
- Dirty Read, Non-repeatable Read, Phantom Read가 모두 방지됩니다.
- 동시성 제어가 가장 강력하지만, 동시성 수준이 낮아질 수 있고 성능에 영향을 줄 수 있습니다.

각 격리 수준은 일관성과 동시성 사이에서 trade-off를 제공하며, 선택은 애플리케이션의 요구사항과 데이터 무결성을 고려하여 결정되어야 합니다. 더 높은 격리 수준은 데이터의 일관성과 격리성을 높이지만, 동시성 제어에 필요한 락과 리소스 사용량이 증가하여 성능에 영향을 줄 수 있습니다.

`MySQL`에서 기본으로 설정된 `transaction level`을 확인하고 싶은 경우 다음과 같이 코드를 작성할 수 있습니다.

```sql
SHOW VARIABLES LIKE 'transaction_isolation';
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;과 SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;은 각각 세션과 전역적인 수준에서 트랜잭션 격리 수준을 설정하는 데 사용되는 SQL 문입니다.

1. `SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;`:

- 이 문은 현재 세션에 대해 트랜잭션 격리 수준을 직접 설정합니다.
- 현재 세션 내에서 실행되는 모든 트랜잭션에만 영향을 미칩니다.
- 다른 세션들은 이 설정에 영향받지 않습니다.
- 즉, 해당 세션에서만 격리 수준이 변경되고, 다른 세션은 이전의 격리 수준을 유지합니다.

2. `SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;`:

- 이 문은 데이터베이스 서버 전역 수준에서 트랜잭션 격리 수준을 설정합니다.
- 데이터베이스 서버에 접속한 모든 세션에 영향을 미칩니다.
- 이 설정은 모든 세션에서 동일한 격리 수준을 갖게 됩니다.
- 데이터베이스 서버가 재시작되면 이 설정은 유지됩니다.

따라서, SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;은 현재 세션에 대한 격리 수준을 설정하며, SET GLOBAL TRANSACTION ISOLATION LEVEL SERIALIZABLE;은 데이터베이스 서버 전체의 격리 수준을 설정합니다.

## READ UNCOMMITTED Isolation Level

```sql
-- First Session
USE sql_store;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED; -- 여기 까지 실행 1
SELECT points
FROM customers
WHERE customer_id = 1;
```

```sql
-- Second Session
USE sql_store;

START TRANSACTION;
UPDATE customers
SET points = 20
WHERE customer_id = 1; -- 여기 까지 실행 2
-- COMMIT; -- 여기 까지 실행 3
ROLLBACK;
```

## READ COMMITTED Isolation Level

```sql
-- First Session
USE sql_store; -- 실행 1
SET TRANSACTION ISOLATION LEVEL READ COMMITTED; -- 실행 2
SELECT points -- 실행 6, 실행 8
FROM customers
WHERE customer_id = 1;
```

```sql
-- Second Session
USE sql_store; -- 실행 3
START TRANSACTION; -- 실행 4
UPDATE customers -- 실행 5
SET points = 20
WHERE customer_id = 1;
COMMIT; -- 실행 7
```

`REPEATABLE READ ISOLATION LEVEL`이 필요한 상황을 구현해보겠습니다.
다음 시나리오에서는 비일관적으로 데이터를 읽어오기 때문에 더 높은 수준의 `Isolation Level`인 `REPEATABLE READ ISOLATION LEVEL`이 필요합니다.

```sql
USE sql_store; -- 실행 1
SET TRANSACTION ISOLATION LEVEL READ COMMITTED; -- 실행 2
START TRANSACTION; -- 실행 3
SELECT points FROM customers WHERE customer_id = 1; -- 실행 4 (Update 되지 않은 값 20)
SELECT points FROM customers WHERE customer_id = 1; -- 실행 9
COMMIT; -- 실행 10
```

```sql
USE sql_store; -- 실행 5
START TRANSACTION; -- 실행 6
UPDATE customers -- 실행 7
SET points = 30
WHERE customer_id = 1;
COMMIT; -- 실행 8
```

## REPEATABLE READ Isolation Level

MySQL의 기본 `ISOLATION LEVEL`입니다.

```sql
USE sql_store; -- 실행 1
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; -- 실행 2
START TRANSACTION; -- 실행 3
SELECT points FROM customers WHERE customer_id = 1; -- 실행 4 (30)
SELECT points FROM customers WHERE customer_id = 1; -- 실행 9 (30 - 여전히 30이 유지됨)
COMMIT; -- 실행 10
```

```sql
USE sql_store; -- 실행 5
START TRANSACTION; -- 실행 6
UPDATE customers -- 실행 7
SET points = 40
WHERE customer_id = 1;
COMMIT; -- 실행 8
```

하지만 `Phantom READ` 문제는 여전히 남아있습니다.
시나리오는 `VA`에 거주하는 모든 고객을 추출하는 과정에, `customer_id = 1`인 고객의 `state = "VA"`로 업데이트 하는 상황입니다.

```sql
USE sql_store;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; -- 실행 1
START TRANSACTION; -- 실행 2
SELECT * FROM customers WHERE state = 'VA'; -- 실행 5, 실행 8(이때 두명의 VA를 확인할 수 있습니다.)
-- (이 경우 오직 한 명의 고객만 확인할 수 있습니다. REPEATABLE CONSISTENCE가 유지되기 때문에 두 명이 VA에 임에도, 한 명만 출력됩니다) --
COMMIT; -- 실행 7
```

```sql
USE sql_store;

START TRANSACTION; -- 실행 3
UPDATE customers -- 실행 4
SET state = "VA"
WHERE customer_id = 1;
COMMIT; -- 실행 6
```

위와 같은 `Phantom READ` 문제를 `SERIALIZABLE Isolation Level`을 통해 해결해보겠습니다.

## SERIALIZABLE ISOLATION LEVEL

`Phantom READ`, `Lost Updates` 등 어떠한 문제도 이 단계의 `ISOLATION LEVEL`에서는 발생하지 않습니다.
`ISOLATION LEVEL`은 `PHANTOM READS`를 방지하고 싶은 경우에 사용할 수 있습니다.

```sql
USE sql_store;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE; -- 실행 1
START TRANSACTION;
SELECT * FROM customers WHERE state = 'VA'; -- 실행 3 (Loading Spinner가 출력되면서, 나머지 Transaction이 끝나기를 기다립니다)
COMMIT; -- 실행 5
```

```sql
USE sql_store;

START TRANSACTION; -- 실행 2
UPDATE customers -- 실행 3
SET state = "VA"
WHERE customer_id = 3;
COMMIT; -- 실행 4
```

## Deadlocks

Deadlocks는 데이터베이스에서 동시성 제어를 위해 사용되는 잠금 메커니즘에서 발생하는 상황으로, 두 개 이상의 트랜잭션이 서로 잠긴 리소스를 기다리면서 무한히 진행할 수 없는 상태를 말합니다. 각 트랜잭션은 다른 트랜잭션이 소유한 잠긴 리소스를 기다리는 상황에 놓이며, 이러한 상태에서는 어떠한 트랜잭션도 진행할 수 없습니다. 이러한 상태를 "교착 상태"라고도 합니다.

데이터베이스 시스템에서는 동시에 실행되는 여러 트랜잭션들이 서로의 데이터에 접근하고 수정하려고 할 때 잠금(lock)을 사용하여 데이터 일관성을 유지합니다. 그러나 잘못된 잠금 순서나 잘못된 트랜잭션 로직으로 인해 Deadlock이 발생할 수 있습니다.

Deadlock이 발생하면 데이터베이스 시스템은 교착 상태를 해결하기 위해 특정 교착 상태 탐지 및 해결 알고리즘을 사용합니다. 일반적으로 데이터베이스 시스템은 교착 상태를 탐지하고 그 중 하나의 트랜잭션을 롤백시켜 해제합니다. 롤백된 트랜잭션은 재시작되어 다시 실행될 수 있습니다. 이를 통해 교착 상태를 해소하고 동시성 제어를 유지할 수 있습니다.

Deadlocks은 잘못된 트랜잭션 설계, 잠금 수준 설정의 오류, 병행성 제어 메커니즘의 부적절한 사용 등으로 인해 발생할 수 있습니다. 따라서 효율적인 트랜잭션 디자인, 적절한 잠금 관리, 격리 수준 설정 및 교착 상태 탐지 알고리즘의 사용 등을 통해 Deadlock을 최소화하는 것이 중요합니다.

Deadlocks 상태가 이어지면, 일정 시간이 지난 후에 자동으로 `ROLLBACK`이 호출됩니다.
그리고 다음 코드와 같이 Deadlocks이 자주 발생하는 경우, 쿼리 실행 순서를 잘 파악해 Deadlocks 발생을 최소화 할 수 있습니다.

```sql
USE sql_store; -- 실행 1
START TRANSACTION; -- 실행 2
UPDATE customers SET state = "VA" WHERE customer_id = 1; -- 실행 3: 현재 해당 레코드에 lock이 걸려있는 상태 (여기까지는 문제x).
UPDATE orders SET status = 1 WHERE order_id = 1; -- 실행 8: 여기부터 문제 발생 (실행 6이 commit 되기 전까지 lock)
COMMIT;
```

```sql
USE sql_store; -- 실행 4
START TRANSACTION; -- 실행 5
UPDATE orders SET status = 1 WHERE order_id = 1; -- 실행 6: 현재 해당 레코드에 lock이 걸려있는 상태 (여기까지는 문제x).
UPDATE customers SET state = "VA" WHERE customer_id = 1; -- 실행 7: 여기부터 문제 발생 (실행 3이 commit 되기 전까지 lock)
COMMIT;
```
