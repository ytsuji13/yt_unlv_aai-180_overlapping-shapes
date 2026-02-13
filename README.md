# Overlapping Shapes Visualization (Trial 4)

## Goals
The primary goal of this application is to **visually demonstrate the effect of line weight on depth perception** in a 2D medium. By varying the thickness of lines based on their "Z-elevation" (distance from the viewer), we create a sense of three-dimensional space.

## How to Run
Simply open `index.html` in your web browser.

## Key Features
-   **Depth Simulation**: 20 distinct tiers of depth are simulated.
-   **Comparison**: A split-screen view allows direct comparison between depth-graded linework and uniform linework.
-   **Random Generation**: Shapes are procedurally generated using Python to ensure unbiased random distribution.

## How It Works

### 1. Data Generation (JavaScript)
-   Shapes are generated dynamically in `main.js`.
-   150 random polygons (triangles or quads) are created on each load.
-   Each shape is assigned a randomized **Z-elevation** between **0 and 1000**.
-   **Z=1000** represents the "foreground" (closest to viewer).
-   **Z=0** represents the "background" (furthest from viewer).
-   The Python script `generate_shapes.py` is included for reference/offline generation but not used by the web view.

### 2. Visualization (`main.js` & `renderer.js`)
The application renders the exact same set of shapes on two canvases:

#### Left Canvas: Depth Graded
-   **Line Weight**: Varies from **0.1px** (background) to **1.5px** (foreground).
-   **Tiers**: The 0-1000 Z-range is divided into **20 tiers** (steps of 50 units).
-   **Visual Logic**:
    -   Shapes with higher Z-values have thicker lines.
    -   Shapes are drawn in order from lowest Z to highest Z (Painter's Algorithm) so closer shapes overlap and obscure those behind them.
    -   Opaque white fill ensures the overlap is visible.

#### Right Canvas: Uniform
-   **Line Weight**: Fixed at **0.5px** (the thinnest weight) for all shapes.
-   **Purpose**: Demonstrates that without line weight variation, the sense of depth is significantly flatter, relying solely on overlap.
