class Ship {
    constructor(length) {
        this.length = length;
        this.locations = [];
        this.hits = Array(length).fill(false);
    }

    // Method to place the ship at certain locations
    place(locations) {
        if (locations.length !== this.length) {
            throw new Error('Invalid locations for ship placement');
        }
        this.locations = locations;
    }

    // Method to check if the ship has been hit
    checkHit(location) {
        const index = this.locations.indexOf(location);
        if (index > -1) {
            this.hits[index] = true;
            return true;
        }
        return false;
    }

    // Method to check if the ship has been sunk
    isSunk() {
        return this.hits.every(hit => hit);
    }
}
