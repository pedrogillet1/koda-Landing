# Visual Shotlist — Photography & Art Direction

---

## Guiding Principles

- Real humans in real work contexts. No robots, no AI brains, no glowing neural networks.
- Professional, calm, focused. Think editorial, not stock photography.
- Diverse subjects. Brazilian professionals as primary representation.
- Warm lighting, natural tones. No neon, no dark-mode-aesthetic photos.

## Shot List

### Hero Image
| File | Dimensions | Scene |
|------|-----------|-------|
| `hero-human.jpg` | 1440x720 | Professional at a clean desk, laptop open showing Allybi interface. Confident posture, natural light from a window. Focus on the person, screen slightly blurred. |

### Pressure Moments (3 cards)
| File | Dimensions | Scene |
|------|-----------|-------|
| `pressure-contract.jpg` | 640x400 | Lawyer reviewing a printed contract with laptop open beside it. Pen in hand, focused expression. |
| `pressure-deadline.jpg` | 640x400 | Two professionals comparing documents side by side at a conference table. Clock or window suggesting late afternoon. |
| `pressure-compliance.jpg` | 640x400 | Compliance officer at a monitor with multiple document tabs open. Organized desk, calm demeanor. |

### Legal Page
| File | Dimensions | Scene |
|------|-----------|-------|
| `legal-hero.jpg` | 1440x480 | Overhead shot of a lawyer's desk: open laptop, marked-up contract, coffee, notebook. Hands visible but face cropped. |

### About Page
| File | Dimensions | Scene |
|------|-----------|-------|
| `about-workspace.jpg` | 1440x480 | Modern office workspace — natural light, clean desks, a few people working independently. Editorial feel. |
| `about-team.jpg` | 800x600 | Small team in a casual meeting. Whiteboard or screen in background. Genuine interaction, not posed. |

## Placeholder Implementation

Until photography is shot, use CSS gradient placeholders with `data-scene` attributes:

```html
<div class="photo-placeholder" data-scene="hero-human"
     style="background: linear-gradient(135deg, #e8e4df 0%, #d4cfc8 100%);
            aspect-ratio: 2/1;">
  <span class="placeholder-label">Photo: Professional at desk with Allybi</span>
</div>
```

Placeholder style: warm neutral gradients (#e8e4df to #d4cfc8), with a small text label describing the intended scene. No icons, no illustrations.

## Asset Manifest

| File name | Page | Section | Status |
|-----------|------|---------|--------|
| hero-human.jpg | Home | Hero | Needed |
| pressure-contract.jpg | Home | Pressure moments | Needed |
| pressure-deadline.jpg | Home | Pressure moments | Needed |
| pressure-compliance.jpg | Home | Pressure moments | Needed |
| legal-hero.jpg | Legal | Hero | Needed |
| about-workspace.jpg | About | Hero | Needed |
| about-team.jpg | About | Team section | Needed |

All images should be delivered as optimized JPEGs (quality 80) with 2x versions for retina displays.
