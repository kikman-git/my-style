# My Style

A private personal hairstyle and eyewear fitting room, built around the supplied portrait.

- 59 hairstyle choices, including the original, with photographic edits.
- 65 frame options across 16 shapes and four finishes, including no glasses.
- Eight hair colors, clear/smoke/amber lenses, adjustable frame alignment.
- Normal / Smiling expression selector in front view. Smiling preserves the source expression; Normal composites a prepared neutral mouth and cheeks while preserving the original eyes, nose and facial outline.
- Always-visible Front, Side, and Back controls, with 21 hairstyle-specific angle boards and labeled related-cut references for other variants. This is a photographic angle viewer, not a rotatable 3D scan.
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

The app is static and performs compositing in the browser. It does not require an API key. Saved looks are local to the browser and limited to 24; each stores its expression, and older saved looks default to Smiling. Export filenames include the expression or angle. Uploaded replacement portraits support manually aligned glasses; prepared hairstyle and expression edits are specific to the supplied original portrait. Choosing an expression returns to Front; side/back remain hairstyle references.

## Image production

Assets were generated with the built-in ImageGen tool. The original hairstyle now has its own estimated side/back board at `public/assets/real/natural-angles.jpg`, using the supplied portrait and profile references and the angle prompt template below. Each haircut used the supplied portrait as the edit target. Prompt template: “Change only the hairstyle to [named cut], natural black. Preserve exact identity, facial geometry, eyes, eyebrows, nose, smile, teeth, skin texture, expression, clothing, pose, composition, restaurant background, lighting and exposure. Remove glasses perched on the hair. Photorealistic individual strands and hairline; no illustration, wig, mannequin, or 3D render.”

Frame prompt template: “Strict front-on photographic product cutout of [frame shape], on a genuinely transparent background with optically clear lens interiors, realistic material thickness and highlights, no face, text, logo, or scene.”

Angle prompt template: “Two equal 4:5 panels showing the exact person's right-facing side and back with [hairstyle], using the supplied front and actual profile references. Match black shirt and restaurant lighting. Back is a plausible barber interpretation. Photographs, no text or 3D render.”

The Normal expression asset is saved at `public/assets/expressions/normal.jpg`, generated with the built-in ImageGen tool from `public/assets/original.jpg`. Only the mouth and cheeks are blended into the preview; hairstyle photographs and fitted eyewear are reused. Final prompt:

```text
Use case: identity-preserve
Asset type: alternate facial-expression photograph for the supplied person's personal hairstyle try-on app.
Input image 1 is the edit target. Change ONLY his smile into a natural relaxed neutral expression: lips gently closed, corners relaxed, no visible teeth, cheeks naturally at rest. He should look calm and approachable, not stern, sad or angry.
Preserve exact identity, facial proportions, nose, eyebrows, ears, eye positions and gaze, facial hair and skin texture. Do not beautify, slim, age, reshape or smooth the face. Keep the head tilt, exact framing and scale, hairstyle, glasses perched on his hair, black shirt, restaurant background, lighting, exposure and colors unchanged. Preserve the image registration precisely so the neutral mouth and cheeks can be composited onto the original without moving the rest of the photograph. Same 4:5 portrait composition. Photorealistic photographic edit, no text or graphics.
```

`asset-provenance.json` records the generated source for each prepared asset. The frontend aligns hair photographs to the source and restores the central face with a feathered mask. Folded arms inside product-photo lenses are cleared. Connected temple arms are fitted from the frame hinges to the ears, with matching material shading. Side views use calibrated eye and ear anchors for each reference photo. Frames retain a subtle shadow, head tilt, and optional tint.

AI-generated expression details, hairlines, fringe, temples, and unseen angles remain estimates. Smiling preserves the original central facial pixels; Normal changes the mouth and cheeks. This is not a physical fitting, facial scan, or guarantee that a haircut will behave the same on your natural hair.
