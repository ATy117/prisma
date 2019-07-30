
$(document).ready(function(){
    setInterval(function(){
        var colors = ["#f69679", "#fdc689", "#fff799", "#a3d39c", "#7da7d9"]
        var index =[0, 1, 2, 3, 4]

        index = shuffle(index);

        $("#red_display").css("background-color", colors[index[0]]);
        $("#orange_display").css("background-color", colors[index[1]]);
        $("#yellow_display").css("background-color", colors[index[2]]);
        $("#green_display").css("background-color", colors[index[3]]);
        $("#blue_display").css("background-color", colors[index[4]]);
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