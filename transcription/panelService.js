const { Threshold } = require("konva/lib/filters/Threshold");

// A function to calculate the slope of a line segment given two points
const slope = (p1, p2) => {
    // If the x-coordinates are equal, return Infinity
    if (p1[0] === p2[0]) return Infinity;
    // Otherwise, return the slope as (y2 - y1) / (x2 - x1)
    return (p2[1] - p1[1]) / (p2[0] - p1[0]);
};

// A function to check if three points are collinear with some tolerance
const epsilon = 2; // You can adjust this value as per your requirement
const collinear = (p1, p2, p3) => {

    // If the absolute difference between the slopes of the segments p1-p2 and p2-p3 is less than epsilon, return true
    return Math.abs(slope(p1, p2) - slope(p2, p3)) < epsilon;
};

const findCloseVerticeY = (vertices) => {
    vertices.sort()
}

const isIntersection = (vertices, { x1, y1, x2, y2 }) => {
    const threshold = 5

    vertices.filter((v => {
        if ((v[0] >= x - threshold || v[0] <= x + threshold) &&
            (v[1] >= y - threshold || v[1] <= y + threshold)) {
        }
    }))
}



// function to get the vertices that have the same value as the given vertice within the threshold
const getSameLineVertices = (vertice, vertices, threshold, index) => {
    let sameLineVertices = [] // array to store the vertices that have the same value
    for (let i = 0; i < vertices.length; i++) {
        const otherVertice = vertices[i]
        // check if the value of the other vertice is within the threshold of the given vertice
        const isSame = Math.abs(vertice[index] - otherVertice[index]) <= threshold
        if (isSame) {
            // add the other vertice to the array
            sameLineVertices.push(otherVertice)
        }

    }
    // return the array of vertices that have the same value
    return sameLineVertices
}

// function to get the maximum and minimum values of an array of vertices
const distanceVertice = (vertices, index) => {
    let maxVertice = vertices[0] // initialize the maximum value with the first vertice
    let minVertice = vertices[0] // initialize the minimum value with the first vertice
    for (let i = 1; i < vertices.length; i++) {
        const vertice = vertices[i]
        // check if the value of the current vertice is greater than the maximum value
        if (vertice[index] > maxVertice[index]) {
            // update the maximum value with the current vertice
            maxVertice = vertice
        }
        // check if the value of the current vertice is less than the minimum value
        if (vertice[index] < minVertice[index]) {
            // update the minimum value with the current vertice
            minVertice = vertice
        }
    }
    // return an object with the maximum and minimum values
    return { maxVertice, minVertice }
}

// function to check if a pair of maximum and minimum values are within a bbox's borders within a threshold 
const isMaxAndMinBorders = (bbox, maxVertice, minVertice, threshold, index) => {
    const border1 = bbox[index] // get one border from bbox object 
    const border2 = bbox[index + 2] // get another border from bbox object 
    // check if maxVerticex.value is within threshold of either border 
    const isMaxBorder = Math.abs(maxVertice[index] - border1) <= threshold || Math.abs(maxVertice[index] - border2) <= threshold
    // check if minVertex.value is within threshold of either border 
    const isMinBorder = Math.abs(minVertice[index] - border1) <= threshold || Math.abs(minVertice[index] - border2) <= threshold
    // return true if both are true, false otherwise 
    return isMaxBorder && isMinBorder
}

// function to get the vertices that are between the maximum and minimum values of an array of vertices
const getBetween = (maxVertice, minVertice, vertices, threshold, index) => {
    let verticesBetween = [] // array to store the vertices that are between the maximum and minimum values
    for (let i = 0; i < vertices.length; i++) {
        const vertice = vertices[i]
        // check if the vertice is not the same as the maximum or minimum value
        if (vertice !== maxVertice && vertice !== minVertice) {
            // check if the vertice is within the threshold of the maximum and minimum value
            if (vertice[index] >= minVertice[index] - threshold && vertice[index] <= maxVertice[index] + threshold) {
                // add the verticex to the array
                verticesBetween.push(vertice)
            }
        }
    }
    // return the array of vertices that are between the maximum and minimum values
    return verticesBetween
}


const isOnPointY = (point, vertices, minDistance) => {

}



const isOnPointX = (minDistance) => {

}

const isPointBorder = (point, bbox, threshold = 8) => {

    // check if maxVerticex.value is within threshold of either border 
    const isPointBorderX = Math.abs(point[0] - bbox[0]) <= threshold ||
        Math.abs(point[0] - bbox[0 + 2]) <= threshold
    const isPointBorderY = Math.abs(point[1] - bbox[1]) <= threshold ||
        Math.abs(point[1] - bbox[1 + 2]) <= threshold

    return isPointBorderX || isPointBorderY
}

