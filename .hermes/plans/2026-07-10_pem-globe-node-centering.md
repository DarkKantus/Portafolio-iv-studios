# PeM Globe Node Centering Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Make a click on any globe node rotate the actual Three.js wireframe sphere so that node's fixed 3D surface coordinate lands at the visual center of the globe.

**Architecture:** Keep the nodes attached to their existing latitude/longitude vectors and continue projecting those vectors every animation frame. Replace the current independent X/Y angle approximation with a quaternion target: compute the selected node's current world direction, calculate the quaternion that rotates it to the camera-facing vector `(0, 0, 1)`, compose that with the sphere's current quaternion, and slerp the globe toward it. HTML node positions remain derived from the same transformed vectors.

**Tech Stack:** Vanilla JavaScript, Three.js r128, existing `createMarsGlobe()` / `updatePlanetNodePositions()` in `js/pem.js`.

---

## Current diagnosis

The present `focusVector()` derives Euler X/Y values from a node's *unrotated local vector*. That does not account for the globe's current quaternion or Three.js Euler order, so it can rotate to an orientation that does not put the selected point at the camera-facing center.

The axis cap/focus-lock workaround must not dictate the geometry. First make the 3D transform exact; any later UX limit must be applied only if it preserves the required centering behavior.

## Task 1: Define a geometry regression harness before changing behavior

**Objective:** Prove the targeting transform places every fixture node at the camera-facing center after arbitrary prior globe rotations.

**Files:**
- Create temporarily under `%LOCALAPPDATA%/Temp` with `hermes-verify-` prefix; do not keep in repo.
- Read: `js/pem.js`

**Step 1: Prepare six fixture vectors**

Use the current six `data-lat`/`data-lon` values from `pem.html`, plus at least three non-zero starting globe rotations.

**Step 2: Assert the target condition**

For each fixture, apply the same target quaternion used by production code and assert:

```js
const finalDirection = localNode.clone().applyQuaternion(targetQuaternion).normalize();
assert(Math.abs(finalDirection.x) < 1e-6);
assert(Math.abs(finalDirection.y) < 1e-6);
assert(finalDirection.z > 0.999999);
```

**Expected red state:** the current Euler-based focus implementation cannot satisfy this after arbitrary initial rotations.

## Task 2: Give the globe controller a quaternion focus API

**Objective:** Expose a deliberate `focusNode(localVector)` method from `createMarsGlobe()`.

**Files:**
- Modify: `js/pem.js` inside `createMarsGlobe()`.

**Implementation shape:**

```js
const focusQuaternion = new THREE.Quaternion();
const targetQuaternion = new THREE.Quaternion();
let isFocusingNode = false;

function focusNode(localVector) {
  const currentDirection = localVector.clone()
    .applyQuaternion(globe.quaternion)
    .normalize();
  const cameraFacing = new THREE.Vector3(0, 0, 1);

  focusQuaternion.setFromUnitVectors(currentDirection, cameraFacing);
  targetQuaternion.copy(focusQuaternion).multiply(globe.quaternion);
  isFocusingNode = true;
}
```

Use a dedicated target quaternion, not ad-hoc `rotation.x` / `rotation.y` assignments. Do not mutate the node vector itself.

## Task 3: Slerp only the globe toward the target orientation

**Objective:** Rotate the mesh smoothly without relocating UI nodes independently.

**Files:**
- Modify: `js/pem.js` animation loop in `createMarsGlobe()`.

**Implementation shape:**

```js
if (isFocusingNode) {
  globe.quaternion.slerp(targetQuaternion, 0.10);
  if (globe.quaternion.angleTo(targetQuaternion) < 0.001) {
    globe.quaternion.copy(targetQuaternion);
    isFocusingNode = false;
  }
} else {
  // Existing drag behavior only.
}
```

Keep `globe.rotation.z` stable by not introducing roll. The shortest-arc quaternion from node direction to `(0,0,1)` naturally has no arbitrary UI-axis hack.

Manual drag should cancel `isFocusingNode`; clicking a different node while a prior focus animation is running should replace the target immediately.

## Task 4: Wire node selection to the new API

**Objective:** Ensure selecting any of the six existing node buttons targets its real stored vector.

**Files:**
- Modify: `js/pem.js` node click listener near `planetNodes.forEach(...)`.

**Change:**

```js
largeGlobe?.focusNode(nodeVectors.get(node));
```

Leave the card/image update and `has-planet-selection` behavior intact. The node remains positioned by `updatePlanetNodePositions()`; no CSS `left`/`top` animation or artificial centering is introduced.

## Task 5: Remove the incorrect Euler focus workaround

**Objective:** Avoid two rotation systems fighting each other.

**Files:**
- Modify: `js/pem.js`.

**Remove or supersede:**
- the current `focusVector()` Euler-angle calculation;
- `focusLocked` if quaternion focus state replaces it;
- 20% X/Y focus clamping if it prevents actual node centering.

**Preserve:**
- Small globe auto-spin.
- Large globe manual drag.
- No Z/roll behavior.
- Node projection every frame.

## Task 6: Verify exact behavior and integration

**Objective:** Validate geometry, syntax, references, and non-regression.

**Files:**
- Temporary `%LOCALAPPDATA%/Temp/hermes-verify-*.py` or `.js` only.

**Checks:**
1. Run the Task 1 geometry harness against all six node vectors and multiple initial quaternions.
2. Run `node --check js/pem.js`.
3. Confirm the six `data-node-image` paths in `pem.html` exist.
4. Run `git diff --check`.
5. Manually inspect in browser:
   - select a node from the initial globe orientation;
   - select another after the first animation completes;
   - select a third while animation is still in progress;
   - drag after focus, then select another node.

Report these as **ad-hoc verification**, not a canonical suite.

## Risks / open question

There is one design decision to confirm before implementation: should manual drag remain effectively free after a node focus, or should the globe be reset to a neutral orientation when the module opens? Neither affects the centering algorithm; the current behavior can preserve the user's last orientation.
