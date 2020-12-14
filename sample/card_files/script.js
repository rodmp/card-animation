(function() {
  var flip_card, open_env;

window.onload = function(){
   setInterval(function(){
    return open_env();
   }, 3000);
};

  $(document).ready(function () {
  $("#pop").click(function () {
    $('#myModal').modal('show'); 
  });
});

  $(".js-first-flip, .flip-btn").on("click", function() {
    flip_card();
    return $('.cards-btn').css({
      opacity: 1
    });

  });

  flip_card = function() {
    return $(".env-card--inner").toggleClass("is-flipped");
  };

  open_env = function() {
    $(".section--cards").addClass("is-opened");
    return $(".env-btn").fadeOut();
  };

    $(document).ready(function () {
  $("#pop").click(function () {
    $('#myModal').modal('show'); 
  });
});

    // Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLFNBQUEsRUFBQTs7RUFBQSxDQUFBLENBQUUsMkJBQUYsQ0FBOEIsQ0FBQyxFQUEvQixDQUFrQyxPQUFsQyxFQUEyQyxRQUFBLENBQUEsQ0FBQTtJQUN2QyxTQUFILENBQUE7V0FDQSxDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsR0FBaEIsQ0FBb0I7TUFBQyxPQUFBLEVBQVM7SUFBVixDQUFwQjtFQUYwQyxDQUEzQzs7RUFJQSxDQUFBLENBQUUsY0FBRixDQUFpQixDQUFDLEVBQWxCLENBQXFCLE9BQXJCLEVBQThCLFFBQUEsQ0FBQSxDQUFBO1dBQzFCLFFBQUgsQ0FBQTtFQUQ2QixDQUE5Qjs7RUFHQSxTQUFBLEdBQVksUUFBQSxDQUFBLENBQUE7V0FDWCxDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxXQUF0QixDQUFrQyxZQUFsQztFQURXOztFQUdaLFFBQUEsR0FBVyxRQUFBLENBQUEsQ0FBQTtJQUNWLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLFFBQXJCLENBQThCLFdBQTlCO1dBQ0EsQ0FBQSxDQUFFLFVBQUYsQ0FBYSxDQUFDLE9BQWQsQ0FBQTtFQUZVO0FBVlgiLCJzb3VyY2VzQ29udGVudCI6WyIkKFwiLmpzLWZpcnN0LWZsaXAsIC5mbGlwLWJ0blwiKS5vbiBcImNsaWNrXCIsIC0+XG5cdGRvIGZsaXBfY2FyZFxuXHQkKCcuY2FyZHMtYnRuJykuY3NzKHtvcGFjaXR5OiAxfSlcblxuJChcIi5qcy1vcGVuLWVudlwiKS5vbiBcImNsaWNrXCIsIC0+XG5cdGRvIG9wZW5fZW52XG5cdFx0XHRcbmZsaXBfY2FyZCA9ICgpLT4gXG5cdCQoXCIuZW52LWNhcmQtLWlubmVyXCIpLnRvZ2dsZUNsYXNzIFwiaXMtZmxpcHBlZFwiXG5cbm9wZW5fZW52ID0gKCktPlxuXHQkKFwiLnNlY3Rpb24tLWNhcmRzXCIpLmFkZENsYXNzIFwiaXMtb3BlbmVkXCJcblx0JChcIi5lbnYtYnRuXCIpLmZhZGVPdXQoKVxuXHRcdFxuIl19
//# sourceURL=coffeescript

$(function() {

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var limit_flake = 50;
    setInterval(function() {
        let dimension = randomInt(3, 9) + "px";
        var flake = "<div class='drop animate' style='left:" + randomInt(10, window.innerWidth - 20) + "px;width:" + dimension + ";height:" + dimension + "'></div>";
        $('body').append(flake);

        var list_flake = $('.drop');
        if (list_flake.length > limit_flake) list_flake[list_flake.length - 1].remove();
    }, 200);
})