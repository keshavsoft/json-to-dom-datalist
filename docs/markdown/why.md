# Why Native HTML5 `<datalist>`?

Modern web forms often suffer from bloated dropdown and autocomplete libraries (e.g., Select2, React-Select, Choices.js). These libraries introduce hundreds of kilobytes of JavaScript, complex z-index stacking context battles, mobile keyboard overlap issues, and accessibility pitfalls.

## Core Advantages
1. **Zero External CSS/JS Dependencies**:
   Browser vendors build `<datalist>` autocompletion into the native rendering engine. No Popper.js, no custom scroll listeners, no CSS fighting.
2. **Native Mobile OS Keyboard Integration**:
   On iOS and Android, native `<datalist>` inputs trigger system keyboard completion trays and picker wheels seamlessly.
3. **Accessibility (a11y) Out-of-the-Box**:
   Screen readers recognize `<input list="...">` without needing complex ARIA roles, live regions, or custom keyboard navigation handlers.
4. **Data-Driven & Configurable**:
   Simply pass columns and data rows. `json-to-dom-datalist` computes distinct frequencies and outputs W3C-compliant declarative JSON specs for `json-to-dom`.
5. **Decoupled Architecture**:
   The datalist DOM lives cleanly in a hidden wrapper (`#ks-datalists-wrapper`) while normal inputs in your forms reference it by ID.
