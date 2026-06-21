# Code Change 3 — Pawsome fixes (delta after code_changes2.md)

Two bug fixes on the Pawsome experience. Only the changes **after `code_changes2.md`** are shown here.

## Summary

| File | Type | Fix |
|---|---|---|
| `components/pawsome/Sections.tsx` | modified | Gallery heading no longer overlaps the images (restructured layout) |
| `components/pawsome/PawsomeExperience.tsx` | modified | Custom cursor now renders (removed `hydrated` gate that left refs `null` during init) |

---

## 1. `components/pawsome/Sections.tsx` — fix gallery "Glow ups" overlap

The heading was `position: absolute`, layered on top of the cards. It now sits in its own row above a `flex-1` track region, so it never overlaps. Card height reduced `62vh` → `56vh` to fit under the heading.

```diff
 export function PwGallery() {
   return (
-    <section id="gallery" className="pw-gallery relative h-[100svh] overflow-hidden">
-      <div className="absolute left-6 top-24 z-10 sm:left-10">
-        <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">The gallery</p>
-        <h2 className="pw-display pw-h-xl mt-2 text-[var(--pw-cream)]">Glow ups</h2>
-      </div>
-      <div className="flex h-full items-center">
-        <div className="pw-h-track h-[62vh]">
+    <section id="gallery" className="pw-gallery relative flex h-[100svh] flex-col overflow-hidden">
+      <div className="px-6 pb-4 pt-24 sm:px-10">
+        <p className="text-xs uppercase tracking-[0.25em] text-[var(--pw-amber)]">The gallery</p>
+        <h2 className="pw-display pw-h-xl mt-2 text-[var(--pw-cream)]">Glow ups</h2>
+      </div>
+      <div className="flex flex-1 items-center pb-10">
+        <div className="pw-h-track h-[56vh]">
           {gallery.map((item, i) => (
             ...
           ))}
         </div>
       </div>
     </section>
   );
 }
```

---

## 2. `components/pawsome/PawsomeExperience.tsx` — fix invisible custom cursor

**Root cause:** the cursor `<div>`s were gated behind a `hydrated` flag, so they were absent from the DOM on first render. The init `useEffect` (empty deps) ran on that first commit, found `cursorRef.current === null`, skipped cursor setup, and never re-ran. Removing the gate makes the refs available when the effect runs.

**a) Import — drop unused `useState`:**

```diff
-import { useEffect, useRef, useState } from "react";
+import { useEffect, useRef } from "react";
```

**b) Remove the `hydrated` state and its effect:**

```diff
   const gsapRef = useRef<any>(null);
-  const [hydrated, setHydrated] = useState(false);
-
-  useEffect(() => setHydrated(true), []);

   /* ----- Custom cursor + magnetic + page intro + scroll animations ----- */
```

**c) Render the cursor unconditionally (markup is static, so no hydration-mismatch risk):**

```diff
       {/* Custom cursor */}
-      {hydrated && (
-        <>
-          <div ref={cursorRef} className="pw-cursor" data-variant="">
-            <span ref={labelRef} className="pw-cursor-label" />
-          </div>
-          <div ref={dotRef} className="pw-cursor-dot" />
-        </>
-      )}
+      <div ref={cursorRef} className="pw-cursor" data-variant="">
+        <span ref={labelRef} className="pw-cursor-label" />
+      </div>
+      <div ref={dotRef} className="pw-cursor-dot" />
```

---

*End of `code_change3.md` — delta after `code_changes2.md`: 2 modified files.*
