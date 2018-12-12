open sour## Mediapress Styles

Most stylesheets are written in [Sass](http://sass-lang.com/guide) and uses [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) as a guideline for project layout.

### Api Reference

#### color( name: string )

Can be used with any variable found in [src/sass/settings/_colors.scss_](_colors.scss_) to display colors relevant to the currently selected theme.

#### dark-only() or day-only()

Very simple mixins that allow you to inline target either only day or night mode for styling

```sass
body .header .list
  background: red
  +dark-only
    background: blue
```

```scss
body .header .list{
  background: red;
  @include dark-only{ background: blue; }
}
```
