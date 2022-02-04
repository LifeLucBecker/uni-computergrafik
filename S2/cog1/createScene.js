/**
 * Populate the scene-graph with nodes,
 * calling methods form the scene-graph and node modules.
 *
 * Texture files have to exist in the "textures" sub-directory.
 *
 * @namespace cog1
 * @module createScene
 */
define(["exports", "scenegraph", "animation"], //
  function (exports, scenegraph, animation) {
    "use strict";

    /**
     *  Call methods form the scene-graph (tree) module to create the scene.
     *
     */
    function init() {
      const sun = scenegraph.createNodeWithModel("Sonne", "sphere", {recursionDepth: 2, scale: 120, color: 5});
      const earth = scenegraph.createNodeWithModel("Erde", "sphere", {recursionDepth: 2, scale: 75, color: 2}, sun);
      const moon = scenegraph.createNodeWithModel("Mond", "sphere", {recursionDepth: 2, scale: 20, color: 0}, earth);
      const moon2 = scenegraph.createNodeWithModel("Mond2", "sphere", {recursionDepth: 2, scale: 40, color: 7}, earth);

      sun.rotate([-50, -100, 0]);

      earth.translate([500, 0, 0]);
      moon.translate([150, 0, 20]);
      moon2.translate([250, 0, -50]);

      animation.assign(sun, "rotate", {rotationSpeed: [0, 0.002, 0]});
      animation.assign(earth, "rotate", {rotationSpeed: [0.001, 0.03, 0]});
      animation.assign(moon, "rotate", {rotationSpeed: [0.009, 0.009, 0.09]});
      animation.assign(moon2, "rotate", {rotationSpeed: [0.05, 0.08, 0.05], });

      sun.setVisible(true);
      earth.setVisible(true);
      moon.setVisible(true);
      moon2.setVisible(true);
      // end animation

      var lightnode = scenegraph.createPointLightNode("light", "diamond");
      scenegraph.setLights(0.5, 0.6, [200, 200, 300], 4.0, 10);
    }

    exports.init = init;
  });
