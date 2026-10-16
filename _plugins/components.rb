# frozen_string_literal: true

# Block tags for the content components used on article pages. Each tag
# renders _includes/components/<tag>.html, with the Markdown body available
# as `component.content` (and `component.inline` when the body is a single
# paragraph) and any key="value" arguments as `component.<key>`:
#
#   {% text %}
#   ## Heading
#   Some *Markdown*.
#   {% endtext %}
#
#   {% quote img="/wp-content/uploads/..." attr="Name, Institution" %}
#   Quoted text.
#   {% endquote %}
module USPP
  # Generic Liquid block that renders a component include around Markdown
  class ComponentBlock < Liquid::Block
    ATTR = /(\w+)=("[^"]*"|'[^']*'|\S+)/

    def initialize(tag_name, markup, tokens)
      super
      @name = tag_name
      @attrs = markup.scan(ATTR)
    end

    def render(context)
      site = context.registers[:site]
      component = @attrs.to_h do |key, value|
        [key, value.match?(/\A["']/) ? value[1..-2] : context[value]]
      end
      component['content'] = markdown(site, super.to_s)
      single = component['content'].match(%r{\A<p>(.*)</p>\z}m)
      component['inline'] = single[1] if single && !single[1].include?('<p>')

      path = File.join(site.source, '_includes', 'components', "#{@name}.html")
      template = site.liquid_renderer.file(path).parse(File.read(path))
      html = context.stack do
        context['component'] = component
        template.render!(context)
      end
      # One unindented HTML block, so the page's own Markdown pass leaves it alone
      "#{html.lines.map(&:strip).reject(&:empty?).join("\n")}\n"
    end

    private

    def markdown(site, body)
      indent = body.scan(/^[ \t]*(?=\S)/).min_by(&:size) || ''
      body = body.gsub(/^#{indent}/, '')
      site.find_converter_instance(Jekyll::Converters::Markdown).convert(body).strip
    end
  end
end

%w[text pull quote section accordion item].each do |tag|
  Liquid::Template.register_tag(tag, USPP::ComponentBlock)
end
