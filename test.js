'use strict'

var deref = require('./lib');
var $ = deref();
console.log('SCHEMA 1');
var schema = {
	type: 'object',
	properties: {
		DataList: {
			type: 'array',
			items: {
				'$ref': '#/definitions/KeyValue'
			},
			minItems: 1,
			maxItems: 1,
			uniqueItems: true
		}
	},
	required: ['DataList'],
	definitions: {
		KeyValue: {
			type: 'object',
			properties: {
				key: {
					type: 'string',
					faker: 'name.title'
				},
				value: {
					type: 'integer',
					faker: 'random.number'
				}
			}
		}
	}
};

// console.log(JSON.stringify($(schema, true), null, 2));
console.log('');
console.log('');

console.log('SCHEMA 2');
var schema2 = {
	type: 'object',
	properties: {
		value1: {
			'$ref': 'KeyValue'
		}
	},
	required: ['value1'],
	definitions: {
		KeyValue: {
			type: 'object',
			id: 'KeyValue',
			properties: {
				key: {
					type: 'string',
					faker: 'name.title'
				},
				value: {
					type: 'integer',
					faker: 'random.number'
				}
			}
		}
	}
};

// console.log(JSON.stringify($(schema2, true), null, 2));
console.log('');
console.log('');

console.log('SCHEMA 3');
var schema3 = {
	type: 'object',
	properties: {
		DataPoint: {
			'$ref': '#/definitions/KV'
		}
	},
	required: ['DataList'],
	definitions: {
		KV: {
			type: 'object',
			properties: {
				key: {
					type: 'string',
					faker: 'name.title'
				},
				value: {
					type: 'integer',
					faker: 'random.number'
				},
				children: {
					type: 'array',
					items: {
						'$ref': '#/definitions/KV'
					},
					minItems: 0,
					maxItems: 0,
					uniqueItems: true
				}
			}
		}
	}
};

// console.log(JSON.stringify($(schema3, true), null, 2));
console.log('');
console.log('');

console.log('SCHEMA 3.1');
var schema3_1 = {
	type: 'object',
	properties: {
		DataPoint: {
			'$ref': '#/definitions/KV'
		}
	},
	required: ['DataList'],
	definitions: {
		KV: {
			type: 'object',
			properties: {
				key: {
					type: 'string',
					faker: 'name.title'
				},
				child: {
					'$ref': '#/definitions/KV'
				}
			}
		}
	}
};

var refs = [
	{
		"http://json-schema.org/schema#/definitions/KV": {
			"type": "object",
			"properties": {
				"key": {
					"type": "string",
					"faker": "name.title"
				},
				"child": {
					"type": "string",
					"faker": "name.first"
				}
			}
		}
	}
];

console.log(JSON.stringify($(schema3_1, true), null, 2));
console.log('');
console.log('');

console.log('SCHEMA 4');
var schema4 = {
	type: 'object',
	properties: {
		layer1: {
			type: 'object',
			properties: {
				'$ref': '#/definitions/PT2'
			}
		}
	},
	required: ['DataList'],
	definitions: {
		PT: {
			type: 'object',
			id: 'PT',
			properties: {
				point: {
					type: 'integer',
					faker: 'random.number'
				}
			}
		},
		PT2: {
			type: 'object',
			id: 'PT2',
			properties: {
				ptr: {
					'$ref': 'PT',
				},
				child: {
					'$ref': 'PT'
				}
			}
		}
	}
};

// console.log(JSON.stringify($(schema4, true), null, 2));
console.log('');
console.log('');
