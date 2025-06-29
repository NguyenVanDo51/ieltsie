# Design System

A comprehensive design system for the IELTS learning app, providing consistent, beautiful, and reusable UI components.

## Components

### Core Components

- **GradientBackground**: Flexible gradient backgrounds with predefined variants
- **Button**: Versatile button component with multiple variants, sizes, and gradient support
- **Card**: Flexible card component with selection states and variants
- **Typography**: Consistent text styling with semantic variants
- **Header**: Page headers with navigation and content support
- **Layout**: Layout wrapper with safe area and scrolling support
- **Grid**: Responsive grid layout for organizing content

### Specialized Components

- **LanguageCard**: Specialized card for language selection with flag display

## Design Tokens

The design system is built on a comprehensive token system including:

- **Colors**: Primary, secondary, success, warning, error, and neutral color palettes
- **Gradients**: Predefined gradient combinations for backgrounds and buttons
- **Spacing**: Consistent spacing scale from xs to 6xl
- **Typography**: Font sizes, weights, and line heights
- **Border Radius**: Consistent border radius values
- **Shadows**: Elevation system with multiple shadow levels
- **Animation**: Duration and easing values for consistent animations

## Usage Examples

### Basic Button
```tsx
import { Button } from '~/components/design-system'

<Button
  title="Continue"
  onPress={handlePress}
  variant="primary"
  size="lg"
/>
```

### Gradient Button
```tsx
<Button
  title="Get Started"
  onPress={handlePress}
  gradient
  gradientColors={['#4facfe', '#00f2fe']}
  size="lg"
/>
```

### Language Selection Card
```tsx
import { LanguageCard } from '~/components/design-system'

<LanguageCard
  name="English"
  image={englishFlag}
  selected={isSelected}
  onPress={handleSelect}
  variant="gradient"
/>
```

### Page Layout with Header
```tsx
import { GradientBackground, Layout, Header } from '~/components/design-system'

<GradientBackground variant="primary">
  <Layout safeArea scrollable>
    <Header
      title="Select Language"
      subtitle="Choose your learning language"
      showBack
      onBack={handleBack}
      variant="transparent"
    />
    {/* Content */}
  </Layout>
</GradientBackground>
```

## Customization

All components accept style props for customization while maintaining design consistency. The design tokens can be extended or modified in `tokens.ts` to match brand requirements.

## Best Practices

1. Use design tokens instead of hardcoded values
2. Leverage component variants before creating custom styles
3. Maintain consistent spacing using the spacing scale
4. Use semantic color names (primary, secondary, etc.) instead of specific colors
5. Apply shadows consistently using the elevation system
6. Use Typography component for all text to ensure consistency