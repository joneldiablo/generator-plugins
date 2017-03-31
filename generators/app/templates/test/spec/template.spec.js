( function( $, QUnit ) {

	"use strict";

	var $testCanvas = $( "#testCanvas" );
	var $fixture = null;

	QUnit.module( "template", {
		beforeEach: function() {

			// fixture is the element where your jQuery plugin will act
			$fixture = $( "<div/>" );

			$testCanvas.append( $fixture );
		},
		afterEach: function() {

			// we remove the element to reset our plugin job :)
			$fixture.remove();
		}
	} );

	QUnit.test( "is inside jQuery library", function( assert ) {

		assert.equal( typeof $.fn.template, "function", "has function inside jquery.fn" );
		assert.equal( typeof $fixture.template, "function", "another way to test it" );
	} );

	QUnit.test( "returns jQuery functions after called (chaining)", function( assert ) {
		assert.equal(
			typeof $fixture.template().on,
			"function",
			"'on' function must exist after plugin call" );
	} );

	QUnit.test( "caches plugin instance", function( assert ) {
		$fixture.template();
		assert.ok(
			$fixture.data( "plugin_template" ),
			"has cached it into a jQuery data"
		);
	} );

	QUnit.test( "enable custom config", function( assert ) {
		$fixture.template( {
			foo: "bar"
		} );

		var pluginData = $fixture.data( "plugin_template" );

		assert.deepEqual(
			pluginData.settings,
			{
				propertyName: "value",
				foo: "bar"
			},
			"extend plugin settings"
		);

	} );

	QUnit.test( "changes the element text", function( assert ) {
		$fixture.template();

		assert.equal( $fixture.text(), "hola mundo" );
	} );

	QUnit.test(
		"has #helloW working as expected",
		function( assert ) {
			$fixture.template();

			var instance = $fixture.data( "plugin_template" ),
				expectedText = "foobar";

			instance.helloW( expectedText );
			assert.equal( $fixture.text(), expectedText );
		}
	);

}( jQuery, QUnit ) );
