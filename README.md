# My Style

A personal hairstyle and eyewear fitting room built around the supplied smiling portrait.

- Smiling face only. There is no expression selector or non-smiling photo asset.
- 59 hairstyles with individual front, side and back images; no shared hairstyle angle references.
- Six complete photographic hair-and-glasses looks, each with front, three-quarter, side and back views. The original smiling facial features are restored in front; frames and temple arms are rendered inside the AI photographs at the other angles.
- 65 eyewear options across 16 shapes and four finishes, plus eight hair colors and three lens tints for photographic overlay previews.
- Per-hairstyle after-shower routines, local saved looks, and PNG exports.

## Run and verify

Run commands from the repository root; there is no nested app directory.

```sh
npm install
npm run dev
npm run check
npm test
npm run build
```

Browser verification uses an installed headless Chromium. Override its path with `STYLE_TEST_BROWSER` and the app origin with `STYLE_TEST_URL`. Screenshots remain under `/tmp`.

The app is static and composites prepared images in the browser without an API key. Saved looks are browser-local and limited to 24. Old non-smiling saved combinations are retained as smiling looks; their thumbnails are rebuilt. Uploaded portraits support manual glasses fitting; the prepared hairstyles and complete photo sets are specific to the supplied person.

## Photo production

The built-in ImageGen tool produced the photographic edits. Final image paths and exact selected edit prompts are recorded in `references/photo-generation.json`; generated source filenames are mapped in `asset-provenance.json`.

- Original smiling portrait: `public/assets/original.jpg`.
- Hairstyle fronts and individual side/back boards: `public/assets/real/`.
- Six complete four-angle hair-and-glasses boards: `public/assets/looks/`.
- Photographic frame cutouts: `public/assets/frames/`.
- Supplied profile anatomy reference: `references/profile-reference.png`.

Each hairstyle's front image defines the cut for its own side/back board. The final expression edits use the original toothy smile and the smiling profile reference, preserving the selected haircut, glasses, panel layout and scene. The back view remains an estimate of unseen anatomy and hair.

For catalog overlay previews, the frontend aligns the hairstyle edit to the original and restores the central smiling face with a feathered mask. Folded product arms inside the lens openings are cleared, and visible temple arms are fitted from frame hinges to ear anchors. Angle panels are cropped with a uniform scale so different source aspect ratios never stretch the face. The other angles in generated photo sets use their own photographic eyewear instead of canvas overlays; changing alignment, tint or color returns to the overlay preview.

These are photographic AI estimates rather than a 3D scan or a physical fitting. Generated facial details, unseen angles, hair behavior and frame fit may differ from reality. The original central facial pixels are preserved in every front preview; the other angles in complete photo sets are newly rendered images guided by the supplied face references.
