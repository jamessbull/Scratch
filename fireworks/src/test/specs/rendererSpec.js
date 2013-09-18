describe("The renderer", function() {

    // I wan to start rocking the prototypes and have a thing that has a prototype renderable
    it("should call update on objects added to it ", function() {
        var renderer = jim.display.renderer.create();
        var renderable = Object.create(jim.renderObject());
        var renderable2 = Object.create(jim.renderObject());

        spyOn(renderable, 'update');
        spyOn(renderable2, 'update');

        renderer.add(renderable);
        renderer.add(renderable2);

        renderer.beginRenderLoop();

        expect(renderable.update).toHaveBeenCalled();
        expect(renderable2.update).toHaveBeenCalled();

        renderer.endRenderLoop();
    });

});
