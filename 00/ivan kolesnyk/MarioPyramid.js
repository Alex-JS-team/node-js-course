const pyramidHeight = process.argv[2];


const marioPyramid = function(pyramidHeight) {

// ====================================================================================
// let start to build the floor of our Mario Pyramid
// ====================================================================================
const floor = function(pyramidHeight, floorNumber) {
	let build = '';

	// ----------------------------------------------------------
	// UPSTAIRS BUILDING
	// ----------------------------------------------------------
	// count number of empties in the floor
	for (let empties = pyramidHeight - floorNumber; empties > 0; empties--) {
		build += ' ';
	}

	// count number of bricks in the floor
	for (let bricks = floorNumber; bricks > 0; bricks--) {
		build += '#';
	}

	build += '-';

	// ----------------------------------------------------------
	// DOWNSTAIRS BUILDING
	// ----------------------------------------------------------
	for (let bricks = 0; bricks < floorNumber; bricks++) {
		build += '#';
	}

	return build;
};

// ====================================================================================
// assembling pyramid
// ====================================================================================
let result = '';
for (let floorNumber = 1; floorNumber <= pyramidHeight; floorNumber++) {
	result += floor(pyramidHeight, floorNumber) + '\n';
}
console.log(result);

return result;

};

// ====================================================================================
// writing Mario Pyramid to file
// ====================================================================================
const fs = require('fs');

fs.writeFile("C:/MyDevSchool/beetroot/lesson-01/MarioPyramid.txt", marioPyramid(pyramidHeight), function(err) {

    if(err) {
        return console.log(err);
    }

    console.log(`The ${pyramidHeight} floors Mario Pyramid was built and saved to file!`);
}); 
