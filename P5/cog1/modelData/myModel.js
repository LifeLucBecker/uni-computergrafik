/**
 * 3D Data Store for a model.
 * Missing properties/arrays (commented out)
 * are mixed in from data module.
 *
 * @namespace cog1.data
 * @module cube
 */
define(["exports", "data"], function (exports, data) {
  "use strict";

  /**
   * Create an instance of the model defined in this module.
   *
   * @parameter object with fields:
   * @parameter scale is the edge length of the cube.
   * @returns instance of this model.
   */
  exports.create = function (parameter) {
    if (parameter) {
      var scale = parameter.scale;
      var textureURL = parameter.textureURL;
      // Each face shows a different area of the given texture (e.g, a dice).
      var sixFacesTexture = parameter.sixFacesTexture;
    }
    // Set default values if parameter is undefined.
    if (scale == undefined) {
      scale = 100;
    }
    if (textureURL == undefined) {
      textureURL = "";
    }
    if (sixFacesTexture == undefined) {
      sixFacesTexture = false;
    }

    // Instance of the model to be returned.
    var instance = {};
    // *  *  Coordinate System:
    // *        y
    // *        |
    // *        |____
    // *       /     x
    // *     z/
    //

    // Vertex indices:
    //      8
    //   7----6
    //	/|   /|
    // 4----5 |
    // | 3--|-2
    // |/   |/
    // 0----1
    instance.vertices = [
      // bottom (y=-2)
      [-2, -2, 2],
      [2, -2, 2],
      [2, -2, -2],
      [-2, -2, -2],
      // top (y=+7)
      [-2, 7, 2],
      [2, 7, 2],
      [2, 7, -2],
      [-2, 7, -2],
      //highest point center (y=+12)
      [0, 12, 0],
      //top of bottom (y=-2)
      [-8, -2, 2],
      [-8, -2, -2],
      [8, -2, -2],
      [8, -2, 2],
      //bottom of bottom (y=-6)
      [-8, -6, 2],
      [-8, -6, -2],
      [8, -6, -2],
      [8, -6, 2],

      //wall
      //inside
      //bottom (y=-2)
      [-12, -2, 12], //17
      [-12, -2, -12], //18
      [12, -2, -12], //19
      [12, -2, 12], //20
      // bottom (y=-6)
      [-12, -6, 12], //21
      [-12, -6, -12], //22
      [12, -6, -12], //23
      [12, -6, 12], //24

      //wall outside
      //bottom (y=-2)
      [-13, -2, 13], //25
      [-13, -2, -13], //26
      [13, -2, -13], //27
      [13, -2, 13], //28
      // bottom (y=-6)
      [-13, -6, 13], //29
      [-13, -6, -13], //30
      [13, -6, -13], //31
      [13, -6, 13], //32

     
      [2,-6,13], //33
    [2,-3,13], //34
    [-2,-3,13], //35
    [-2,-6,13], //36

    [2,-6,12], //37
    [2,-3,12], //38
    [-2,-3,12], //39
    [-2,-6,12], //40

    ];
    // Use default colors, implicitly.
    // instance.colors = data.colors;

    // Corners of the faces have to fit the texture coordinates.
    // Faces: bottom/down, top/up, front, right, back, left.
    instance.polygonVertices = [
      // [3,2,1,0],
      [4, 5, 6, 7],
      [4, 0, 1, 5],
      [1, 2, 6, 5],
      [6, 2, 3, 7],
      [3, 0, 4, 7],
      [4, 8, 5],
      [4, 8, 7],
      [6, 7, 8],
      [5, 6, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
      [9, 10, 14, 13],
      [12, 11, 15, 16],

      //inside wall
    
      [21, 17, 20, 24,37,38,39,40], //front
      [17, 18, 22, 21], //left
      [18, 19, 23, 22], //back
      [20, 19, 23, 24], //right
      //outside wall
      
      [25,28,32,33,34,35,36,29], //front
      [25,26,30,29], //left
      [26,27,31,30], //back
      [28,27,31,32], //right

      //top
      [17,25,28,20], //top front
      [17,25,26,18], //top left
      [20,19,27,28], //top right
      [18,26,27,19], //top back

      //front bottom
      [21,29,36,35,34,33,32,24,37,38,39,40],
      [22,30,31,23]

    ];

    instance.polygonColors = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      8,
      9,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
    ];

    //instance.vertexNormals = [];
    //instance.polygonNormals = [];

    if (!sixFacesTexture) {
      // Use default texture coordinates.
      // instance.textureCoord = [];
      // For order of corners of faces, see polygonVertices.
      instance.polygonTextureCoord = [
        [1, 2, 3, 0],
        [1, 2, 3, 0],
        [1, 0, 3, 2],
        [3, 0, 1, 2],
        [3, 0, 1, 2],
        [3, 0, 1, 2],
      ];
    } else {
      // BEGIN exercise Cube-Dice-Texture

      // Order 0 to 16 form bottom-left to top-right
      // line by line, indices in spatial order:
      instance.textureCoord = [];
      // ...

      // Use textureCoord in order given for textureCoord.
      // The order of corners of faces must fit the one given in polygonVertices.
      // Match orientation of face given for polygonVertices.
      // D=bottom/down, U=top/up, F=front, R=right, B=back, L=left
      // The mapping is explained on the texture image.
      // instance.polygonTextureCoord = [ ....];

      // END exercise Cube-Dice-Texture
    }

    instance.textureURL = textureURL;

    data.applyScale.call(instance, scale);

    return instance;
  };
});
