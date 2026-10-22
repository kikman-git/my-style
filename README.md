# My Style

A private personal hairstyle and eyewear fitting room, built around the supplied portrait.

- 59 hairstyle choices, including the original, with photographic edits.
- 65 frame options across 16 shapes and four finishes, including no glasses.
- Eight hair colors, clear/smoke/amber lenses, adjustable frame alignment.
- Normal / Smiling expression selector in front view. Smiling preserves the source expression; Normal aligns the full resting face from the supplied non-smiling photograph, with the existing eyewear removed for try-on.
- Always-visible Front, Side, and Back controls, with 21 hairstyle-specific angle boards. Other variants are labeled Front only and their Side/Back controls are disabled until their own images exist. This is a photographic angle viewer, not a rotatable 3D scan.
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

Normal uses an unaltered copy of `Photo on 2026-10-22 at 15.33 #2.jpg`, saved at `public/assets/expressions/normal-source.jpg`. Its full resting face is aligned to the existing photographic hairstyle previews. The mouth, nose and lower face come directly from the source pixels. A built-in ImageGen glasses-removal edit is saved at `public/assets/expressions/normal-no-glasses.jpg`; only the eyewear area is blended in to clear the existing frame and lens tint. The earlier generated neutral expression is no longer used.

Final glasses-removal prompt:

```text
Use case: identity-preserve
Input image 1 is the edit target: this person's real non-smiling photograph.
Remove ONLY the eyeglasses from his face, realistically reconstructing the thin strips of skin currently covered by the frame. Keep his exact neutral unsmiling facial expression: mouth closed with flat relaxed corners, no smile, no smirk, no teeth, eyes fully at rest as in the input.
Preserve everything else unchanged: exact face geometry, mouth and nose, eye positions and gaze, eyelids, eyebrows, skin texture and blemishes, facial hair, jawline, hair and hairline, head position, tilt, scale, clothing, background, lighting and colors. Do not beautify or change his face. Retain precise pixel registration, same uncropped landscape composition. No text or graphics. A very conservative photographic glasses-removal edit, not a new portrait.
```

`asset-provenance.json` records the generated source for each prepared asset. The frontend aligns hair photographs to the source and restores the central face with a feathered mask. Folded arms inside product-photo lenses are cleared. Connected temple arms are fitted from the frame hinges to the ears, with matching material shading. Side views use calibrated eye and ear anchors for each reference photo. Frames retain a subtle shadow, head tilt, and optional tint.

AI-generated glasses-removal details, hairlines, fringe, temples, and unseen angles remain estimates. Smiling preserves the original central facial pixels; Normal uses the supplied non-smiling face, aligned and feathered into the prepared hairstyle photographs. This is not a physical fitting, facial scan, or guarantee that a haircut will behave the same on your natural hair.
