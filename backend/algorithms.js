const { mapPresets } = require('./mapPresets');   // ← CommonJS import
/**
 * Algorithms to determine best sprinkler spots
 */

/**
 * Find best sprinkler spots 
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 */
function findBestSprinklerSpots(tileMap, dimW, dimH, curMap) {
    if (process.env.DEBUG) {
        console.log('In findBestSprinklerSpots');
        console.log(tileMap);
        console.log(tileMap.length);
        console.log(tileMap[0].length);
    }
    applyPresetMask(tileMap, mapPresets["standard_all"]);
    initSprinklerPlacement(tileMap, dimW, dimH);
    handleGaps(tileMap, dimW, dimH);
    handleGaps(tileMap, dimW, dimH);
}

function applyPresetMask(grid, preset) {
    if (!preset) return;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
          if (preset[row][col] === 'X') grid[row][col] = 'X';
        }
      }
}

function initSprinklerPlacement(tileMap, dimW, dimH) {
    if (process.env.DEBUG) console.log('In initSprinkler');
    const R = tileMap.length;        // total rows
    const C = tileMap[0].length;     // total columns

    const lastStartRow = R - dimH;   // highest top‑left row that still fits
    const lastStartCol = C - dimW;   // highest top‑left col that still fits

    const halfR = dimH >> 1;         // same as Math.floor(dimH / 2)
    const halfC = dimW >> 1;

    const blockedPS = makeBlockedPSTable(tileMap); // the prefix‑sum matrix

    // try every possible top‑left corner that keeps the w×h window inside the map
    for (let r = 0; r <= lastStartRow; r += dimH) {
        for (let c = 0; c <= lastStartCol; ) {

        // rectangle [r, c] .. [r+dimH-1, c+dimW-1]
        if (!hasBlock(blockedPS, r, c, r + dimH - 1, c + dimW - 1)) {
            // place a sprinkler in the centre of that rectangle
            fillInAround(tileMap, r + halfR, c + halfC, dimW, dimH);
            c += dimW;                // skip an entire sprinkler width
        } else {
            c += 1;                   // slide one cell and test again
        }
        }
    }
}

function makeBlockedPSTable(map) {
    const R = map.length, C = map[0].length;
    const ps = Array.from({ length: R + 1 }, () => Array(C + 1).fill(0));
    for (let r = 1; r <= R; r++) {
      for (let c = 1; c <= C; c++) {
        const blocked = map[r - 1][c - 1] === '.' ? 0 : 1;
        ps[r][c] =
          blocked +
          ps[r - 1][c] + ps[r][c - 1] - ps[r - 1][c - 1];
      }
    }
    return ps;
  }
  /** O(1) query: any blocked tile in rectangle? */
  function hasBlock(ps, r1, c1, r2, c2) {
    return (
      ps[r2 + 1][c2 + 1] -
      ps[r1][c2 + 1] -
      ps[r2 + 1][c1] +
      ps[r1][c1]
    ) !== 0;
  }

/**
 * Checks if there is an invalid element within the dimensions
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} startCol - Starting column index.
 * @param {number} startRow - Starting row index.
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 * @return {number} - returns col with invalid, or -1 if no presence of invalid
 */
function checkPrescenceOfInvalid(tileMap, startCol, startRow, dimW, dimH) {
    // if (process.env.DEBUG) console.log('In checkPrescenceOfInvalid');
    if (startCol + dimW - 1 >= tileMap[0].length) return tileMap[0].length;
    if (startRow + dimH - 1 >= tileMap.length) return tileMap.length;

    for (let col = startCol + dimW - 1; col >= startCol; col--) {
        for (let row = startRow; row < startRow + dimH; row++) {
            if (tileMap[row][col] !== '.') {
                return col
            }
        }
    }
    return -1;
}

/**
 * Fills in a sprinkler and what it waters around!
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} centerCol - center column index.
 * @param {number} centerRow - center row index.
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 */
function fillInAround(tileMap, centerRow, centerCol, dimW, dimH) {
    // if (process.env.DEBUG) console.log('In fillInAround');
    const rowOffset = Math.trunc(dimH / 2);
    const colOffset = Math.trunc(dimW / 2);
    let row1 = Math.max(0, centerRow - rowOffset);
    let col1 = Math.max(0, centerCol - colOffset);
    let row2 = Math.min(tileMap.length - 1, centerRow + rowOffset);
    let col2 = Math.min(tileMap[0].length - 1, centerCol + colOffset);
    for (let row = row1; row <= row2; row++) {
        for (let col = col1; col <= col2; col++) {
            if (tileMap[row][col] === 'X' || tileMap[row][col] === 'S') continue;
            if (row === centerRow && col === centerCol) {
                tileMap[row][col] = 'S';
            } else {
                tileMap[row][col] = '*';
            }
        }
    }
}

