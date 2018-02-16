module.exports = function() {
    StructureSpawn.prototype.spawnCustomCreep = function(energy, roleName) {
        var numParts = Math.floor(energy / 200);
        var body = [];
        for (let i = 0; i < numParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numParts; i++) {
            body.push(MOVE);
        }

        var creepType = roleName.charAt(0);
        return this.spawnCreep(body, creepType + '_' + Game.time, {
            memory: {role: roleName, working: false }
        });
    };

    StructureSpawn.prototype.spawnLongDistanceHarvester = function(energy, numWorkParts, home, target, sourceIndex) {
        var body = [];
        for (let i = 0; i < numWorkParts; i++) {
            body.push(WORK);
        }

        energy -= 150 * numWorkParts;

        var numParts = Math.floor(energy / 100);
        for (let i = 0; i < numParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numParts + numWorkParts ; i++) {
            body.push(MOVE);
        }

        return this.spawnCreep(body, 'h+' + Game.time, {
            memory: {role: 'longDistanceHarvester',
            home: home,
            target: target,
            sourceId: sourceIndex,
            working: false }
        });
    };

    StructureSpawn.prototype.spawnMiner = function(sourceId) {
        return this.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], 'm_' + Game.time, {
            memory: { role: 'miner', sourceId: sourceId }
        });
    };

    StructureSpawn.prototype.spawnCarrier = function(energy) {
        var numParts = Math.floor(energy / 150);
        var body = [];
        for (let i = 0; i < numParts * 2; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numParts; i++) {
            body.push(MOVE);
        }

        return this.spawnCreep(body, 'c_' + Game.time, {
            memory: {role: 'carrier', working: false }
        });
    };
}