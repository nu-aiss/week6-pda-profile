# Week 6 — PDA Profile на Anchor

## Описание
Этот проект был выполнен в рамках 6 недели курса по Solana.

Цель проекта — создать децентрализованный профиль пользователя с использованием PDA (Program Derived Address) и Anchor Framework.

PDA позволяет программе создавать предсказуемый адрес аккаунта на основе определённых seeds и Program ID.

В этом проекте PDA создаётся на основе:

- строки `profile`
- публичного ключа пользователя

Программа содержит две основные инструкции:

- `create_profile` — создаёт профиль пользователя
- `update_profile` — изменяет данные существующего профиля

## Использованные технологии
- Rust
- Solana CLI
- Anchor Framework
- TypeScript
- Node.js
- Solana Devnet
- PDA

## Program ID
```text
39vimUADokcHsWfHD7VXrNqX6MJdunAbnG3XX1vvr6q3
```

## Wallet
```text
6AafER3aefcKUgQacaqLWXor5CbDruAMNM8j9prbggfb
```

## Profile PDA
```text
8HVg2ikTAhz32FKLY2FcHU9vcag662Q2u9kvVc1Fd4qg
```

## PDA Bump
```text
253
```

## Создание профиля
При первом запуске клиент создал профиль со следующими данными:

```text
Name: Aisana
Bio: Solana student
```

Владелец профиля:

```text
6AafER3aefcKUgQacaqLWXor5CbDruAMNM8j9prbggfb
```

## Обновление профиля
После вызова `update_profile` данные были изменены:

```text
Updated name: Aisana Nurgali
Updated bio: Solana and Anchor student
```

## Транзакции

### Создание профиля
```text
3zxv1g7E1kBQeY2E6WSBXTuFnHrxHCqk7ZQx3DY5sPFhKZn85jQX2v98uE6hyJEPmytyJAvDQN3f7M6QDVaNsWKS
```

### Обновление профиля
```text
4xfW4sDUqHGgmuQsdKbUab8MUPx1wzrihTVej4ikxEBDyWaZMuLMyB9Q4UUD33s88WYzcAJRgYaxT3Juw8CgSTo3
```

## Сборка проекта
```bash
anchor build
```

## Развёртывание программы
```bash
anchor program deploy
```

## Запуск клиента
```bash
npx ts-node client/profile.ts
```

## Структура проекта
```text
week6-pda-profile
├── client
│   └── profile.ts
├── programs
│   └── week6-pda-profile
│       └── src
│           └── lib.rs
├── Anchor.toml
├── Cargo.toml
├── package.json
├── tsconfig.json
└── README.md
```

## Результат
Программа была успешно собрана и развёрнута в сети Solana Devnet.

TypeScript-клиент успешно вычислил PDA, создал профиль и обновил его данные.

Результат работы:

```text
Profile PDA:
8HVg2ikTAhz32FKLY2FcHU9vcag662Q2u9kvVc1Fd4qg

Profile name:
Aisana

Profile bio:
Solana student

Updated name:
Aisana Nurgali

Updated bio:
Solana and Anchor student

Stored bump:
253
```

Таким образом, в проекте успешно реализована работа с PDA-аккаунтом и хранением данных пользователя в блокчейне Solana.