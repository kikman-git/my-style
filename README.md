# My Style

A private personal hairstyle and eyewear fitting room, built around the supplied portrait.

- 59 hairstyle choices, including the original, with photographic edits.
- 65 frame options across 16 shapes and four finishes, including no glasses.
- Eight hair colors, clear/smoke/amber lenses, adjustable frame alignment.
- Original facial features restored from the source photograph; no face regeneration in the running app.
- Estimated front/side/back photo navigation for 20 core hairstyles. This is a photographic angle viewer, not a rotatable 3D scan.
- Per-hairstyle after-shower routines, local saved looks, and PNG exports.

## Run

```sh
npm install
npm run dev
```

## Verify and build

```sh
npm run check
npm test
npm run build
```

The browser verification uses an installed headless Chromium. Override its path with `STYLE_TEST_BROWSER` and the app origin with `STYLE_TEST_URL` when needed. Screenshots are written under `/tmp`, not committed.

The app is static and performs compositing in the browser. It does not require an API key. Saved looks are local to the browser and limited to 24. Uploaded replacement portraits support manually aligned glasses; the prepared hairstyle edits are specific to the supplied original portrait.

## Image production

Assets were generated with the built-in ImageGen tool. Each haircut used the supplied portrait as the edit target. Prompt template: “Change only the hairstyle to [named cut], natural black. Preserve exact identity, facial geometry, eyes, eyebrows, nose, smile, teeth, skin texture, expression, clothing, pose, composition, restaurant background, lighting and exposure. Remove glasses perched on the hair. Photorealistic individual strands and hairline; no illustration, wig, mannequin, or 3D render.”

Frame prompt template: “Strict front-on photographic product cutout of [frame shape], on a genuinely transparent background with optically clear lens interiors, realistic material thickness and highlights, no face, text, logo, or scene.”

Angle prompt template: “Two equal 4:5 panels showing the exact person's right-facing side and back with [hairstyle], using the supplied front and actual profile references. Match black shirt and restaurant lighting. Back is a plausible barber interpretation. Photographs, no text or 3D render.”

`asset-provenance.json` records the generated source for each prepared asset. The frontend aligns hair photographs to the source and restores the central face with a feathered mask. Frame interiors are cleared from photographic cutouts, then composited with a subtle shadow, head tilt, and optional tint.

AI-generated hairlines, fringe, temples, and unseen angles remain estimates. The core facial pixels are preserved, but this is not a physical fitting, facial scan, or guarantee that a haircut will behave the same on your natural hair.
