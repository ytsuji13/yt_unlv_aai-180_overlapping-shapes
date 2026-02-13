document.addEventListener('DOMContentLoaded', () => {
    // Initial generation and render
    regenerateAndRender();

    // Event listener for the regenerate button
    document.getElementById('regenerateBtn').addEventListener('click', regenerateAndRender);
});

function regenerateAndRender() {
    const shapes = generateShapes();
    renderDepthCanvas(shapes);
    renderUniformCanvas(shapes);
}

function generateShapes() {
    const shapes = [];
    const numShapes = 75;
    const width = 800; // Canvas logical width
    const height = 600; // Canvas logical height

    for (let i = 0; i < numShapes; i++) {
        const x = 50 + Math.random() * (width - 100);
        const y = 50 + Math.random() * (height - 100);
        const size = 30 + Math.random() * 70; // Size between 30 and 100
        const isTriangle = Math.random() < 0.5;
        const numPoints = isTriangle ? 3 : 4;

        // Generate random angles for points
        let angles = [];
        for (let j = 0; j < numPoints; j++) {
            angles.push(Math.random() * 2 * Math.PI);
        }
        // Sort angles to ensure convex polygon structure around the center
        angles.sort((a, b) => a - b);

        const points = [];
        for (let angle of angles) {
            // Random radius variation for irregular shape
            const r = size * (0.5 + Math.random() * 0.5);
            points.push({
                x: x + r * Math.cos(angle),
                y: y + r * Math.sin(angle)
            });
        }

        shapes.push({
            id: i,
            z: Math.floor(Math.random() * 1001), // Z from 0 to 1000
            points: points
        });
    }

    // Sort by Z (lowest to highest) for Painter's Algorithm
    shapes.sort((a, b) => a.z - b.z);

    return shapes;
}

function renderDepthCanvas(shapes) {
    const canvas = document.getElementById('depthCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
        // Calculate line width based on Z
        // 20 tiers from 0 to 1000. Step = 50.
        // Tier 0: 0-49, Tier 1: 50-99... Tier 19: 950-1000
        // Line weight varies from 0.1px (background) to 1.0px (foreground)

        let tier = Math.min(19, Math.floor(shape.z / 50));

        // Map tier 0-19 to width 0.1-1.0
        // 0.1 + (tier / 19) * (1.0 - 0.1)
        let lineWidth = 0.1 + (tier / 19) * 0.9;

        drawShape(ctx, shape, lineWidth);
    });
}

function renderUniformCanvas(shapes) {
    const canvas = document.getElementById('uniformCanvas');
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach(shape => {
        drawShape(ctx, shape, 0.5); // Uniform line weight
    });
}

function drawShape(ctx, shape, lineWidth) {
    if (!shape.points || shape.points.length === 0) return;

    ctx.beginPath();
    ctx.moveTo(shape.points[0].x, shape.points[0].y);
    for (let i = 1; i < shape.points.length; i++) {
        ctx.lineTo(shape.points[i].x, shape.points[i].y);
    }
    ctx.closePath();

    // Fill with opaque white
    ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
    ctx.fill();

    // Stroke with black
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.stroke();
}
