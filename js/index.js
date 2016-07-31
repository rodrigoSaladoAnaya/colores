let $container;
const colores = {
  blanco: {body: "#fff", border: "#e5e5e5"},
  rojo: {body: "#e50000", border: "#cc0000"}
}

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createBubble = function(color, x, y, r, time_floating, delay_start) {
  const bubble = document.createElement("div");
  $(bubble).addClass("bubble");
  $container.append(bubble);

  const float = function() {
    new TimelineLite()
      .set(bubble, {
        x: x,
        y: y,
        width: r,
        height: r,
        backgroundColor: color.body,
        borderColor: color.border
      })
      .to(bubble, time_floating, {y: (r * -2)})
  }

  const zigzag = function() {
    const mov_x = getRandomInt(10, 100);
    new TimelineMax({repeat: -1})
      .to(bubble, 2, {x: "+="+mov_x, ease: Sine.easeInOut})
      .to(bubble, 2, {x: "-="+mov_x, ease: Sine.easeInOut})
  }

  new TimelineLite({delay: delay_start})
  .add(float, "stage1")
  .add(zigzag, "stage1")
}

const generateBubbles = function() {
  $.each(colores, function(index, color) {
    for(let i = 0; i < 5; i++) {
      const r = getRandomInt(20, 50);
      const x = getRandomInt(r, $container.width() - r);
      const y = $container.height();
      const time_floating = getRandomInt(10, 30)
      const delay_start = getRandomInt(0, 4000) / 1000;
      createBubble(color, x, y, r, time_floating, delay_start);
    }
  })

}

const fullscreen = function() {
  $("#fullsc").click(function() {
    if (screenfull.enabled) {
      screenfull.request(document.documentElement);
    }
    $(this).hide();
    generateBubbles();    
  });
}

$(document).ready(function() {
  fullscreen();
  $container = $("#container");
});
