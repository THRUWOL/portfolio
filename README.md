# Портфолио Ярош Никиты | Java Backend Developer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Персональное портфолио Java Backend разработчика с 3+ годами коммерческого опыта.

🌐 **Сайт:** [yaroshnikita.online](https://yaroshnikita.online)

---

## 📋 О проекте

Современное одностраничное портфолио, разработанное с использованием чистого HTML, CSS и JavaScript. Сайт оптимизирован для поисковых систем (SEO) и поддерживает тёмную/светлую темы.

### Особенности

- 🎨 **Две темы** — тёмная (IntelliJ IDEA Dark) и светлая
- 📱 **Полная адаптивность** — корректное отображение на всех устройствах
- ⚡ **Производительность** — ленивая загрузка, минимальное количество зависимостей
- 🔍 **SEO-оптимизация** — мета-теги, Open Graph, Schema.org разметка
- ♿ **Доступность** — ARIA-атрибуты, навигация с клавиатуры
- 📄 **PWA-ready** — manifest.json для установки на устройства

---

## 🛠️ Технологии

| Категория | Технологии |
|-----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Шрифты** | JetBrains Mono, Inter (Google Fonts) |
| **Иконки** | SVG inline |
| **Сборка** | Не требуется (статический сайт) |

---

## 📁 Структура проекта

```
portfolio/
├── index.html              # Главная страница
├── 404.html                # Страница ошибки 404
├── robots.txt              # Правила для поисковых роботов
├── sitemap.xml             # Карта сайта для SEO
├── LICENSE                 # Лицензия MIT
├── README.md               # Документация проекта
├── .gitignore              # Игнорируемые файлы Git
├── manifest.json           # PWA манифест
├── a7f3e9d2_resume.pdf     # Резюме для скачивания
├── css/
│   ├── style.css           # Основной файл стилей
│   ├── variables.css       # CSS-переменные и темы
│   ├── base.css            # Базовые стили и сброс
│   └── components.css      # Стили компонентов
├── js/
│   └── main.js             # Основная логика сайта
├── assets/
│   ├── favicon.svg         # Фавиконка
│   ├── og-preview.svg      # Превью для соцсетей
│   ├── images/             # Изображения
│   ├── icons/              # Иконки
│   └── projects/           # Скриншоты проектов
└── Сертификаты/            # Сертификаты о повышении квалификации
    ├── МФТИ/
    ├── b4c8f1a3_innopolis_ai.pdf
    ├── c2d9e5b7_robotics.pdf
    └── ...
```

---

## 🚀 Быстрый старт

### Локальный запуск

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yarosh-nv/portfolio.git
cd portfolio
```

2. Откройте `index.html` в браузере или используйте локальный сервер:

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx serve .
```

3. Перейдите по адресу `http://localhost:8000`

---

## 📦 Развёртывание

### GitHub Pages

1. Запушьте код в репозиторий GitHub
2. Включите GitHub Pages в настройках репозитория
3. Сайт будет доступен по адресу `https://username.github.io/portfolio`

### Любой хостинг

Просто загрузите все файлы на статический хостинг:
- Netlify
- Vercel
- Cloudflare Pages
- Традиционный хостинг (FTP)

---

## ⚙️ Конфигурация

### Изменение контактных данных

Отредактируйте объект `CONFIG` в файле `js/main.js`:

```javascript
const CONFIG = {
    // ...
    EMAIL: 'your.email@example.com'
    // ...
};
```

Также обновите контакты в `index.html` и `404.html`.

### Настройка тем

Темы настроены в `css/variables.css`. Измените цветовые переменные для кастомизации:

```css
:root {
    --accent-java: #e76f00;      /* Акцент Java */
    --accent-spring: #6db33f;    /* Акцент Spring */
    /* ... */
}
```

---

## 📊 SEO и аналитика

### Мета-теги

Проект включает полную настройку SEO:
- Meta description, keywords
- Open Graph для соцсетей
- Twitter Card
- Schema.org разметка (JSON-LD)

### Файлы для поисковиков

- `robots.txt` — правила индексации
- `sitemap.xml` — карта сайта

---

## 🧪 Тестирование

### Проверка производительности

Используйте [Google PageSpeed Insights](https://pagespeed.web.dev/) или [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/):

```bash
# В Chrome DevTools откройте вкладку Lighthouse
```

### Кроссбраузерность

Сайт протестирован в:
- Chrome (последняя версия)
- Firefox (последняя версия)
- Safari (последняя версия)
- Edge (последняя версия)

---

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. См. файл [LICENSE](LICENSE) для подробностей.

---

## 👤 Автор

**Ярош Никита**
- 📧 yarosh.nv@yandex.ru
- ✈️ [@YaroshNikita](https://t.me/YaroshNikita)
- 💼 [GitHub](https://github.com/yarosh-nv)

---

## 🤝 Вклад

Проект открыт для улучшений. Если вы нашли баг или хотите предложить улучшение:

1. Создайте issue с описанием проблемы
2. Или сделайте fork и отправьте pull request

---

## 📈 Roadmap

- [ ] Добавить секцию с проектами
- [ ] Интегрировать Google Analytics
- [ ] Добавить форму обратной связи
- [ ] Поддержка i18n (русский/английский)
- [ ] Оптимизация изображений в WebP

---

*Последнее обновление: 1 марта 2026*
