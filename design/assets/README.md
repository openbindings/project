# Assets

This directory contains canonical OpenBindings identity sources and committed
generated variants.

- [`openbindings-glyph.svg`](openbindings-glyph.svg) is the presentation-neutral
  canonical glyph.
- [`manifest.json`](manifest.json) names the identity revision, generated
  variants, intended uses, and current consumers.
- `generated/` is written by `npm run generate` and checked by `npm test`.

Do not edit a generated asset in either this repository or a consumer. Change
the canonical source, regenerate the variants, and run the identity slice's
consumer migration loop.

Usage, clear space, minimum size, and accessibility rules are in
[`brand/identity.md`](../brand/identity.md). Wordmarks, social cards, and
product-specific compositions are not yet part of the adopted identity system.
