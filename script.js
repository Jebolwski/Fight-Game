//!FIGHTER 1
let FIGHTER1_WIDTH = $(".player1").width();
let FIGHTER2_WIDTH = $(".player2").width();
let STANCE_FIGHTER_WIDTH = $(window).width() * 0.106;
let FIGHTER_HEIGHT = $(window).height() * 0.2;
let FIGHTER1_HEALTH = 100;
let FIGHTER2_HEALTH = 100;
let FIGHTER2_HEALTH_PERC = FIGHTER2_HEALTH / 100;

let FIGHTER1_TOGETHER = false;
let FIGHTER2_TOGETHER = false;

//!KEY MAP
let map = {};

document.addEventListener("keydown", (event) => {
  map[event.key.toLowerCase()] = true;
  let player2 = document.querySelector(".player2");
  let player1 = document.querySelector(".player1");
  let player1_left = $(".player1")
    .css("left")
    .slice(0, player1.style.left.length - 2);
  if (map["l"]) {
    player1.classList.add("player1-punch");
    FIGHTER1_WIDTH = $(window).width() * 0.2256;
    player1_hit_detection();
    setTimeout(() => {
      player1.classList.remove("player1-punch");
      FIGHTER1_WIDTH = $(window).width() * 0.1456;
    }, 400);
  }

  if (map["k"] && !map["l"]) {
    $(".player1").addClass("player1-block");
  } else {
    $(".player1").removeClass("player1-block");
  }

  if (map["a"]) {
    if (player1_left > 30) {
      console.log("messi");
      let leftOffset = player1_left - 15 + "px";
      $(".player1").css("left", leftOffset);
      $(".player1").addClass("player1-walkback");
    }
  }

  if (!map["a"]) {
    $(".player1").removeClass("player1-walkback");
  }

  if (map["d"]) {
    let player1_left = parseInt(
      $(".player1")
        .css("left")
        .slice(0, $(".player1")[0].style.left.length - 2)
    );
    let player2_left = parseInt(
      $(".player2")
        .css("left")
        .slice(0, $(".player2")[0].style.left.length - 2)
    );
    if (player1_left + FIGHTER1_WIDTH < player2_left) {
      let leftOffset = player1_left + 20 + "px";
      $(".player1").css("left", leftOffset);
      $(".player1").addClass("player1-walkfoward");
    }
  }

  if (!map["d"]) {
    $(".player1").removeClass("player1-walkfoward");
  }

  if (map["w"]) {
    if (!$(".player1").hasClass("jump")) {
      $(".player1").addClass("jump");
    }
    setTimeout(() => {
      if ($(".player1").hasClass("jump")) {
        $(".player1").removeClass("jump");
      }
    }, 500);
  }

  if (map["s"]) {
    if (!$(".player1").hasClass("player1-crouch")) {
      console.log("girdi");
      $(".player1").addClass("player1-crouch");
    }
    if ($(".player1").hasClass("player1-crouch")) {
      $(".player1").delay(500).removeClass("player1-crouch");
    }
  }

  if (map["5"]) {
    let player2 = document.querySelector(".player2");
    if (!$(".player2").hasClass("player2-punch")) {
      player2.classList.add("player2-punch");
      FIGHTER2_WIDTH = $(window).width() * 0.161;
      player2_hit_detection();
    }
    setTimeout(() => {
      if ($(".player2").hasClass("player2-punch")) {
        player2.classList.remove("player2-punch");
        FIGHTER2_WIDTH = $(window).width() * 0.106;
      }
    }, 300);
  }

  if (map["4"] && !map["5"]) {
    $(".player2").addClass("player2-block");
  } else {
    $(".player2").removeClass("player2-block");
  }

  let player1_right = parseInt(
    $(".player1")
      .css("right")
      .slice(0, $(".player1")[0].style.left.length - 2)
  );

  let player2_right = parseInt(
    $(".player2")
      .css("right")
      .slice(0, $(".player2")[0].style.left.length - 2)
  );

  if (map["arrowleft"]) {
    if (player2_right + FIGHTER1_WIDTH < player1_right) {
      let rightOffset = player2_right + 20 + "px";
      $(".player2").css("right", rightOffset);
    }
  }

  if (map["arrowright"]) {
    if (player2_right > 30) {
      let rightOffset = player2_right - 15 + "px";
      $(".player2").css("right", rightOffset);
    }
  }

  if (map["arrowup"]) {
    if (!$(".player2").hasClass("jump")) {
      $(".player2").addClass("jump");
    }
    setTimeout(() => {
      if ($(".player2").hasClass("jump")) {
        $(".player2").removeClass("jump");
      }
    }, 500);
  }
});

