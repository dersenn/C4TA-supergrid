# SUPERGRID - Console Commands & Controls

> *Note: This documentation was reconstructed with AI assistance after the original project was completed.*

This p5.js project creates an interactive grid system that can be controlled via the browser console and keyboard shortcuts. The presentation concept is to start with a blank canvas and progressively build up complexity.

## Console Commands (Browser DevTools)

Open your browser's developer console (F12 or Cmd+Option+J) to enter these commands.

### Grid Structure (`grid.set.*`)

| Command | Description | Default |
|---------|-------------|---------|
| `grid.set.c = n` | Set number of columns | 1 |
| `grid.set.r = n` | Set number of rows | 1 |
| `grid.set.depth = n` | Recursion depth for subdivide mode | 3 |
| `grid.set.chance = n` | Subdivision probability (0-100) | 30 |
| `grid.set.amp = n` | Noise amplitude multiplier | 1 |
| `grid.set.three = true/false` | Enable 3D mode with point lights | false |

**Note:** After changing `grid.set.*` values, call `grid.makeGrid()` to apply changes.

### Visual Styles (`grid.*`)

| Command | Options | Description |
|---------|---------|-------------|
| `grid.shape = '...'` | `'rect'`, `'ellipse'`, `'circle'`, `'switch'` | Shape drawn in each tile |
| `grid.fill = '...'` | `'noise'`, `'random'`, `'check'`, `'rainbow'`, `false` | Fill/color mode |
| `grid.subdivide = true/false` | - | Enable recursive grid subdivision |

**Shape descriptions:**
- `'rect'` - Rectangles filling each tile (becomes 3D boxes in three mode)
- `'ellipse'` - Ellipses fitting the tile dimensions
- `'circle'` - Circles using the shorter tile dimension
- `'switch'` - Animated circles that move within their tile (becomes spheres in three mode)

**Fill descriptions:**
- `'noise'` - Perlin noise-based grayscale
- `'random'` - Random grayscale values
- `'check'` - Checkerboard pattern (alternating black/white)
- `'rainbow'` - HSB color based on noise values
- `false` - Default black background, white foreground

### Global Settings (`set.*`)

| Command | Description | Default |
|---------|-------------|---------|
| `set.guides = true/false` | Show/hide grid guide lines | true |
| `set.orbit = true/false` | Enable mouse orbit control (drag to rotate view) | false |
| `set.fps = n` | Set frame rate | 60 |
| `set.speed = n` | Animation speed multiplier | 0.01 |

### Actions

| Command | Description |
|---------|-------------|
| `grid.makeGrid()` | Regenerate the grid with current settings |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `l` | Toggle animation loop on/off |
| `g` | Toggle grid guides |
| `o` | Toggle orbit control |
| `s` | Toggle subdivide mode |
| `f` | Toggle fill on/off |
| `r` | Reload/regenerate grid |
| `→` | Add column |
| `←` | Remove column (min 1) |
| `↓` | Add row |
| `↑` | Remove row (min 1) |

---

## Presentation Sequence

A suggested sequence of commands to demonstrate the project, building from a blank canvas to an animated 3D grid:

### Phase 1: Basic Grid Setup

```javascript
// Start with a blank black canvas (default state)
// Add rectangles to see the grid
grid.shape = 'rect'

// Build up the grid structure
grid.set.c = 2; grid.makeGrid()
grid.set.c = 4; grid.makeGrid()
grid.set.r = 2; grid.makeGrid()
grid.set.r = 4; grid.makeGrid()
```

### Phase 2: Add Color and Fill Modes

```javascript
// Try different fill modes
grid.fill = 'noise'
grid.fill = 'check'
grid.fill = 'rainbow'
```

### Phase 3: Explore Different Shapes

```javascript
// Switch to circles
grid.shape = 'circle'

// Try ellipses
grid.shape = 'ellipse'

// Animated switch mode
grid.shape = 'switch'
```

### Phase 4: Add Complexity with Subdivide

```javascript
// Enable subdivision for more complex patterns
grid.subdivide = true
grid.makeGrid()

// Adjust subdivision parameters
grid.set.depth = 4; grid.makeGrid()
grid.set.chance = 50; grid.makeGrid()
```

### Phase 5: Clean Up for 3D

```javascript
// Turn off guides for cleaner view
set.guides = false
// Or press 'g'
```

### Phase 6: Enter 3D Mode

```javascript
// Enable 3D mode (works best with 'rect' or 'switch' shapes)
grid.shape = 'rect'
grid.set.three = true

// Enable orbit control to rotate the view with mouse
set.orbit = true
// Or press 'o'
```

### Phase 7: Fine-Tuning

```javascript
// Adjust animation speed
set.speed = 0.02

// Adjust noise amplitude for more/less movement
grid.set.amp = 2; grid.makeGrid()

// Try 3D with switch shape (spheres)
grid.shape = 'switch'
```

---

## Quick Demo Sequence (Copy-Paste Ready)

```javascript
// Run these one at a time for dramatic effect:
grid.shape = 'rect'
grid.set.c = 4; grid.set.r = 4; grid.makeGrid()
grid.fill = 'rainbow'
grid.subdivide = true; grid.makeGrid()
set.guides = false
grid.set.three = true
set.orbit = true
```

---

## Tips

- The grid starts at position `(-canvasWidth/2, -canvasHeight/2)` due to WEBGL mode centering
- 3D mode adds two animated point lights (green and red) that orbit the scene
- The `'switch'` shape creates continuously animated elements using sine/cosine
- Subdivision creates a recursive grid with random tile sizes based on `chance` probability
- Press `l` to pause animation if you want to inspect a specific frame