const getLinePointsX = (point, vertices, threshold = 8) => {
    const lineVertices = []
    for (const v of vertices) {
        if (Math.abs(v[1] - point[1]) <= threshold) {
            lineVertices.push(v)
        }
    }
    return lineVertices
}

const getLinePointsY = (point, vertices, threshold = 8) => {
    const lineVertices = []
    for (const v of vertices) {
        if (Math.abs(v[0] - point[0]) <= threshold) {
            lineVertices.push(v)
        }
    }
    return lineVertices
}

const betweenPointsX = (point1, point2, points, threshold = 8) => {
    // point [[0,0]]
    let result = [];
    for (const p of points) {
        // calculate the area of the triangle formed by point1, point2 and p
        if (Math.abs(point1[1] - p[1]) <= threshold && Math.abs(point2[1] - p[1]) <= threshold) {
            if (point1[0] < p[0] && point2[0] > p[0]) {
                result.push(p)
            }
        }
    }
    return result;
};
const betweenPointsY = (point1, point2, points, threshold = 8) => {
    // point [[0,0]]
    let result = [];
    for (const p of points) {
        // calculate the area of the triangle formed by point1, point2 and p
        if (Math.abs(point1[0] - p[0]) <= threshold && Math.abs(point2[0] - p[0]) <= threshold) {
            if (point1[1] < p[1] && point2[1] > p[1]) {
                result.push(p)
            }
        }
    }
    return result;
};


const createPanelFromVertices = (vertices) => {
    // vertices = [[0,0]]
    // initialize the bounding box values with the first vertex
    let x1 = vertices[0][0];
    let x2 = vertices[0][0];
    let y1 = vertices[0][1];
    let y2 = vertices[0][1];
    // loop through the rest of the vertices and update the bounding box values
    for (let i = 1; i < vertices.length; i++) {
        x1 = Math.min(x1, vertices[i][0]); // update the minimum x value
        x2 = Math.max(x2, vertices[i][0]); // update the maximum x value
        y1 = Math.min(y1, vertices[i][1]); // update the minimum y value
        y2 = Math.max(y2, vertices[i][1]); // update the maximum y value
    }
    // return the bounding box as an array
    return { x1, x2, y1, y2, vertices };
};


const findBorderVertices = (vertices, { x1, y1, x2, y2 }) => {
    const allBetweensVerticesX = []
    const allBetweensVerticesY = []

    for (const vertice of vertices) {
        if (isPointBorder(vertice, [x1, y1, x2, y2])) {
            const linePointsX = getLinePointsX(vertice, vertices, 10)
            const lastPointX = linePointsX.sort((a, b) => b[0] - a[0])[0]
            if (lastPointX != vertice) {
                const foundPoints = betweenPointsX(vertice, lastPointX, vertices)
                allBetweensVerticesX.push({ point1: vertice, poin2: lastPointX, points: foundPoints })
            }

            const linePointsY = getLinePointsY(vertice, vertices, 10)
            const lastPointY = linePointsY.sort((a, b) => b[1] - a[1])[0]
            if (lastPointX != vertice) {
                const foundPoints = betweenPointsY(vertice, lastPointY, vertices)
                allBetweensVerticesY.push({ point1: vertice, poin2: lastPointY, points: foundPoints })

            }
        }
    }



    // find the four points that are at the corners of the bbox

    // return an array with the four border vertices
    return [allBetweensVerticesX, allBetweensVerticesY]
}


const createPanel = (vertices) => {
    // Initialize the x1, y1, x2, y2 variables with the first vertex


    let [x1, y1] = vertices[0];
    let [x2, y2] = vertices[0];
    // Loop through the rest of the vertices and update the variables accordingly
    for (let i = 1; i < vertices.length; i++) {
        let [x, y] = vertices[i];
        if (x < x1) x1 = x;
        if (y < y1) y1 = y;
        if (x > x2) x2 = x;
        if (y > y2) y2 = y;
    }
    // Return an object with the x1, y1, x2, y2, and vertices properties
    return {
        x1,
        y1,
        x2,
        y2,
        vertices
    };
};