document.addEventListener("keyup", (event) => {
  map[event.key.toLowerCase()] = false;
});

//!FIGHTER 1

document.addEventListener("keyup", (event) => {
  if (event.key == "k") {
    $(".player1").removeClass("player1-block");
  }
  if (event.key == "d") {
    $(".player1").removeClass("player1-walkfoward");
  }
  if (event.key == "a") {
    $(".player1").removeClass("player1-walkback");
  }
});

//!FIGHTER 2
document.addEventListener("keyup", (event) => {
  if (event.key == "4") {
    $(".player2").removeClass("player2-block");
  }
});

document.addEventListener("keydown", (event) => {
  let player2 = document.querySelector(".player2");
});

//!HIT DETECTIONS
const player1_hit_detection = () => {
  let player1_left =
    parseInt(
      $(".player1")
        .css("left")
        .slice(0, $(".player1").css("left").length - 2)
    ) + FIGHTER1_WIDTH;

  let player2_left = parseInt(
    $(".player2")
      .css("left")
      .slice(0, $(".player2").css("left").length - 2)
  );

  if (player1_left > player2_left + 10 && map["l"]) {
    FIGHTER1_TOGETHER = true;
  } else {
    FIGHTER1_TOGETHER = false;
  }
  if (FIGHTER1_TOGETHER) {
    if (FIGHTER2_HEALTH > 0) {
      if (map["4"]) {
        FIGHTER2_HEALTH -= 2;
        $(".player2").css("filter", "saturate(3)");
        setTimeout(() => {
          $(".player2").css("filter", "saturate(1.6)");
        }, 300);
      } else {
        FIGHTER2_HEALTH -= 4;
        $(".player2").css("filter", "saturate(3)");
        setTimeout(() => {
          $(".player2").css("filter", "saturate(1.6)");
        }, 300);
      }
    } else {
      alert("fighter1 wins.");
      window.location.reload();
    }
    FIGHTER2_HEALTH_PERC = FIGHTER2_HEALTH / 100;
    let fighter2_health_width = FIGHTER2_HEALTH_PERC * 35;
    let fighter2_health_margin = (1 - FIGHTER2_HEALTH_PERC) * 35;
    $(".player2-health-health").css("width", fighter2_health_width + "vw");
    $(".player2-health-health").css(
      "margin-left",
      fighter2_health_margin + "vw"
    );
  }
};
const player2_hit_detection = () => {
  let player2_right =
    parseInt(
      $(".player2")
        .css("right")
        .slice(0, $(".player2").css("right").length - 2)
    ) + FIGHTER2_WIDTH;
  let player1_right = parseInt(
    $(".player1")
      .css("right")
      .slice(0, $(".player1").css("right").length - 2)
  );
  if (player2_right > player1_right + 10 && map["5"]) {
    FIGHTER2_TOGETHER = true;
  } else {
    FIGHTER2_TOGETHER = false;
  }
  if (FIGHTER2_TOGETHER) {
    if (FIGHTER1_HEALTH > 0) {
      if (map["k"]) {
        FIGHTER1_HEALTH -= 2;
        $(".player1").css("filter", "saturate(3)");
        setTimeout(() => {
          $(".player1").css("filter", "saturate(1.6)");
        }, 300);
      } else {
        FIGHTER1_HEALTH -= 4;
        $(".player1").css("filter", "saturate(3)");
        setTimeout(() => {
          $(".player1").css("filter", "saturate(1.6)");
        }, 300);
      }
    } else {
      alert("fighter2 wins.");
      window.location.reload();
    }
    FIGHTER1_HEALTH_PERC = FIGHTER1_HEALTH / 100;
    let fighter1_health_width = FIGHTER1_HEALTH_PERC * 35;
    let fighter1_health_margin = (1 - FIGHTER1_HEALTH_PERC) * 35;
    $(".player1-health-health").css("width", fighter1_health_width + "vw");
  }
};

//!TIME
setInterval(() => {
  if ($(".time").html() == 0) {
    if (FIGHTER1_HEALTH > FIGHTER2_HEALTH) {
      alert("fighter1 wins.");
      window.location.reload();
    } else if (FIGHTER1_HEALTH < FIGHTER2_HEALTH) {
      alert("fighter2 wins.");
      window.location.reload();
    } else {
      alert("it is a tie.");
      window.location.reload();
    }
  }
  $(".time").html($(".time").html() - 1);
}, 1000);
