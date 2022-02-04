/**
 * Creates a unit sphere by subdividing a unit octahedron.
 * Starts with a unit octahedron and subdivides the faces,
 * projecting the resulting points onto the surface of a unit sphere.
 *
 * For the algorithm see:
 * https://sites.google.com/site/dlampetest/python/triangulating-a-sphere-recursively
 * http://sol.gfxile.net/sphere/index.html
 * http://nipy.sourceforge.net/dipy/reference/dipy.core.triangle_subdivide.html
 * http://skyview.gsfc.nasa.gov/blog/index.php/2008/12/31/skyview-to-include-healpix-and-wmap/
 *
 *        1
 *       /\
 *      /  \
 *    b/____\ c
 *    /\    /\
 *   /  \  /  \
 *  /____\/____\
 * 0      a     2
 *
 * Parameter:
 *  recursionDepth
 *  color or -1 = many colors
 *
 * For texture see:
 * http://earthobservatory.nasa.gov/Features/BlueMarble/
 *
 * @namespace cog1.data
 * @module sphere
 */

define(["exports", "data", "glMatrix"], function (exports, data) {
  "use strict";

  /**
   * Procedural calculation.
   *
   * @parameter object with fields:
   * @parameter scale
   * @parameter recursionDepth
   * @parameter color [-1 for many colors]
   */
  exports.create = function (parameter) {

    if (parameter) {
      var scale = parameter.scale;
      var recursionDepth = parameter.recursionDepth;
      var color = parameter.color;
      var textureURL = parameter.textureURL;
    }
    // Set default values if parameter is undefined.
    if (scale === undefined) {
      scale = 250;
    }
    if (recursionDepth === undefined) {
      recursionDepth = 3;
    }
    if (color === undefined) {
      color = 9;
    }
    if (textureURL === undefined) {
      textureURL = "";
    }

    // Instance of the model to be returned.
    var instance = {};

    // BEGIN exercise Sphere

    // Starting with octahedron vertices
    // octahedron triangles

    const details = 1;

    instance.vertices = [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, -1],
      [-1, 0, 0],
      [0, 0, 1],
      [0, -1, 0],
    ];

    instance.polygonVertices = [
      [0, 4, 1],
      [0, 1, 2],
      [0, 2, 3],
      [0, 3, 4],

      [5, 4, 1],
      [5, 1, 2],
      [5, 2, 3],
      [5, 3, 4],
    ];
    // END exercise Sphere

    const centerOfTwoVertices = (a, b) => {

    }

    devide_all.call(instance, recursionDepth);

    generateTextureCoordinates.call(instance);

    data.applyScale.call(instance, scale);
    data.setColorForAllPolygons.call(instance, color);

    instance.textureURL = textureURL;

    return instance;
  }

  /**
   * Called with this pointer set to instance.
   * Generate texture coordinates one per each corner of a polygon,
   * thus a vertex can have more than one uv, depending on the polygon it is part of.
   * The coordinates u.v represent the angles theta and phi
   * of point vector to x and y axis.
   * See:
   * http://tpreclik.dyndns.org/codeblog/?p=9
   *
   * Assume that vertices are not yet scaled, thus have length 1.
   *
   */
  function generateTextureCoordinates() {

    // BEGIN exercise Sphere-Earth-Texture

    // As there is not exactly one texture coordinate per vertex,
    // we have to install a different mapping as used for polygonVertices to vertices.
    // For texture coordinate system use openGL standard, where origin is bottom-left.
    this.textureCoord = [];
    this.polygonTextureCoord = [];


    // Loop over vertices/edges in polygon.

    // Shorthands for the current vertex.


    // Calculate longitude (east-west position) phi (u-coordinate).
    // arctangent (of here z/x), representing the angle theta between the positive X axis, and the point.
    // Scale phi to uv range [0,1].


    // Calculate latitude (north-south position) theta (v-coordinate) from y component of vertex.
    // Scale theta to uv range [0,1].


    // Store new uv coordinate in new uv-vector.
    //console.log("phi:" + (~~(phi * 100)) + "  theta:" + (~~(theta * 100)) + " x:" + (~~(x * 100)) + " z:" + (~~(z * 100)));


    // Problem with phi/u: phi=360 and phi=0 are the same point in 3D and also on a tiled texture.
    // But for faces it is a difference if uv-range is 350�-360� [.9-1]or 350�-0� [.9-0].
    // Thus, insert a check/hack (assuming faces cover only a small part of the texture):

    // Check if u-range should be low or high (left or right in texture),
    // by summing up u values (ignoring u=0 values).

    // Check and correct u values if 0;

    // END exercise Sphere-Earth-Texture
  }

  // BEGIN exercise Sphere

  /**
   * Recursively divide all triangles.
   */
  function devide_all(recursionDepth, nbRecusions) {
    // nbRecusions is not set from initial call.
    if (nbRecusions === undefined) {
      nbRecusions = 0;
    }
    // Stop criterion.
    if (nbRecusions === recursionDepth) {
      return;
    }

    const newPolygon = [];
    for (let vertex of this.polygonVertices) {
      // get points of triangle
      const p0 = vertex[0];
      const p1 = vertex[1];
      const p2 = vertex[2];

      //get vectors
      const v0 = this.vertices[p0];
      const v1 = this.vertices[p1];
      const v2 = this.vertices[p2];

      //create new vectors
      const aMul = v0.map((v, index) => (v + v2[index])/2);
      const bMul = v0.map((v, index) => (v + v1[index])/2);
      const cMul = v1.map((v, index) => (v + v2[index])/2);

      // normalize
      const vecNorm = (v) => v.map(el => el / Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]));

      const aN = vecNorm(aMul);
      const bN = vecNorm(bMul);
      const cN = vecNorm(cMul);

      //get new indices for vertices
      const i = this.vertices.length;
      this.vertices.push(aN, bN, cN);

      // construct new Polygon (triangle)
      newPolygon.push([p0, i + 1, i], [i + 1, p1, i + 2], [i, i + 1, i + 2], [i, i + 2, p2]);
    }
    this.polygonVertices = newPolygon;
    // Recursion.
    devide_all.call(this, recursionDepth, nbRecusions + 1);
  }

  // END exercise Sphere

});
