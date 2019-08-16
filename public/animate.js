
$(document).ready(function(){
    setInterval(function(){
        var colors = ["#f69679", "#fdc689", "#fff799", "#a3d39c", "#7da7d9"]
        var index =[0, 1, 2, 3, 4]

        index = shuffle(index);

        $("#red_box").css("background-color", colors[index[0]]);
        $("#orange_box").css("background-color", colors[index[1]]);
        $("#yellow_box").css("background-color", colors[index[2]]);
        $("#green_box").css("background-color", colors[index[3]]);
        $("#blue_box").css("background-color", colors[index[4]]);

        $("#red_box1").css("background-color", colors[index[0]]);
        $("#orange_box1").css("background-color", colors[index[1]]);
        $("#yellow_box1").css("background-color", colors[index[2]]);
        $("#green_box1").css("background-color", colors[index[3]]);
        $("#blue_box1").css("background-color", colors[index[4]]);

        $("#red_box2").css("background-color", colors[index[0]]);
        $("#orange_box2").css("background-color", colors[index[1]]);
        $("#yellow_box2").css("background-color", colors[index[2]]);
        $("#green_box2").css("background-color", colors[index[3]]);
        $("#blue_box2").css("background-color", colors[index[4]]);
    }, 1500)

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
})
