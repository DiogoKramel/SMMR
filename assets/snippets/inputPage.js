function PlaySound(melody) {
    var path = "assets/sounds/"
    var snd = new Audio(path + melody + ".mp3");
    snd.play();
}

$(document).ready(function(){
    $("#btn1").click(function(){
      $("#test1").text("BLUE WHALE SELECTED");
      $("#test2").text("SPERM WHALE");
      $("#test3").text("FIN WHALE");
      $("#test4").text("RIGHT WHALE");
      $("#test5").text("HUMPBACK WHALE");
      $("#test6").text("GRAY WHALE");
      $("#test6").text("ALTERNATIVE WHALE");
      $("#btn1").addClass('button-clicked-whale');
      $("#btn2").removeClass("button-clicked-whale");
      $("#btn3").removeClass("button-clicked-whale");
      $("#btn4").removeClass("button-clicked-whale");
      $("#btn5").removeClass("button-clicked-whale");
      $("#btn6").removeClass("button-clicked-whale");
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
    $("#btn2").click(function(){
      $("#test1").text("BLUE WHALE");
      $("#test2").text("SPERM WHALE SELECTED");
      $("#test3").text("FIN WHALE");
      $("#test4").text("RIGHT WHALE");
      $("#test5").text("HUMPBACK WHALE");
      $("#test6").text("GRAY WHALE");
      $("#test7").text("ALTERNATIVE WHALE");
      $("#btn1").removeClass("button-clicked-whale");
      $("#btn2").addClass("button-clicked-whale");
      $("#btn3").removeClass("button-clicked-whale");
      $("#btn4").removeClass("button-clicked-whale");
      $("#btn5").removeClass("button-clicked-whale");
      $("#btn6").removeClass("button-clicked-whale");
      $("#btn7").removeClass("button-clicked-whale");
    });
  });
  
$(document).ready(function(){
    $("#btn3").click(function(){
      $("#test1").text("BLUE WHALE");
      $("#test2").text("SPERM WHALE");
      $("#test3").text("FIN WHALE SELECTED");
      $("#test4").text("RIGHT WHALE");
      $("#test5").text("HUMPBACK WHALE");
      $("#test6").text("GRAY WHALE");
      $("#test7").text("ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").addClass('button-clicked-whale');
      $("#btn4").removeClass('button-clicked-whale');
      $("#btn5").removeClass('button-clicked-whale');
      $("#btn6").removeClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
    $("#btn4").click(function(){
      $("#test1").text("BLUE WHALE");
      $("#test2").text("SPERM WHALE");
      $("#test3").text("FIN WHALE");
      $("#test4").text("RIGHT WHALE SELECTED");
      $("#test5").text("HUMPBACK WHALE");
      $("#test6").text("GRAY WHALE");
      $("#test7").text("ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").removeClass('button-clicked-whale');
      $("#btn4").addClass('button-clicked-whale');
      $("#btn5").removeClass('button-clicked-whale');
      $("#btn6").removeClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
    $("#btn5").click(function(){
      $("#test1").text("BLUE WHALE");
      $("#test2").text("SPERM WHALE");
      $("#test3").text("FIN WHALE");
      $("#test4").text("RIGHT WHALE");
      $("#test5").text("HUMPBACK WHALE SELECTED");
      $("#test6").text("GRAY WHALE");
      $("#test7").text("ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").removeClass('button-clicked-whale');
      $("#btn4").removeClass('button-clicked-whale');
      $("#btn5").addClass('button-clicked-whale');
      $("#btn6").removeClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

 $(document).ready(function(){
    $("#btn6").click(function(){
      $("#test1").text("BLUE WHALE");
      $("#test2").text("SPERM WHALE");
      $("#test3").text("FIN WHALE");
      $("#test4").text("RIGHT WHALE");
      $("#test5").text("HUMPBACK WHALE");
      $("#test6").text("GRAY WHALE SELECTED");
      $("#test7").text("ALTERNATIVE WHALE");
      $("#btn1").removeClass('button-clicked-whale');
      $("#btn2").removeClass('button-clicked-whale');
      $("#btn3").removeClass('button-clicked-whale');
      $("#btn4").removeClass('button-clicked-whale');
      $("#btn5").removeClass('button-clicked-whale');
      $("#btn6").addClass('button-clicked-whale');
      $("#btn7").removeClass("button-clicked-whale");
    });
});

$(document).ready(function(){
  $("#btn7").click(function(){
    $("#test1").text("BLUE WHALE");
    $("#test2").text("SPERM WHALE");
    $("#test3").text("FIN WHALE");
    $("#test4").text("RIGHT WHALE");
    $("#test5").text("HUMPBACK WHALE");
    $("#test6").text("GRAY WHALE");
    $("#test7").text("ALTERNATIVE WHALE SELECTED");
    $("#btn1").removeClass('button-clicked-whale');
    $("#btn2").removeClass('button-clicked-whale');
    $("#btn3").removeClass('button-clicked-whale');
    $("#btn4").removeClass('button-clicked-whale');
    $("#btn5").removeClass('button-clicked-whale');
    $("#btn6").removeClass('button-clicked-whale');
    $("#btn7").addClass('button-clicked-whale');
  });
});