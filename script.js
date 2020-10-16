var ADDRESS = "https://Program5-Backend.cehaliga.repl.co/item/"
var user = "";

function refreshTable( x ) 
{
  x = JSON.parse(x)
  $("#table").html("<tr><th>City</th><th>Zip</th><th>Temperature(F)</th></tr>");
  if(x != null)
  {
    for (i of x) 
    {   
      //ajax weather api on zip to get city and temp
      var link ='https://api.openweathermap.org/data/2.5/forecast?zip=';
      link += i.zipcode;
      link += "&APPID=82342127976190426f87b66b1a5c7136";

      var city = "Not Set";
      var temp = "";

      var weather;
      

      $.ajax({
        url: link,
        async:false,
        success: function(x){weather = x;},
        error:function(x){alert(link)}
      });

      if(weather.cod != "404")
      {
        city = weather.city.name;
        temp = ((parseFloat(weather.list[0].main.temp) - 273.15) * 9/5)+32
        temp = temp.toString().split(".");
        temp = temp[0] + "." + temp[1].substring(0,2);


        row = "<tr><td>"+city+"</td><td>"+i.zipcode+"</td><td>"+temp+"</td></tr>";
        $("#table").html($("#table").html()+row);
        table.html += row
      }
    }
  }
}


$("#save").click(
  function()
  {
    var zip = $("#zip").val();
    if(user != "")
    {
      $("#user").css("border-color", "green");
      if(zip != "")
      {
        $("#zip").css("border-color", "green");
        $.ajax(
        {
          url: ADDRESS,
          data: {user:user, zip:zip},
          method: "POST",
          success: refreshTable
        }
        );
      }else{
        alert("Zip code is required.")
        $("#zip").css("border-color", "red");
      }
    }else{
      alert("User must be logged in.");
      $("#user").css("border-color", "red");
    }
  }
);

$("#login").click(
  function()
  {
    user = $("#user").val();
    if(user != "")
    {
      $("#user").css("border-color", "green");
    }else{
      $("#user").css("border-color", "red");
    }
    refresh();
  }
);

setInterval(refresh, 30000);

function refresh()
{
    out = {user:user};
    var tableData = $.ajax(
      {
        url: ADDRESS,
        data: out,
        method: "GET"
      }
    );
    tableData.done(refreshTable);
    tableData.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus + JSON.stringify(jqXHR) );
    });
}
