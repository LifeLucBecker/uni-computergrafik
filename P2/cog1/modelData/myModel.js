/**
 * 3D Data Store for custom model.
 * 
 * @namespace cog1.data
 * @module empty
 */
define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
		
		// Instance of the model to be returned.
		var instance = {};

		instance.vertices = [
		
		[-1,-1, 1],
		[ 1,-1, 1],
		[-1,1, 1],
		[ 1,1, 1],
		
		
		];
		instance.polygonVertices = [
		
		[0,1,2,3],
		
		
		
		];	
		instance.polygonColors = [0,1,2,3,4,5];
		
		return instance;		
	};
});