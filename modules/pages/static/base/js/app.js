// main control area
$("document").ready(() => {
  
  // adds smart navigation to the mobile layout
  var mobilenav = false;
  $("#hamburger").click((e) => {
    if (!mobilenav) {
      $(".m-nav").animate({ height: "150px" }, 700);
      mobilenav = true;
    } else {
      $(".m-nav").animate({ height: "0px" }, 700);
      mobilenav = false;
    }
  });
});

// var l = [
//   {
//     id: "data45",
//     name: "Manas Das",
//     class: "10",
//     section: "C",
//     reg_no: "533N08",
//     paid: "no",
//     date: "--",
//   },
//   {
//     id: "data65",
//     name: "Hulo Das",
//     class: "10",
//     section: "D",
//     reg_no: "522N08",
//     paid: "no",
//     date: "--",
//   },
//   {
//     id: "data15",
//     name: "Subham Das",
//     class: "10",
//     section: "C",
//     reg_no: "532N08",
//     paid: "no",
//     date: "--",
//   },
// ];
// dataPopulator(l, 0, 4);
