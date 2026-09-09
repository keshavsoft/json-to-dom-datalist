# Tasks & Roadmap

Current and planned milestones for `json-to-dom-datalist`:

## Completed
- [x] Zero-dependency distinct value extraction with frequency count (`groupBy.js`).
- [x] HTML5 `<datalist>` spec builder for `json-to-dom`.
- [x] Decoupled `v2` architecture with dedicated `DataListStore`, `actions`, `methods`, and `render`.
- [x] Universal runtime compatibility supporting Node.js (SSR / test runner) and modern browsers via `globalThis`.
- [x] Dynamic real-time update pipeline (`.update({ inData })`).
- [x] Automated CLI (`npx json-to-dom-datalist`) with dynamic highest-version resolution.
- [x] Unit test suite with 100% test pass rate using `node --test`.

## Planned
- [ ] Asynchronous data fetching provider support (`dataProvider` integration).
- [ ] Custom option label template formatting (e.g. currency prefixes or custom badge texts).
- [ ] Debounced search filtering hook for very large datasets (>50,000 records).
