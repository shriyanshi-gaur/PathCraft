const gridContainer = document.getElementById("grid");
const numRows = 30;
const numCols = 30;

let startCell = null;
let endCell = null;

// Create Grid
function createGrid() {
  gridContainer.innerHTML = "";

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", () => {
        const isWeightMode = document.getElementById("weightMode").checked;

        if (cell === startCell || cell === endCell) return;

        if (!startCell) {
          cell.classList.add("start");
          startCell = cell;
        } else if (!endCell) {
          cell.classList.add("end");
          endCell = cell;
        } else {
          if (isWeightMode) {
            cell.classList.remove("wall");
            cell.classList.toggle("weight");
          } else {
            cell.classList.remove("weight");
            cell.classList.toggle("wall");
          }
        }
      });

      gridContainer.appendChild(cell);
    }
  }
}

// Get neighbors (4-directional)
function getNeighbors(cell) {
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  const neighbors = [];

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];

  for (let [dr, dc] of directions) {
    const newRow = row + dr;
    const newCol = col + dc;
    if (
      newRow >= 0 && newRow < numRows &&
      newCol >= 0 && newCol < numCols
    ) {
      const neighbor = document.querySelector(
        `.cell[data-row="${newRow}"][data-col="${newCol}"]`
      );
      if (!neighbor.classList.contains("wall")) {
        neighbors.push(neighbor);
      }
    }
  }
  return neighbors;
}

// Heuristic (Manhattan Distance)
function heuristic(a, b) {
  const rowA = parseInt(a.dataset.row);
  const colA = parseInt(a.dataset.col);
  const rowB = parseInt(b.dataset.row);
  const colB = parseInt(b.dataset.col);
  return Math.abs(rowA - rowB) + Math.abs(colA - colB);
}

// Get cell cost
function getCellCost(cell) {
  return cell.classList.contains("weight") ? 5 : 1;
}

// Path reconstruction
function reconstructPath(cameFrom, current) {
  let temp = current;
  let cost = 0;
  while (cameFrom.has(temp)) {
    temp = cameFrom.get(temp);
    if (!temp.classList.contains("start")) {
      temp.classList.add("path");
      cost += getCellCost(temp);
    }
  }
  document.getElementById("pathCost").textContent = cost;
}

// Speed control
function getSpeed() {
  const speed = document.getElementById("speedRange").value;
  return 110 - speed;
}

document.getElementById("speedRange").addEventListener("input", function () {
  document.getElementById("speedValue").textContent = this.value;
});

// A* Algorithm
function runAStar() {
  let openSet = [startCell];
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();
  const visited = new Set();
  let visitedCount = 0;

  gScore.set(startCell, 0);
  fScore.set(startCell, heuristic(startCell, endCell));
  document.getElementById("visitedCount").textContent = 0;

  let interval = setInterval(() => {
    if (openSet.length === 0) {
      clearInterval(interval);
      alert("No path found.");
      return;
    }

    openSet.sort((a, b) => fScore.get(a) - fScore.get(b));
    const current = openSet.shift();

    if (current === endCell) {
      clearInterval(interval);
      reconstructPath(cameFrom, current);
      return;
    }

    if (!current.classList.contains("start")) {
      current.classList.add("visited");
    }

    visitedCount++;
    document.getElementById("visitedCount").textContent = visitedCount;

    for (let neighbor of getNeighbors(current)) {
      const tempG = (gScore.get(current) || Infinity) + getCellCost(neighbor);
      if (tempG < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tempG);
        fScore.set(neighbor, tempG + heuristic(neighbor, endCell));
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }, getSpeed());
}

// Dijkstra Algorithm
function runDijkstra() {
  const distances = new Map();
  const cameFrom = new Map();
  const unvisited = [];
  let visitedCount = 0;
  document.getElementById("visitedCount").textContent = 0;

  for (let cell of document.querySelectorAll(".cell")) {
    distances.set(cell, Infinity);
    unvisited.push(cell);
  }
  distances.set(startCell, 0);

  let interval = setInterval(() => {
    if (unvisited.length === 0) {
      clearInterval(interval);
      alert("No path found.");
      return;
    }

    unvisited.sort((a, b) => distances.get(a) - distances.get(b));
    const current = unvisited.shift();

    if (current === endCell) {
      clearInterval(interval);
      reconstructPath(cameFrom, current);
      return;
    }

    if (!current.classList.contains("start")) {
      current.classList.add("visited");
    }

    visitedCount++;
    document.getElementById("visitedCount").textContent = visitedCount;

    for (let neighbor of getNeighbors(current)) {
      let tempDist = distances.get(current) + getCellCost(neighbor);
      if (tempDist < distances.get(neighbor)) {
        distances.set(neighbor, tempDist);
        cameFrom.set(neighbor, current);
      }
    }
  }, getSpeed());
}

// BFS Algorithm
function runBFS() {
  const queue = [startCell];
  const cameFrom = new Map();
  const visited = new Set();
  visited.add(startCell);
  let visitedCount = 0;
  document.getElementById("visitedCount").textContent = 0;

  let interval = setInterval(() => {
    if (queue.length === 0) {
      clearInterval(interval);
      alert("No path found.");
      return;
    }

    const current = queue.shift();

    if (current === endCell) {
      clearInterval(interval);
      reconstructPath(cameFrom, current);
      return;
    }

    if (!current.classList.contains("start")) {
      current.classList.add("visited");
    }

    visitedCount++;
    document.getElementById("visitedCount").textContent = visitedCount;

    for (let neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        cameFrom.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }, getSpeed());
}

// DFS Algorithm
function runDFS() {
  const stack = [startCell];
  const cameFrom = new Map();
  const visited = new Set();
  visited.add(startCell);
  let visitedCount = 0;
  document.getElementById("visitedCount").textContent = 0;

  let interval = setInterval(() => {
    if (stack.length === 0) {
      clearInterval(interval);
      alert("No path found.");
      return;
    }

    const current = stack.pop();

    if (current === endCell) {
      clearInterval(interval);
      reconstructPath(cameFrom, current);
      return;
    }

    if (!current.classList.contains("start")) {
      current.classList.add("visited");
    }

    visitedCount++;
    document.getElementById("visitedCount").textContent = visitedCount;

    for (let neighbor of getNeighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        cameFrom.set(neighbor, current);
        stack.push(neighbor);
      }
    }
  }, getSpeed());
}

// Start pathfinding
function startPathfinding() {
  if (!startCell || !endCell) {
    alert("Please set both start and end points.");
    return;
  }

  resetPathOnly();

  const algorithm = document.getElementById("algorithm-select").value;
  if (algorithm === "astar") runAStar();
  else if (algorithm === "dijkstra") runDijkstra();
  else if (algorithm === "bfs") runBFS();
  else if (algorithm === "dfs") runDFS();
}

// Reset grid completely
function resetGrid() {
  startCell = null;
  endCell = null;
  document.getElementById("visitedCount").textContent = 0;
  document.getElementById("pathCost").textContent = 0;
  createGrid();
}

// Reset visited and path only
function resetPathOnly() {
  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("visited", "path");
  });
  document.getElementById("visitedCount").textContent = 0;
  document.getElementById("pathCost").textContent = 0;
}

// Initialize grid on load
window.onload = createGrid;