const splitPanels = (chapters) => {
    // Use map to iterate over the chapters and return a new array of chapters with new panels
    return chapters.map(({ pages, ...rest }) => {
        // Use map to iterate over the pages and return a new array of pages with new panels
        return {
            ...rest,
            pages: pages.map(({ panels, ...rest },index) => {
                // Use reduce to create a new array of panels that contains both the original panels and the new panels
                return {
                    ...rest,
                    panels: panels.reduce((acc, panel) => {
                        // Find the convex hull and the concave points of the panel
                        const { vertices, x1, x2, y1, y2 } = panel; // [[0,0]]
                        const result =  splitPanel(vertices, { x1, x2, y1, y2 })
                        if(!result){
                            return acc.concat({...panel})
                        }
                        const {splitPanels,target,dents} = result
                        if (splitPanels && splitPanels.length == 2) {
                            const panels = []
                            if (splitPanels[0].length > 0) {
                                const panel1 = createPanelFromVertices(splitPanels[0])
                                 if(Math.abs(panel1.y1 - panel1.y2) > 100 && Math.abs(panel1.x1 - panel1.x2) > 100){
                                    panels.push({...panel1,target,dents})
                                 }
                            }
                            if (splitPanels[1].length > 0) {
                                const panel2 = createPanelFromVertices(splitPanels[1])
                                if(Math.abs(panel2.y1 - panel2.y2) > 100 && Math.abs(panel2.x1 - panel2.x2) > 100){
                                    panels.push({...panel2,target,dents})
                                 }
                            }
                            if(panels.length == 2)
                                return acc.concat([...panels])
                        }
                        return acc.concat({...panel,target,dents})


                    }, []).flat(), // Use flat to flatten the nested array of panels
                };
            }),
        };
    });
};





// Define a function that takes an array of vertices as input and returns two arrays of vertices that represent the two parts of the split panel





// Define a function that takes an array of vertices as input and returns two arrays of vertices that represent the two parts of the split panel
function splitPanel(vertices, { x1, x2, y1, y2 }) {


    const getBorderVertices = (vertices, { x1, x2, y1, y2 }, threshold = 8) => {
        // initialize four empty arrays to store the border vertices
        let top = [];
        let left = [];
        let right = [];
        let bottom = [];

        // loop through the vertices array
        for (let vertex of vertices) {
            // get the x and y coordinates of the vertex
            let x = vertex[0];
            let y = vertex[1];

            // check if the vertex is close to the top border of the rectangle
            if (Math.abs(y - y1) <= threshold) {
                // add the vertex to the top array
                top.push(vertex);
            }

            // check if the vertex is close to the left border of the rectangle
            if (Math.abs(x - x1) <= threshold) {
                // add the vertex to the left array
                left.push(vertex);
            }

            // check if the vertex is close to the right border of the rectangle
            if (Math.abs(x - x2) <= threshold) {
                // add the vertex to the right array
                right.push(vertex);
            }

            // check if the vertex is close to the bottom border of the rectangle
            if (Math.abs(y - y2) <= threshold) {
                // add the vertex to the bottom array
                bottom.push(vertex);
            }
        }

        // return the four arrays of border vertices
        return [top, left, right, bottom];
    };



    if (vertices.length < 3) {
        
        return null;
    }
    // Find the indices of the dents using the cross product method
    let dents = findDents(vertices);
    // If there are no dents, the polygon is already convex and nothing needs to be done
    if (dents.length === 0) {
        
        return [vertices];
    }

    const [top, left, right, bottom] = getBorderVertices(vertices, { x1, x2, y1, y2 })

    const dentsInsideBbbox = dents.filter(dent => {
        // Get the x and y coordinates of the dent
        let x = dent[0];
        let y = dent[1];
        // Check if the dent is inside the bbox with a threshold of 10
        return Math.abs(x - x1) > 10 && Math.abs(x - x2) > 10 && Math.abs(y - y1) > 10 && Math.abs(y - y2) > 10;
    });


    // Initialize variables to store the indices of the minDent and maxDent vertices
    const targetX = dentsInsideBbbox.filter((dent => {
        const ldl = left.find(dl => Math.abs(dl[1] - dent[1]) <= 8)
        const rdl = right.find(dl => Math.abs(dl[1] - dent[1]) <= 8)

        if (ldl || rdl) {
            return true
        }
    }))[0]

    const targetY = dentsInsideBbbox.filter((dent => {
        const ldl = top.find(dl => Math.abs(dl[0] - dent[0]) <= 8)
        const rdl = bottom.find(dl => Math.abs(dl[0] - dent[0]) <= 8)

        if (ldl || rdl) {
            return true
        }
    }))[0]

    const target = targetX || targetY;
    if (!target) {
        return null
    }
    // Complete the code

    // Check if the target dent exists
    const panelVertices1 = []
    const panelVertices2 = []
    const targetsX = dents.filter((dent => {
        const ldl = left.find(dl => Math.abs(dl[1] - dent[1]) <= 8)
        const rdl = right.find(dl => Math.abs(dl[1] - dent[1]) <= 8)

        if (ldl || rdl) {
            return true
        }
    }))
    const targetsY = dents.filter((dent => {
        const ldl = top.find(dl => Math.abs(dl[0] - dent[0]) <= 8)
        const rdl = bottom.find(dl => Math.abs(dl[0] - dent[0]) <= 8)

        if (ldl || rdl) {
            return true
        }
    }))
    
    for(const vertex of vertices){
        if(targetX){
            if(vertex[1] < targetX[1]){
                panelVertices1.push(vertex)
                continue
            }
            panelVertices2.push(vertex)
            continue
        }
        if(targetY){
            if(vertex[0] < targetY[0]){
                panelVertices1.push(vertex)
                continue
            }
            panelVertices2.push(vertex)
            continue
        }
    }


    


    return {splitPanels:[panelVertices1,panelVertices2],target:[targetsY,targetsX],dents}
}



