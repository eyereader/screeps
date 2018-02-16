var roleFixer = require('role.fixer');

var roleWallFixer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        } else if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🔧 fix');
        }

        if (creep.memory.working) { 
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
                || s.structureType == STRUCTURE_RAMPART
            });

            var target = undefined;

            for (let pct = 0.0001; pct <= 1; pct = pct + 0.0001) {
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < pct) {
                        target = wall;
                        break;
                    }
                }
                if (target) {
                    break;
                }
            }
            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                roleFixer.run(creep);
            }
        } else {
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0)
            });
            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleWallFixer;