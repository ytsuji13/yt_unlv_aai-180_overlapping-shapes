import json
import random

def generate_shapes():
    shapes = []
    width = 800
    height = 600

    for _ in range(75):
        # Generate random position
        x = random.randint(50, width - 50)
        y = random.randint(50, height - 50)

        # Generate random size
        size = random.randint(30, 100)

        # Triangles or Quads
        num_points = random.choice([3, 4])
        points = []
        for _ in range(num_points):
            angle = random.uniform(0, 2 * 3.14159)
            px = x + size * 0.5 * random.uniform(0.5, 1.5) * (random.choice([-1, 1]) if random.random() < 0.5 else 1) # simple random offset
            # Better approach for convex shapes around a center
            # Let's just do random offsets from center for now, or use polar coordinates
            # A simple way to get a convex polygon is to sort points by angle, but let's stick to simple relative offsets for this demo
            # Or just generating points around a circle with some noise
            pass
        
        # Actually let's use a simpler method for nice looking shapes
        # Generate points in polar coordinates
        angles = sorted([random.uniform(0, 2 * 3.14159) for _ in range(num_points)])
        points = []
        for angle in angles:
             r = size * random.uniform(0.5, 1.0)
             px = x + r * 1.0 # Using simplified interaction for now, need math lib for cos/sin but let's just use simple offsets
             # Wait, standard imports only.
             # let's write it properly with math
             pass

    # Let's restart the logic with proper imports and structure
    pass

import math

def generate_polygon(x, y, size, num_points):
    angles = sorted([random.uniform(0, 2 * math.pi) for _ in range(num_points)])
    points = []
    for angle in angles:
        r = size * random.uniform(0.5, 1.0)
        px = x + r * math.cos(angle)
        py = y + r * math.sin(angle)
        points.append({"x": px, "y": py})
    return points

def main():
    shapes = []
    width = 800
    height = 600

    for i in range(75):
        x = random.randint(50, width - 50)
        y = random.randint(50, height - 50)
        size = random.randint(30, 100)
        num_points = random.choice([3, 4])
        
        points = generate_polygon(x, y, size, num_points)
        z = random.randint(0, 1000)
        
        shapes.append({
            "id": i,
            "z": z,
            "points": points
        })

    # Sort shapes by Z (Painter's Algorithm preparation, though client can also sort)
    # The README says "Shapes are drawn in order from lowest Z to highest Z".
    # It's helpful to pre-sort them here or in JS. Let's not pre-sort to strictly follow "Data Generation" outputting raw data, 
    # but actually, JSON arrays have order. Let's just save them.
    # Actually wait, if we want to ensure unbiased random distribution, random Z is fine.
    # Sorting in JS is typical for rendering.

    with open('shapes.json', 'w') as f:
        json.dump(shapes, f, indent=2)
    
    print("Generated 75 shapes in shapes.json")

if __name__ == "__main__":
    main()
