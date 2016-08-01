let $container;

const colores = {
  blanco: {body: "#fff", border: "#e5e5e5", audio: "audio-blanco"},
  rojo: {body: "#e50000", border: "#cc0000", audio: "audio-rojo"},
  amarillo: {body: "#fef35a", border: "#fef79c", audio: "audio-amarillo"},
  azul: {body: "#1919ff", border: "#4c4cff", audio: "audio-azul"},
  negro: {body: "#000000", border: "#666666", audio: "audio-negro"},
  verde: {body: "#079811", border: "#6ac170", audio: "audio-verde"},
  cafe: {body: "#82371a", border: "#b48775", audio: "audio-cafe"}
}

const getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createBubble = function(color, x, y, r, time_floating, delay_start) {
  const bubble = document.createElement("div");
  $(bubble).addClass("bubble").attr("color-audio", color.audio);
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
      .to(bubble, time_floating, {y: (r * -1)})
      .to(bubble, 2, {autoAlpha: 0})
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
  let buble_min_size = $container.width() * 0.05;
  let buble_max_size = $container.width() * 0.1;
  if(typeof window.orientation !== 'undefined'){
    buble_min_size = $container.width() * 0.18;
    buble_max_size = $container.width() * 0.25;
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

const playSound = function(id) {
  const audio = document.getElementById(id);
  audio.load();
  audio.play();
}

const destroyBubble = function() {
  $("#container").on("click", ".bubble", function() {
    let $this_bubble = $(this);
    const exploteBubble = function() {
      playSound($this_bubble.attr("color-audio"));
      TweenLite.to($this_bubble, 0.2, {scale: 3, autoAlpha: 0});
    }
    const pos = $(this).position();
    new TimelineMax()
      .add(playSound.bind(this, "audio-laser"))
      .to("#rocket", 0.4, { x: pos.left, y: pos.top, autoAlpha: 0 })
      .add(exploteBubble);
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
  destroyBubble();
});
