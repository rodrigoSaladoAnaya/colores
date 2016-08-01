let $container;

const colores = {
  blanco: {body: "#fff", border: "#e5e5e5"},
  rojo: {body: "#e50000", border: "#cc0000"},
  amarillo: {body: "#fef35a", border: "#fef79c"},
  azul: {body: "#1919ff", border: "#4c4cff"},
  negro: {body: "#000000", border: "#666666"},
  verde: {body: "#079811", border: "#6ac170"},
  cafe: {body: "#82371a", border: "#b48775"}
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
        borderColor: color.border,
        autoAlpha: 1,
        display:'block'
      })
      .to(bubble, time_floating, {y: (r * -2)})
  }

  const zigzag = function() {
    const mov_x = getRandomInt(10, 30);
    new TimelineMax({repeat: -1})
      .to(bubble, 2, {x: "+="+mov_x, ease: Sine.easeInOut})
      .to(bubble, 2, {x: "-="+mov_x, ease: Sine.easeInOut})
  }

  new TimelineLite({delay: delay_start})
  .add(float, "stage1")
  .add(zigzag, "stage1")
}

const generateBubbles = function() {
  let buble_min_size = $container.width() * 0.07;
  let buble_max_size = $container.width() * 0.1;
  if(typeof window.orientation !== 'undefined'){
    buble_min_size = $container.width() * 0.2;
    buble_max_size = $container.width() * 0.3;
  }
  $.each(colores, function(index, color) {
    for(let i = 0; i < 4; i++) {
      const r = getRandomInt(buble_min_size, buble_max_size);
      const x = getRandomInt(0, $container.width());
      const y = $container.height() - r;
      const time_floating = getRandomInt(30, 50)
      const delay_start = (getRandomInt(0, 7000) / 1000) * (i+3);
      createBubble(color, x, y, r, time_floating, delay_start);
    }
  });
}

const moveRocket = function() {
  $(document).mousemove(function(e) {
    let rocket_pos = {
      x: $container.width() / 2,
      y: $container.height() - 100
    };
    let rotation_angle = Math.atan2(
      event.pageX- rocket_pos.x, -(event.pageY - rocket_pos.y)
    ) * (180/Math.PI) - 53;
    TweenLite.set("#rocket", {
      transformOrigin: "50% 50%",
      rotation: rotation_angle,
      x: rocket_pos.x,
      y: rocket_pos.y,
      autoAlpha: 1
    });
  });
}

$(document).ready(function() {
  $container = $("#container");
  moveRocket();
  generateBubbles();
});
