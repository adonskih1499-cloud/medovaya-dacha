# Медовая дача — статичный сайт

Эко-домик на пасеке, где сон над ульями пчёл дарит телу целительные вибрации.

## Структура

```
medovaya-dacha/
├── index.html       — главная страница
├── tailwind.css     — скомпилированный Tailwind CSS (production)
├── styles.css       — кастомные стили и анимации
├── script.js        — интерактивность (меню, лайтбокс, форма)
├── favicon.png      — иконка сайта
├── .nojekyll        — отключает Jekyll на GitHub Pages
├── images/          — фотографии домика и логотип
└── src/
    └── input.css    — исходник Tailwind (для пересборки)
```

## Развертывание на GitHub Pages

### Способ 1: Прямая загрузка

1. Создайте новый репозиторий на GitHub (например, `medovaya-dacha`)
2. Имя репозитория для сайта пользователя: `username.github.io`
   или любое имя для project page: `medovaya-dacha`
3. Загрузите содержимое папки `medovaya-dacha/` в корень репозитория
4. Settings → Pages → Source: `Deploy from branch` → `main` / `(root)`
5. Через 1–2 минуты сайт будет доступен по адресу:
   - `https://username.github.io/medovaya-dacha/` (для project page)
   - `https://username.github.io/` (для user page)

### Способ 2: Через git

```bash
cd medovaya-dacha
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/medovaya-dacha.git
git push -u origin main
```

Затем Settings → Pages → Source: `main` branch / `(root)` folder.

## Особенности

- ✅ **Без сборки** — просто откройте `index.html` или разместите на любом хостинге
- ✅ **Production-ready** — Tailwind CSS скомпилирован, без CDN-предупреждений
- ✅ **GitHub Pages совместим** — `.nojekyll` отключает Jekyll, все пути относительные
- ✅ **Адаптивный** — работает на десктопе, планшете и мобильных
- ✅ **Доступный** — семантический HTML, ARIA-атрибуты, поддержка клавиатуры
- ✅ **SEO-оптимизированный** — мета-теги, OpenGraph, семантическая разметка

## Пересборка Tailwind CSS (если меняете стили)

Если вы изменили Tailwind-классы в `index.html` или добавили новые,
пересоберите CSS:

```bash
npm install -D tailwindcss @tailwindcss/cli
npx tailwindcss -i src/input.css -o tailwind.css --minify
```

## Локальный просмотр

Просто откройте `index.html` в браузере двойным кликом.
Или запустите локальный сервер:

```bash
python3 -m http.server 8000
# Откройте http://localhost:8000
```

## Контакты для замены

Перед публикацией замените плейсхолдеры:
- Телефон: `+7 (900) 000-00-00`
- Email: `hello@medovayadacha.ru`
- Ссылки на соцсети (WhatsApp, Telegram, Instagram)
- Адрес в секции «Контакты»
