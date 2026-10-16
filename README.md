# usparticlephysics.org Website Source

Jekyll source for the U.S. Particle Physics website, built and deployed to
GitHub Pages by GitHub Actions (same setup as
[clariphy.github.io-source](https://github.com/clariphy/clariphy.github.io-source)).

## Testing locally

```bash
gem install bundler
bundle install
bundle exec rake serve      # http://localhost:4000
bundle exec rake check      # build + html-proofer link check
```

## Where things live

| Path | What it holds |
|------|---------------|
| `_config.yml` | Site title, footer contacts and funders |
| `_data/menus.yml` | Header navigation |
| `_data/institutions.yml` | Institutions list on /institutions/ (one list per page column) |
| `pages/` | One Markdown file per page; `permalink:` keeps the old WordPress URLs |
| `_layouts/` | Page types (see below), all built on `wp.html` (header, footer, scripts) |
| `_includes/components/` | HTML for the article components |
| `_plugins/components.rb` | Liquid block tags for the components that take Markdown bodies |
| `wp-content/` | Theme stylesheet/scripts (`themes/USPP/`) and uploaded images/PDFs, at their original paths |
| `2023-p5-report/` | The 2023 P5 Report sub-site, kept as static HTML |

## Page layouts

| Layout | Used by | Content comes from |
|--------|---------|--------------------|
| `home` | `/` | `hero_image`, `tiles:` list in front matter |
| `tiles` | About Particle Physics | `intro`, `tiles:` list |
| `resources` | Resources, Media Assets Library | `intro`, `sections:` list of links (`url:`) and downloads (`download:`) |
| `institutions` | Particle Physics in the U.S. | `intro`, `_data/institutions.yml`, map in `_includes/institutions-map*.html` |
| `credits` | Site Credits | `supporters:` and `attributions:` lists |
| `report` | 2014 P5 Report, Benchmarking | `label`, `intro`, Markdown body with components |
| `brochure` | `/brochure/*` | `hero_image`, `intro`, Markdown body with components |
| `default` | anything new | title band plus plain Markdown |

## Article components

Report and brochure bodies are Markdown, split into the theme's components:

```liquid
{% text %}
## A heading
Ordinary **Markdown**, lists, [links](/resources/).
{% endtext %}

{% include components/image.html src="/wp-content/uploads/....jpg" caption="Photo: ..." %}
{% include components/image.html src="..." width="67%" %}
{% include components/images.html left="..." right="..." left_caption="..." %}
{% include components/download.html url="/wp-content/uploads/....pdf" title="Report" size="9 MB" %}
{% include components/download.html url="https://..." title="Report" offsite=true %}

{% pull %}
A highlighted pull-out paragraph.
{% endpull %}

{% quote img="/wp-content/uploads/....jpg" attr="Name, Institution" %}
Quoted text.
{% endquote %}

{% section title="Heading" %}
Introductory paragraph for a group of expandable items.
{% endsection %}

{% accordion %}
{% item title="Expandable item" img="/wp-content/uploads/....jpg" %}
Text shown when the item is opened.
{% enditem %}
{% endaccordion %}
```

A few pages keep `&nbsp;` or `<p></p>` lines from the original WordPress
content; they are spacers that reproduce the original vertical spacing.

## Deploying

CI builds on every push and pull request and deploys `main` to GitHub
Pages. In the repository settings set Pages → Source to "GitHub Actions";
`CNAME` sets the custom domain.
