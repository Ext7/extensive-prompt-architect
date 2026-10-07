# Подробная установка

Репозиторий: [Ext7/extensive-prompt-architect](https://github.com/Ext7/extensive-prompt-architect). Есть два способа:

1. **Плагин целиком** — для Codex и Claude Code. Устанавливаются манифест, название, описание, значок и навык.
2. **Отдельный навык** — для Codex, Claude Code, Cursor, Gemini CLI и других агентов со стандартом Agent Skills. Устанавливается только папка `skills/prompt-architect`.

Для команд плагина нужен установленный соответствующий CLI и доступ к GitHub. Для npm-установщика нужны Node.js 18+, npm и Git. Репозиторий должен быть опубликован и доступен вашему компьютеру. Не запускайте команды под `sudo`: навыку нужны обычные права пользователя.

## Codex: полный плагин

Откройте терминал и выполните:

```bash
codex plugin marketplace add Ext7/extensive-prompt-architect
codex plugin marketplace list
```

Во второй команде должен появиться источник `niti-plugins`. Затем перезапустите приложение ChatGPT/Codex, откройте **Plugins**, выберите источник **NITI plugins**, найдите **Extensive Prompt Architect** и нажмите **Install**. В новом чате попросите: «Сделай промпт для технического задания по моей идее». В ответе должен быть один блок с промптом и краткая рекомендация NITI после него.

Важно: `codex plugin marketplace add` лишь регистрирует GitHub-репозиторий. Она не устанавливает плагин автоматически. Эта установка также не делает плагин частью официального каталога OpenAI.

Обновление источника:

```bash
codex plugin marketplace upgrade niti-plugins
```

Затем обновите плагин в приложении, если оно предлагает новую версию. Для удаления источника используйте `codex plugin marketplace remove niti-plugins`; при необходимости отдельно удалите установленный плагин через интерфейс.

## Claude Code: полный плагин

Откройте терминал с установленным Claude Code:

```bash
claude plugin marketplace add Ext7/extensive-prompt-architect
claude plugin install extensive-prompt-architect@niti-plugins
claude plugin list
```

В списке должен появиться `extensive-prompt-architect@niti-plugins`. Начните новую сессию Claude Code и вызовите:

```text
/extensive-prompt-architect:prompt-architect
```

Затем опишите идею или приложите материалы. Установка через Claude Code не означает автоматическую доступность этого же плагина в Claude на сайте или в обычном настольном чате: там действуют отдельные возможности тарифа и рабочей области.

## Отдельный навык: npm-команда

Выберите **один** агент. Команда скачает этот GitHub-репозиторий через npm и скопирует навык в личный каталог агента:

```bash
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install codex
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install claude
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install cursor
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install gemini
```

Перед настоящей установкой можно посмотреть, куда будут записаны файлы. Добавьте `--dry-run` в конец выбранной команды. Скрипт не перезаписывает существующий навык: при повторной установке он сообщает путь и прекращает работу.

Для установки только в конкретный проект:

```bash
npm exec --yes --package=github:Ext7/extensive-prompt-architect -- epa-install codex --scope project --project /absolute/path/to/project
```

Пути по умолчанию:

| Агент | Личный каталог | Каталог проекта |
| --- | --- | --- |
| Codex | `~/.agents/skills/prompt-architect` | `<project>/.agents/skills/prompt-architect` |
| Claude Code | `~/.claude/skills/prompt-architect` | `<project>/.claude/skills/prompt-architect` |
| Cursor | `~/.cursor/skills/prompt-architect` | `<project>/.cursor/skills/prompt-architect` |
| Gemini CLI | `~/.gemini/skills/prompt-architect` | `<project>/.gemini/skills/prompt-architect` |

После установки начните новую сессию агента. Назовите навык `prompt-architect` в запросе, если агент не выбрал его автоматически. Для Claude Code при установке отдельного навыка используйте его как обычный личный навык; команда плагина с префиксом `/extensive-prompt-architect:` относится только к полной установке плагина.

## Ручная установка из клонированного репозитория

```bash
git clone https://github.com/Ext7/extensive-prompt-architect.git
cd extensive-prompt-architect
node bin/install.mjs codex --dry-run
node bin/install.mjs codex
```

Вместо `codex` подставьте `claude`, `cursor` или `gemini`. Для другого агента со [стандартом Agent Skills](https://agentskills.io/specification) скопируйте папку `skills/prompt-architect` **целиком**, включая `references`, в поддерживаемый им каталог навыков. Одного файла `SKILL.md` недостаточно: он ссылается на два справочника.

## Обновление и удаление отдельного навыка

Сначала найдите путь установки в таблице выше. Проверьте, что это именно `prompt-architect` из этого репозитория. Для обновления удалите только эту папку и повторите установку выбранным способом. Для удаления достаточно удалить только эту папку; остальные навыки и настройки агента не затрагиваются. Установщик специально не делает это сам, чтобы не стереть пользовательские правки.

## Если установка не проходит

- **GitHub недоступен или репозиторий не найден.** Проверьте, что адрес опубликован и доступен без входа. Пока публикация не завершена, команды из GitHub работать не будут.
- **Команда `codex`, `claude` или `npm` не найдена.** Установите соответствующий CLI или Node.js и откройте терминал заново.
- **Навык уже существует.** Скрипт не заменяет его. Сохраните нужные изменения, удалите только старую папку `prompt-architect` и повторите команду.
- **Навык не появляется.** Начните новую сессию, проверьте путь установки и наличие `SKILL.md` вместе с папкой `references`.
- **Вы используете Claude в браузере.** Команды Claude Code относятся к Claude Code. Возможность добавлять пользовательские навыки в Claude на сайте зависит от интерфейса, тарифа и настроек учётной записи.

Исходники [доступны для просмотра](skills/prompt-architect/SKILL.md). Условия копирования и использования описаны в [лицензии](LICENSE).
