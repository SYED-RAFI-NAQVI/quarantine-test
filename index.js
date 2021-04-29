let findPath = (startCoordinates, grid) => {
  let distanceFromTop = startCoordinates[0];
  let distanceFromLeft = startCoordinates[1];

  // Each "location" will store its coordinates
  // and the path required to arrive there
  const location = {
    distanceFromTop,
    distanceFromLeft,
    path: [],
    status: "Start",
  };

  // Queue maintain the location, each time it updates we remove first of the queue,
  // writing queue with linked list is optimal, because its o(1) operation, but using an array is costly operation o(n),
  // we need to change every index while removing the element, o(n). In this case the worst case will be o(3), because it 2d-Array.
  let queue = [location];

  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    let currentLocation = queue.shift();

    // Explore North
    // check the line no 90 for exploreInDirection
    let newLocation = exploreInDirection(currentLocation, "North", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // Explore East
    newLocation = exploreInDirection(currentLocation, "East", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // Explore South
    newLocation = exploreInDirection(currentLocation, "South", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }

    // Explore West
    newLocation = exploreInDirection(currentLocation, "West", grid);
    if (newLocation.status === "Goal") {
      return newLocation.path;
    } else if (newLocation.status === "Valid") {
      queue.push(newLocation);
    }
  }

  // No valid path found
  return false;
};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
let locationStatus = (location, grid) => {
  let gridSize = grid.length;
  let dft = location.distanceFromTop;
  let dfl = location.distanceFromLeft;

  if (
    location.distanceFromLeft < 0 ||
    location.distanceFromLeft >= gridSize ||
    location.distanceFromTop < 0 ||
    location.distanceFromTop >= gridSize
  ) {
    // location is not on the grid return false
    return "Invalid";
  } else if (grid[dft][dfl] === "Goal") {
    return "Goal";
  } else if (grid[dft][dfl] !== "Empty") {
    // location is either an obstacle or has been visited
    return "Blocked";
  } else {
    return "Valid";
  }
};

// Explores the grid from the given location in the given direction
let exploreInDirection = (currentLocation, direction, grid) => {
  let newPath = currentLocation.path.slice();
  newPath.push(direction);

  let dft = currentLocation.distanceFromTop;
  let dfl = currentLocation.distanceFromLeft;

  // Adds +1 to the respective co-ordiante
  if (direction === "North") {
    dft -= 1;
  } else if (direction === "East") {
    dfl += 1;
  } else if (direction === "South") {
    dft += 1;
  } else if (direction === "West") {
    dfl -= 1;
  }

  const newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: "Unknown",
  };

  // checks for the location staus, check line no 66.
  newLocation.status = locationStatus(newLocation, grid);

  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === "Valid") {
    grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = "Visited";
  }

  return newLocation;
};

let findVertex = (num, gridSize) => {
  let horizontal;
  if (gridSize == 3) {
    horizontal = Math.floor(num / (gridSize - 1)) - 2;
  } else {
    horizontal = Math.floor(num / (gridSize - 1)) - 1;
  }
  let prevLastHouse = gridSize * horizontal;
  let diffHouse = num - prevLastHouse - 1;
  return [horizontal, diffHouse - 1, horizontal, diffHouse];
};

// Main Function (entry)
function init(size, qurantineHouses, home) {
  let gridSize = size[0];
  let grid = [];
  let qurantineVertex = [];
  let homeVertex;
  let startPoint = [0, 0];

  // creating this matrix to track the status and path
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = "Empty";
    }
  }

  // getting the vertex of qurantine houses
  for (let i = 0; i < qurantineHouses.length; i++) {
    qurantineVertex.push(findVertex(qurantineHouses[i], gridSize));
  }

  // getting the vertex of Destination House
  homeVertex = findVertex(home, gridSize);

  qurantineVertex = qurantineVertex.flat();

  // Assigning the "start", "obstacle", "Goal" to check for the path
  grid[0][0] = "Start";
  grid[homeVertex[0]][homeVertex[1]] = "Goal";
  grid[homeVertex[2]][homeVertex[3]] = "Goal";

  for (let i = 0; i < qurantineVertex.length; i++) {
    grid[qurantineVertex[i]][qurantineVertex[i + 1]] = "obstacle";
    qurantineVertex.shift();
  }

  // Actual function to find Path, check Line No 1
  return findPath(startPoint, grid);
}

// Random Test Inputs
console.log(init([3, 3], [4, 5], 6), "                  =============== first");
console.log(init([4, 4], [5, 6], 8), "            ================== secound");
console.log(init([5, 5], [8, 12], 14), "      ========== third");
console.log(init([5, 5], [8, 10], 14), "              ======== forth");
console.log(init([7, 7], [6, 7, 12], 14), "                  ========= fifth");

// open the link to execute
// https://jsfiddle.net/4gopz1sh/3/
