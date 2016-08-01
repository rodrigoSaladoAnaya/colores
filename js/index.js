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
const x_limit = 120

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
    const mov_x = getRandomInt(10, x_limit);
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
    for(let i = 0; i < 4; i++) {
      const r = getRandomInt(90, 120);
      const x = getRandomInt(x_limit, $container.width() - x_limit);
      const y = $container.height();
      const time_floating = getRandomInt(30, 50)
      const delay_start = (getRandomInt(0, 10000) / 1000) * (i+3);
      createBubble(color, x, y, r, time_floating, delay_start);
    }
  })

}

$(document).ready(function() {
  $container = $("#container");
  generateBubbles();
});
