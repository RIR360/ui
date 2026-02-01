# @rir360/ui

A collection of reusable React components optimized for Next.js.

## Installation
```bash
npx @rir360/ui add splide
```

## Components

### Splide Carousel

A simple wrapper around Splide carousel with Next.js App Router support.

**Features:**
- ✅ Server-side rendering support
- ✅ TypeScript support
- ✅ Auto-scroll extension
- ✅ Customizable options

**Usage:**
```tsx
import Carousel from '@/components/ui/splide'

export default function Page() {
  return (
    
      Slide 1
      Slide 2
      Slide 3
    
  )
}
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Carousel slides |
| `ariaLabel` | `string` | `"Carousel"` | Accessibility label |
| `options` | `CarouselOptions` | See below | Splide options |

**Default Options:**
```typescript
{
  type: 'loop',
  perPage: 1,
  gap: '1rem',
  arrows: true,
  pagination: true,
  autoScroll: false
}
```

## CLI

Install the CLI globally or use with `npx`:
```bash
npx @rir360/ui add 
```

## License

MIT
```
