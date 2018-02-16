var roleHarvester = require('role.harvester');

var roleScavenger = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var target = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
            filter: (r) => r.resourceType == RESOURCE_ENERGY
        });

        if (target) {
            if (creep.carry.energy < creep.carryCapacity) {
                creep.say('📡 scavenge');
                if (creep.pickup(target) == ERR_NOT_IN_RANGE)
                    creep.moveTo(target, { visualizePathStyle: { stroke: '#ffff00'} });
            }
        } else {
            console.log('scav -> harv')
            roleHarvester.run(creep);
        }
    }
};

module.exports = roleScavenger;