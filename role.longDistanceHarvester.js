var roleLongDistanceHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🚛 deliver');
        }

        if (creep.memory.working) {
            if (creep.room.name == creep.memory.home) {
                var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => ((s.structureType == STRUCTURE_EXTENSION
                     || s.structureType == STRUCTURE_SPAWN
                     || s.structureType == STRUCTURE_TOWER)
                    && s.energy < s.energyCapacity)
                    || (s.structureType == STRUCTURE_STORAGE
                        && s.store < s.storeCapacity)
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit)) ;
            }
        } else {
            if (creep.room.name == creep.memory.target) {
                creep.pickup(RESOURCE_ENERGY);
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }   
            } else {
                var exit = creep.room.findExitTo(creep.memory.target);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        }
    }
};

module.exports = roleLongDistanceHarvester;