function Filter_Rotate()
{
  Filter.call(this);
  this.parameters = [Angle,Position];

  this.render = function(cmd)
  {
    var position = cmd.position() ? cmd.position() : new Position(ronin.surface.size.width/2,ronin.surface.size.height/2);
    var angle = cmd.angle() ? cmd.angle().degrees : 90;

    ronin.overlay.clear();
    this.draw(this.context(),angle,position);
    ronin.overlay.clear();
  }

  this.preview = function(cmd)
  {
    if(cmd.position()){
      ronin.overlay.clear();
      ronin.overlay.draw_pointer(cmd.position());
    }
  }

  this.draw = function(context = this.context(), angle, position)
  {
    var w = ronin.surface.size.width;
    var h = ronin.surface.size.height;

    ronin.overlay.context().drawImage(context.canvas,0,0,w,h);

    ronin.surface.active_layer.clear();

    context.save();
    context.translate(position.x,position.y);
    context.rotate(angle*Math.PI/180);

    context.drawImage(ronin.overlay.context().canvas, -position.x, -position.y,w,h)

    context.rotate(-angle*Math.PI/180);
    context.restore();
  }
}