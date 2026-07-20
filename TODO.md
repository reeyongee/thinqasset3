# ThinqAsset — Future work

## Page transitions

- [ ] **Global mobile lock-height for text mask transitions** — When SplitText or line-mask animations are added, lock element height before splitting on mobile (Safari adds ~7px per masked line). Apply globally via a shared `prepareTransitionText()` helper and `clearProps` on enter complete. Extends the pattern from production Nuxt page-transition systems to all breakpoints, not only desktop.
