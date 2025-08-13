# Accessibility

- **Keyboard**: Skip link, focus-visible styles, Command Palette accessible via keyboard
- **Roles/Labels**: ARIA roles on dialogs, tooltips
- **Contrast**: Palette meets ≥4.5:1
- **Reduced Motion**: Animations are subtle and respect `prefers-reduced-motion`
- **Testing**: Basic axe check (`tests/a11y/home.a11y.spec.ts`). Manual testing recommended for drag-and-drop with keyboard alternatives.

**Known exceptions**
- Complex DnD interactions are challenging for keyboard users. We provide list reordering and focusable items; consider adding keyboard reordering shortcuts.
