# Modal Implementation Notes

## Modal Strategy

This project currently uses `<dialog>` + `dialog-polyfill`.

Rationale:

- Lightweight, native behavior
- Cross-browser compatibility
- Clean implementation with minimal JS

Other options considered:

- Custom `<div>` modal (more control but more code)
- `react-modal` (more features, larger bundle)

### ✅ 1. Native `<dialog>` + `dialog-polyfill`

#### 🔹 Pros:

- ✅ Lightweight (no framework dependencies, polyfill is ~3.4 KB)
- ✅ Built-in accessibility (Escape key, modal behavior, backdrop handling)
- ✅ Cross-browser support when polyfill is included
- ✅ Simple to implement with minimal JavaScript
- ✅ Keeps native semantics – great for progressive enhancement

#### 🔸 Cons:

- ❌ Limited animation support – closing the modal is instant (`.close()` cannot be delayed for fade-out)
- ❌ Backdrops are tricky to style (`::backdrop` is limited)
- ❌ Focus trapping is basic and not configurable
- ❌ Still requires `.showModal()` and `.close()` logic in JS
- ❌ Browser quirks – older Safari needed polyfill; might not behave exactly like custom solutions

---

### ✅ 2. Custom Modal using `<div role="dialog">`

#### 🔹 Pros:

- ✅ Full control over structure, styling, transitions, layout
- ✅ Easy to animate (fade-in/out, slide, etc.)
- ✅ Works in all browsers – no need for polyfill
- ✅ Accessible if implemented correctly (`role="dialog"`, `aria-modal="true"`, focus trap)
- ✅ Integrates well with design systems or CSS frameworks

#### 🔸 Cons:

- ❌ More setup required – you have to manually implement:
  - Escape key behavior
  - Click outside to close
  - Focus trapping
- ❌ Accessibility must be manually maintained – easy to get wrong
- ❌ More lines of code compared to native or library

---

### ✅ 3. `react-modal` Package

#### 🔹 Pros:

- ✅ Out-of-the-box accessibility:
  - Focus trap
  - `aria` roles
  - Escape key handling
- ✅ Customizable styling (via `className`, inline styles, or CSS modules)
- ✅ Easy integration with React – just set `isOpen`, `onRequestClose`
- ✅ Widely used and battle-tested
- ✅ Supports animation via external libraries (e.g. `React Transition Group`)

#### 🔸 Cons:

- ❌ Adds a dependency (~6.5 KB gzipped)
- ❌ Adds abstraction – less transparent than writing your own logic
- ❌ Extra learning curve if unfamiliar with its API
- ❌ May be overkill for simple use cases

---

### 🔍 Quick Summary Table

| Feature                     | `<dialog>` + Polyfill     | Custom `<div>` Modal     | `react-modal`    |
| --------------------------- | ------------------------- | ------------------------ | ---------------- |
| ✅ Accessibility (a11y)     | Good                      | Manual                   | Excellent        |
| 🎯 Browser Support          | Needs polyfill            | Universal                | Universal        |
| 🎨 Styling Control          | Medium (limited backdrop) | Full                     | High             |
| 🔐 Focus Trap               | Basic (native)            | Manual                   | Built-in         |
| ⌨ Escape Key               | Built-in                  | Manual                   | Built-in         |
| 🚨 Animations (fade, slide) | Tricky (no close delay)   | Easy                     | Easy             |
| 📦 Bundle Size              | Very small + polyfill     | Small (custom code)      | Medium (~6.5 KB) |
| 🛠️ Setup Complexity         | Low                       | Medium                   | Low              |
| 📈 Popularity               | Niche                     | Common in design systems | High             |
