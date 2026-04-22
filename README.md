## Boring Data — boringdata.org

Consulting business website for [boringdata.org](https://boringdata.org), built with Jekyll and deployed via GitHub Pages.

### Stack

- **Jekyll** 3.9 via `github-pages` gem (Ruby 3.2.4)
- **SASS** — component-based architecture in `assets/_sass/`
- **JavaScript** — custom constellation canvas animation (`assets/js/constellation.js`)
- **Fonts** — Playfair Display (headings) via Google Fonts, system sans-serif (body)
- **Forms** — Formspree

### Features

- Light/dark mode with time-of-day auto-detection and manual toggle
- 50/50 split homepage layout
- Services collection (`_services/`) — data-driven, no individual pages generated
- Data-driven navigation via `_data/menus.yml`
- HTML minification via `compress.html` layout wrapper
- Constellation canvas background animation

### Development

```bash
bundle install
bundle exec jekyll serve
```

### Deployment

Deployed automatically from the `master` branch to GitHub Pages. Domain configured via `CNAME` file (boringdata.org).
