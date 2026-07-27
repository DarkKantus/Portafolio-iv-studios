# PeM Globe Focus With Axis Constraints — Implementation Plan

> **For Hermes:** Implement only after the user confirms the unresolved constraint behavior.

**Goal:** Rotate the wireframe sphere so a clicked node's fixed 3D coordinate faces the camera along **Z**. X/Y limits are no longer the acceptance criterion; the selected point must finish on the front-facing Z direction.

**Architecture:** Keep nodes as fixed local latitude/longitude vectors and keep projecting them from the globe's actual rotation each frame. Replace the current local-vector Euler shortcut with an orientation target calculated from the current globe orientation. Before applying the target, decompose/clamp its Euler components using the requested limits, then interpolate the mesh to that constrained target. Node buttons stay projection-only; they are never independently repositioned to fake centering.

**Tech Stack:** Vanilla JS + Three.js r128 in `js/pem.js`; node data in `pem.html`.

---

## Axis contract

| Axis | Requested limit | Meaning in current camera setup |
|---|---:|---|
| X | ±20% = ±72° | Vertical tilt / north-south traversal |
| Y | ±5% = ±18° | Horizontal yaw / east-west traversal |
| Z | Free | Roll is not clamped by the focus routine |

## Task 1: Remove conflicting old limits

**Files:**
- Modify: `js/pem.js`, `createMarsGlobe()`.

1. Replace the single `maxYaw` / `clampYaw` abstraction with independent axis constraints.
2. Remove the forced `globe.rotation.z = ...` line so Z is genuinely free.
3. Ensure drag, hover and automatic node focus use the same X/Y caps; do not leave one path unbounded.

```js
const maxFocusX = Math.PI * 0.20;
const maxFocusY = Math.PI * 0.05;
const clampX = (value) => Math.max(-maxFocusX, Math.min(maxFocusX, value));
const clampY = (value) => Math.max(-maxFocusY, Math.min(maxFocusY, value));
```

## Task 2: Calculate focus from the globe's current orientation

**Files:**
- Modify: `js/pem.js`, `createMarsGlobe()` focus API.

1. Take the selected node's stored local vector.
2. Transform it by the globe's current quaternion to obtain its present world direction.
3. Build the shortest rotation from that direction to the front-facing target `(0, 0, 1)`.
4. Compose that rotation with the globe's current quaternion to obtain the unconstrained desired orientation.

This prevents the current error: calculating focus from a node's original position while ignoring where the globe already is.

## Task 3: Clamp the resulting orientation deliberately

**Files:**
- Modify: `js/pem.js`.

1. Convert the desired quaternion to an Euler representation using the same declared rotation order as the mesh.
2. Clamp only the target X and Y components using Task 1 limits.
3. Preserve the calculated Z component.
4. Convert that constrained Euler target back into a target quaternion.

```js
const desiredEuler = new THREE.Euler().setFromQuaternion(desiredQuaternion, globe.rotation.order);
desiredEuler.x = clampX(desiredEuler.x);
desiredEuler.y = clampY(desiredEuler.y);
// desiredEuler.z is intentionally unchanged.
targetQuaternion.setFromEuler(desiredEuler);
```

## Task 4: Smoothly rotate only the mesh

**Files:**
- Modify: `js/pem.js` animation loop.

1. On node click, start or replace a `globe.quaternion.slerp(targetQuaternion, factor)` transition.
2. Stop when the angular distance is below a small threshold.
3. A manual drag cancels the focus animation; a click on a second node replaces the target.
4. Continue calling `updatePlanetNodePositions()` each frame so all HTML buttons follow their actual 3D vectors.

## Task 5: Verify behavior against both geometry and constraints

**Files:**
- Temporary verification only: `%LOCALAPPDATA%/Temp/hermes-verify-*.py` or `.js`.

1. Assert each focus target has `abs(x) <= π×0.20`, `abs(y) <= π×0.05`, and preserves the target Z rotation.
2. Test all six node vectors from neutral and non-neutral starting orientations.
3. Confirm the clicked node gets as close to the visual center as the caps permit; do not claim exact centering when a clamp prevents it.
4. Run `node --check js/pem.js`, verify six `Mapa-Globo` references, and run `git diff --check`.
5. Report as **ad-hoc verification**, not a canonical suite.

## Open decision

A 5% Y cap ($\pm18^\circ$) means nodes requiring more horizontal yaw cannot land exactly at center. Implementation needs one explicit behavior: either stop at the constrained nearest orientation, or redistribute node longitudes so all six live within that reachable yaw window.
