var roleBuilder = require('role.builder');

var roleCarrier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        console.log(_.sum(creep.carry), '  ', creep.carryCapacity);
        console.log('foo');

        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.working && _sum(creep.carry) == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('🚛 deliver');
        }
        if (creep.memory.working) {
            var target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_EXTENSION
                   || s.structureType == STRUCTURE_SPAWN
//                || s.structureType == STRUCTURE_TOWER
)
                && s.energy < s.energyCapacity
            });
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else 
            target = creep.room.find(STRUCTURE_STORAGE, {
                filter: s => _sum(s.store) < s.storeCapacity
            }
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                roleBuilder.run(creep);
            }
        } else {
            let salvage = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if (salvage != undefined) {
                if (creep.pickup(salvage) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(salvage);
                }
            } else {
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => (s.structureType == STRUCTURE_CONTAINER
                        && s.store[RESOURCE_ENERGY] < s.storeCapacity)
                });
                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container, { visualizePathStyle: { stroke: '#ffaa00' } });
                    }
                }
            }
        }
    }
};

module.exports = roleCarrier;