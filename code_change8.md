# Code Change 8 — Studio cursor fix (delta after code_change7.md)

Fix: on the redesigned hub, hovering a link/button showed a solid opaque yellow disc that covered the text. Split the cursor into two variants - a transparent inverting ring for links/text, and the filled yellow "View" disc only for the Cases cards.

## Summary

| File | Type | Change |
|---|---|---|
| `app/globals.css` | modified | Split `hover` variant into `hover` (transparent ring) + new `view` (filled yellow); moved the label to `view` |
| `components/studio/StudioExperience.tsx` | modified | Cases now set the `view` cursor variant instead of `hover` |

Root cause: the `hover` variant used `background: var(--st-yellow)` with `mix-blend-mode: normal` at `z-index: 9999`, so it sat on top of and hid link/button labels.

---

## 1. `app/globals.css` — two cursor variants

```diff
-.st-cursor[data-variant="hover"] {
-  width: 92px;
-  height: 92px;
-  margin: -46px 0 0 -46px;
-  background: var(--st-yellow);
-  border-color: var(--st-yellow);
-  mix-blend-mode: normal;
-}
+.st-cursor[data-variant="hover"] {
+  /* transparent inverting ring so link/button text stays readable */
+  width: 64px;
+  height: 64px;
+  margin: -32px 0 0 -32px;
+}
+.st-cursor[data-variant="view"] {
+  width: 92px;
+  height: 92px;
+  margin: -46px 0 0 -46px;
+  background: var(--st-yellow);
+  border-color: var(--st-yellow);
+  mix-blend-mode: normal;
+}
```

```diff
-.st-cursor[data-variant="hover"] .st-cursor-label { opacity: 1; }
+.st-cursor[data-variant="view"] .st-cursor-label { opacity: 1; }
```

The base `.st-cursor` already has `mix-blend-mode: difference`; the `hover` variant now inherits it (no fill), so the ring inverts around the pointer and the text underneath stays legible. The `view` variant keeps the solid yellow + "View" label for the dark Cases cards, where it is an intentional affordance.

## 2. `components/studio/StudioExperience.tsx` — route Cases to `view`

```diff
         const onOver = (e: MouseEvent) => {
           const t = e.target as HTMLElement;
-          if (t.closest("[data-case]")) setVariant("hover", "View");
+          if (t.closest("[data-case]")) setVariant("view", "View");
           else if (t.closest("a, button, [data-magnetic]")) setVariant("hover", "");
           else setVariant("", "");
         };
```

---

*End of `code_change8.md` — delta after `code_change7.md`: 2 modified files.*
