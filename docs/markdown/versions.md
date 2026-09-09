# Version Strategy & src's Highest Version

This package enforces a versioned evolution strategy that guarantees zero breaking changes across revisions.

## Why `src/` is Versioned (`v1`, `v2`, ... `vN`)

1. **Immutable History**: Older versions remain preserved in `src/v1/` for backwards compatibility.
2. **Safe Architectural Refactoring**: `v2` cleanly decoupled state (`DataListStore`), methods (`methods/`), actions (`actions/`), and builders (`datalistBuilder/`) without disrupting projects relying on `v1`.
3. **No Hardcoded Versions in Consumer Code**:
   - `src/index.js` is the package root proxy pointing to `src`'s highest version.
   - Applications import directly from `"json-to-dom-datalist"` without ever hardcoding `"v1"` or `"v2"`.

## How `npx json-to-dom-datalist` Works

The zero-dependency CLI (`bin/cli.js`) automatically inspects `src/`:
1. Discovers all directories matching `/^v\d+$/`.
2. Sorts them in descending numerical order.
3. Automatically copies **src's highest version** to the target project directory (default: `./json-to-dom-datalist`).
4. Can optionally target a specific version with `--version-target=v1`.

```bash
# Instant scaffolding: automatically selects highest version (v2)
npx json-to-dom-datalist

# Or specify a custom folder:
npx json-to-dom-datalist ./src/components/datalist
```
