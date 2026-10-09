# Identity rendering evidence

Date: 2026-08-07
Canonical source: `assets/openbindings-glyph.svg`
Specimen: `specimens/identity.html`

The canonical glyph was rendered inline on white and `#0a0a0a` surfaces at
16, 20, 24, 32, 48, and 96 CSS pixels of height. The specimen produced twelve
marks and retained the canonical `102 62 978 1066` view box.

## Measured rendered dimensions

| Height | Width |
| ---: | ---: |
| 16px | 14.67px |
| 20px | 18.34px |
| 24px | 22.02px |
| 32px | 29.35px |
| 48px | 44.03px |
| 96px | 88.07px |

The measurements preserve the canonical 978:1066 aspect ratio.

## Observation

The nested structure remains recognizable at 16 pixels on both surfaces, but
the five outlines compress into a deliberately intricate favicon texture.
At 24 pixels the separate outlines read reliably as an interface mark; this is
the ordinary UI minimum. Larger sizes preserve the same character without
revealing geometry defects or theme-specific failures.

The generated favicon is therefore the named 16-pixel exception. Interface
headers, controls, and standalone brand placements use 24 pixels or larger.
