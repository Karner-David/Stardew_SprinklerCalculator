/**
 * Algorithms to determine best sprinkler spots
 */

/**
 * Find best sprinkler spots 
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 */
function findBestSprinklerSpots(tileMap, dimW, dimH) {
    console.log('In findBestSprinklerSpots');
    initSprinklerPlacement(tileMap, dimW, dimH);
    handleGaps(tileMap, dimW, dimH);
}

/**
 * Puts the initial first few sprinklers into the 2d array
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 */
function initSprinklerPlacement(tileMap, dimW, dimH) {
    console.log('In initSprinkler');
    let i = 0;
    while (i < tileMap.length) {
        let j = 0;
        while (j < tileMap[0].length) {
            const invalidCol = checkPrescenceOfInvalid(tileMap, j, i, dimW, dimH);
            if (invalidCol === -1) {
                fillInArround(tileMap, i + dimH / 2, j + dimW / 2, dimW, dimH);
                j += dimW;
            } else {
                j = invalidCol + 1;
            }
        }
        i++;
    }
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
    console.log('In checkPrescenceOfInvalid');
    if (startCol + dimW - 1 >= tileMap[0].length) return tileMap[0].length;
    if (startRow + dimH - 1 >= tileMap.length) return tileMap.length;

    for (let col = startCol + dimW - 1; col >= startCol; col--) {
        for (let row = startRow; row < startRow + dimH; row++) {
            if (tileMap[row][col] !== ',') {
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
    console.log('In fillInAround');
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

// Handle Filling in gaps
/**
 * Main function for handling remaining gaps
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @param {number} dimW - size of sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 */
function handleGaps(tileMap, dimW, dimH) {
    console.log('In handleGaps');
    const countTable = getNumOpenTable(tileMap, dimW, dimH);
    for (let row = 0; row < tileMap.length; row++) {
        for (let col = 0; col < tileMap[0].length; col++) {
            if (tileMap[row][col] === '.') {
                const bestPlace = getPlaceWithMostOpenSpots(countTable, row, col, dimW, dimH);
                if (countTable[bestPlace[0]][bestPlace[1]] > 1) fillInAround(tileMap, bestPlace[0], bestPlace[1], dimW, dimH);
            }
        }
    }
}

/**
 * Make a prefix sum table to make getting counts for each spot O(1)
 * @param {Array<Array<string>>} tileMap - 2d array of characters
 * @return {Array<Array<number>>} - 2d array of count of open spots around each cell
 */
function makePrefixSumTable(tileMap) {
    console.log('In makePrefixSumTable');
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
    console.log('In getNumOpenTable');
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

/**
 * Get the cell with the most open spot neighbors 
 * @param {Array<Array<numberam} countTable - table with the count of open spots around a cell
 * @param {number} startRow -amtarting row coordinate to look from
 * @param {number} startCol - starting col coordinate to look from
 * @param {number} dimW - sizamof sprinkler width dim
 * @param {number} dimH - size of sprinkler height dim
 * @return {Array<number>} - coordinates of cell with the most open spots
 */
function getPlaceWithMostOpenSpots(countTable, startRow, startCol, dimW, dimH) {
    console.log('In getPlaceWithMostOpenSpots');
    let bestRow = -1;
    let bestCol = -1;
    let bestCount = -1;
    let boundRow = Math.min(countTable.length, startRow + dimH);
    let boundCol = Math.min(countTable[0].length, startCol + dimW);
    for (let row = startRow; row < boundRow; row++) {
        for (let col = startCol; col < boundCol; col++) {
            if (countTable[row][col] > bestCount) {
                bestRow = row;
                bestCol = col;
                bestCount = countTable[row][col];
            }
        }
    }
    return [bestRow, bestCol];
}

module.exports = {
    findBestSprinklerSpots
}