/** simple binary max‑heap */
class MaxHeap {
    constructor() { this.a = []; }
    push(x) {        // x = {r,c,val}
        let i = this.a.push(x) - 1;
        while (i && this.a[(i - 1) >> 1].val < this.a[i].val) {
        [this.a[i], this.a[(i - 1) >> 1]] = [this.a[(i - 1) >> 1], this.a[i]];
        i = (i - 1) >> 1;
        }
    }
    pop() {
        if (!this.a.length) return null;
        const top = this.a[0];
        const last = this.a.pop();
        if (this.a.length) {
        this.a[0] = last;
        let i = 0;
        while (true) {
            let l = i * 2 + 1, r = l + 1, big = i;
            if (l < this.a.length && this.a[l].val > this.a[big].val) big = l;
            if (r < this.a.length && this.a[r].val > this.a[big].val) big = r;
            if (big === i) break;
            [this.a[i], this.a[big]] = [this.a[big], this.a[i]];
            i = big;
        }
        }
        return top;
    }
}
  
function handleGaps(map, w, h) {
    const totalArea = w * h;
    const counts = getNumOpenTable(map, w, h);
    const heap = new MaxHeap();
    for (let r = 0; r < map.length; r++)
        for (let c = 0; c < map[0].length; c++)
        if (map[r][c] === '.' && counts[r][c] > 1)
            heap.push({ r, c, val: counts[r][c] });

    while (true) {
        const best = heap.pop();
        if (!best) break;
        const { r, c } = best;
        if (map[r][c] === '.' && !windowHasCoverage(map, r - (h >> 1), c - (w >> 1), h, w)) {
           fillInAround(map, r, c, w, h);
        }
    }
}

function windowHasCoverage(map, r, c, h, w) {
    for (let rr = r; rr < r + h; rr++) {
      for (let cc = c; cc < c + w; cc++) {
        if (map[rr][cc] === '*' || map[rr][cc] === 'S') return true;
      }
    }
    return false;
  }

/**
 * Make a prefix sum table to make getting counts for each spot O(1)
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @return {Array<Array<number>>} - 2d array of count of open spots around each cell
 */
function makePrefixSumTable(tileMap) {
    if (process.env.DEBUG) console.log('In makePrefixSumTable');
    const totalRows = tileMap.length;
    const totalCols = tileMap[0].length;

    const prefixSumTable = Array.from({ length: totalRows + 1}, () =>
        Array(totalCols + 1).fill(0)
    );

    for (let row = 1; row <= totalRows; row++) {
        for (let col = 1; col <= totalCols; col++) {
            const isOpen = tileMap[row - 1][col - 1] === '.' ? 1 : 0;
            prefixSumTable[row][col] = isOpen + prefixSumTable[row - 1][col] + prefixSumTable[row][col - 1] - prefixSumTable[row - 1][col - 1];
        }
    }
    return prefixSumTable;
}

/**
 * Get num open spots around each cell
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 * @return {Array<Array<number>>} - table of count of open spots around a cell
 */
function getNumOpenTable(tileMap, dimW, dimH) {
    if (process.env.DEBUG) console.log('In getNumOpenTable');
    const rowOffset = Math.trunc(dimH / 2);
    const colOffset = Math.trunc(dimW / 2);
    const prefixSumTable = makePrefixSumTable(tileMap);
    
    const countTable = Array.from({ length: tileMap.length}, () =>
        Array(tileMap[0].length).fill(0)
    );

    for (let row = 0; row < tileMap.length; row++) {
        for (let col = 0; col < tileMap[0].length; col++) {
            if (tileMap[row][col] == 'X' || tileMap[row][col] == 'S') {
                countTable[row][col] = -100;
                continue;
            }
            let row1 = Math.max(0, row - rowOffset);
            let col1 = Math.max(0, col - colOffset);
            let row2 = Math.min(tileMap.length - 1, row + rowOffset);
            let col2 = Math.min(tileMap[0].length - 1, col + colOffset);
            countTable[row][col] = prefixSumTable[row2 + 1][col2 + 1] - prefixSumTable[row1][col2 + 1] 
                                    - prefixSumTable[row2 + 1][col1] + prefixSumTable[row1][col1] - 1;
        }
    }
    return countTable;
}

module.exports = {
    findBestSprinklerSpots
}