// Define a function that takes an array of vertices as input and returns true if the polygon is convex, false if concave, and null if invalid
function findDents(vertices) {

    // Check if the input is valid
    if (vertices.length < 3) {
        
        return null;
    }
    // Initialize an empty array to store the indices of the dents
    let dents = [];
    // Initialize the sign of the previous cross product
    let prevSign = null;
    // Loop through all the vertices
    for (let i = 0; i < vertices.length; i++) {
        // Get the current vertex and the next two vertices
        let curr = vertices[i];
        let next = vertices[(i + 1) % vertices.length];
        let next2 = vertices[(i + 2) % vertices.length];
        // Compute the x and y differences between the edges
        let dx1 = next[0] - curr[0];
        let dy1 = next[1] - curr[1];
        let dx2 = next2[0] - next[0];
        let dy2 = next2[1] - next[1];
        // Compute the z-component of the cross product
        let zcrossproduct = dx1 * dy2 - dy1 * dx2;
        // Check the sign of the cross product
        let currentSign = Math.sign(zcrossproduct);
        // If this is not the first vertex, compare the sign with the previous one
        if (prevSign !== null) {
            // If the signs are different, the polygon is concave and the current vertex is a dent
            if (currentSign !== prevSign) {
                // 
                // Check if the cross product is positive, meaning the edge is going inside
                if (zcrossproduct > 0) {
                    // Add the index of the vertex to the array of dents
                    dents.push(vertices[i]);
                }
            }
        }
        // Update the previous sign
        prevSign = currentSign;
    }
    // If there are no dents, the polygon is convex
    if (dents.length === 0) {
        
    }
    // Return the array of dents
    return dents;
}






// Find the convex hull of a polygon using the monotone chain algorithm
const findConvexHull = (vertices) => {
    // Sort the vertices by their x-coordinates
    vertices.sort(([aX, aY], [bX, bY]) => aX - bX || aY - bY);

    // Initialize an empty array for the hull
    const hull = [];

    // Loop through the vertices twice, once for the lower hull and once for the upper hull
    for (let i = 0; i < 2; i++) {
        // Get the starting size of the hull
        const start = hull.length;

        // Loop through the vertices in ascending or descending order
        for (let j = 0; j < vertices.length; j++) {
            // Get the current vertex
            const v = vertices[i === 0 ? j : vertices.length - 1 - j];

            // While there are at least two points in the hull and the last three points do not make a right turn
            while (hull.length - start >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], v) <= 0) {
                // Remove the last point from the hull
                hull.pop();
            }

            // Add the current vertex to the hull
            hull.push(v);
        }

        // Remove the last point from the hull to avoid duplication
        hull.pop();
    }

    // Return the convex hull
    return hull;
};

// Find the concave points of a polygon using the convex hull difference method
const findConcavePoints = (vertices) => {
    // Find the convex hull of the polygon
    const convexHull = findConvexHull(vertices);

    // Initialize an empty array for the concave points
    const concavePoints = [];

    // Loop through the vertices of the polygon
    for (let i = 0; i < vertices.length; i++) {
        // Get the current vertex and its previous and next vertices
        const v = vertices[i];
        const prev = vertices[(i + vertices.length - 1) % vertices.length];
        const next = vertices[(i + 1) % vertices.length];

        // Check if the current vertex is not on the convex hull
        if (!convexHull.includes(v)) {
            // Check if the current vertex is concave by using the cross product
            if (cross(prev, v, next) > 0) {
                // Add the current vertex to the concave points array
                concavePoints.push(v);
            }
        }
    }

    // Return the concave points
    return concavePoints;
};

// Helper function to calculate the cross product of two vectors AB and AC
const cross = (A, B, C) => {
    return (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
};


module.exports = splitPanels