'use strict';

var $ = require('./uri-helpers');

var find = require('./find-reference');

var maxRecursion = 3;

function clone(obj, refs, child, expand, rDepth) {
  var copy = {};

  // Check for recursive depth param
  if (typeof rDepth === 'undefined'){
		rDepth = 0;
	}

  if (Array.isArray(obj)) {
    copy = [];
  }

  if ($.isURL(obj.$ref)) {
    var fixed = find(obj.$ref, refs);

    if (fixed && expand) {
      var id = typeof fixed.id === 'string' ? fixed.id : '#';

      obj = fixed;

      // TODO match object vs array vs nulling
      if (rDepth === maxRecursion) {
      	var newObj;
      	var type = fixed.type || 'string';
      	switch(type) {
      		case 'object':
      			newObj = {
      				id: id,
      				type: 'object',
      				properties: {
		      			DEPTH_HALT: {
		      				type: 'string',
		      				faker: 'random.number'
		      			}
		      		}
      			};
      			break;
      		case 'array':
      			newObj = {
      				id: id,
      				type: 'array',
      				properties: {
      					type: 'string',
      					faker: 'name.first'
      				},
      				minItems: 0,
					maxItems: 0
      			};
      			break;
      		default:
      			newObj = {
      				id: id,
      				type: 'object',
      				properties: {
		      			DEPTH_HALT: {
		      				type: 'string',
		      				faker: 'random.number'
		      			}
		      		}
      			};
      	}

      	obj = newObj;
      }

      if (obj.$ref !== id && rDepth < maxRecursion) {
      	rDepth = rDepth + 1;
        return clone(fixed, refs, true, expand, rDepth);
      }

      delete obj.$ref;
    }
  }

  for (var key in obj) {
    var value = obj[key];

    if (typeof value === 'object' && !(key === 'enum' || key === 'required')) {
      copy[key] = clone(value, refs, true, expand, rDepth);
    } else {
      copy[key] = value;
    }
  }

  // TODO: seriously are required or not?
  if (child) {
    if (typeof copy.$schema === 'string') {
      delete copy.$schema;
    }

    if (typeof copy.id === 'string') {
      delete copy.id;
    }
  }

  return copy;
}

module.exports = function(obj, refs, expand) {
  return clone(obj, refs, false, expand);
};
