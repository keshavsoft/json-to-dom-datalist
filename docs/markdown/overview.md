# Overview

`json-to-dom-datalist` is a lightweight, zero-dependency, config-driven HTML5 `<datalist>` autocomplete generator built on top of `json-to-dom`.

## What it does
- Extracts distinct values from data collections for specified columns.
- Calculates accurate frequency counts for each distinct value (e.g. `ROPE 10MM High Tensile (3)`).
- Renders native HTML5 `<datalist>` elements with `<option>` children via `json-to-dom`.
- Binds seamlessly to any native browser `<input list="...-datalist">`.
- Supports dynamic real-time dataset updates via `.update({ inData })`.
- Provides instant zero-dependency project scaffolding via `npx json-to-dom-datalist`.

## Scope
- Focuses exclusively on HTML5 `<datalist>` autocomplete option lists.
- Avoids custom floating dropdown DOM trees, heavy popup positioning engines, and third-party styling frameworks.
- Relies on native browser UI behavior, ensuring 100% mobile accessibility and zero CSS collision.
