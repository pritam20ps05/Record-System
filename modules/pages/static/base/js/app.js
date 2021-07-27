let date_src = false;
var resp_data = []; // stores server response
var cp = 0; // current page count
var tp = 0; // total page count
var page_capacity = 10;

// fetches data from forms and posts it to server
function formFetch(form) {
  let query = {};
  if (form[0].value != "") {
    query["name"] = form[0].value;
  }
  if (form[1].value != "") {
    query["class"] = parseInt(form[1].value);
  }
  if (form[2].value != "") {
    query["section"] = form[2].value;
  }
  if (form[3].value != "") {
    query["reg_no"] = form[3].value;
  }
  if (form[4].value != "" && !date_src) {
    query["month"] = form[4].value;
  }
  if (form[5].value != "" && date_src) {
    date = form[5].value.split("-").reverse().join("");
    query["date"] = date;
  }
  if (form[6].name != "advanced") {
    if (form[6].value != "") {
      if (form[6].value === "0") {
        query["paid"] = false;
      } else {
        query["paid"] = true;
      }
    }
  } else if (form[7].value != "") {
    if (form[7].value === "0") {
      query["paid"] = false;
    } else {
      query["paid"] = true;
    }
  }

  console.log(query);
  // console.log(form);
  query = JSON.stringify(query);

  // posting data to server
  $.ajax({
    type: "POST",
    url: "/api/search", // testing is on 127.0.0.1
    data: query,
    dataType: "json",
    crossDomain: true,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    success: (e) => {
      // dataPopulator(e, 0, 20);
      resp_data = e;
      renderData(true);
    },
    error: (e) => {
      console.log(e);
    },
  });
}

// controls the advanced date search
function dateAdvanced() {
  $("#mnth-list").toggleClass("hidden");
  $("#date-inp").toggleClass("hidden");
  $("#mnth-wraper").toggleClass("text select");
  date_src = !date_src;
  if (date_src) {
    $("#dsrc").html("Date:");
  } else {
    $("#dsrc").html("Month:");
  }
  // console.log(date_src);
}

function dataPopulator(list, start_index, delimeter) {
  var stop_index = start_index + delimeter;
  // var nlist = list.slice(start_index, list.length);
  $("#data-table").html("");
  for (let i = start_index; i < stop_index && i < list.length; i++) {
    if ((i - start_index) % 2 === 0) {
      $("#data-table").append(`<div id="${
        list[i]["id"]
      }" onclick="tableClickEvent(id)" class="data-component high">
      <div class="inner-data">
        <h5>${i + 1}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["name"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["class"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["section"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["reg_no"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["paid"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["date"]}</h5>
      </div>
    </div>`);
    } else {
      $("#data-table").append(`<div id="${
        list[i]["id"]
      }" onclick="tableClickEvent(id)" class="data-component low">
      <div class="inner-data">
        <h5>${i + 1}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["name"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["class"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["section"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["reg_no"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["paid"]}</h5>
      </div>
      <div class="inner-data">
        <h5>${list[i]["date"]}</h5>
      </div>
    </div>`);
    }
  }
  if (list.length === 0) {
    $("#data-table").html(`
      <div class="msg">
        <div class="inner-data msgd">
          <h5>Nothing to show</h5>
        </div>
      </div>
    `);
  }
}

// start of pagination logic
function calcPagination(initialMode) {
  if (initialMode) {
    tp = parseInt(resp_data.length / page_capacity);
    if (resp_data.length % page_capacity === 0) {
      if (tp != 0) {
        tp = tp - 1;
      }
    }
    $("#total-page").html(tp + 1);
  }
  $("#cur-page").html(cp + 1);
}

function renderData(init) {
  calcPagination(init);
  dataPopulator(resp_data, cp * page_capacity, page_capacity);
}

function pagination(frd) {
  if (!frd) {
    if (cp > 0) {
      cp = cp - 1;
      renderData(false);
    }
  } else {
    if (cp < tp) {
      cp = cp + 1;
      renderData(false);
    }
  }
}
// end of pagination logic

function tableClickEvent(id) {
  // console.log(id);
  window.location = "/entry?id=" + id;
}

// change the section selection tab on class select
function sectionList(cv) {
  if (cv != 0) {
    if (cv < 11) {
      // console.log("h");
      $("#section-list").html(`
        <option value="" id="section-opt1">All</option>
        <option value="A" id="section-opt2">Section A</option>
        <option value="B" id="section-opt3">Section B</option>
        <option value="C" id="section-opt4">Section C</option>
        <option value="D" id="section-opt5">Section D</option>
      `);
    } else {
      $("#section-list").html(`
        <option value="" id="section-opt1">All</option>
        <option value="SCI" id="section-opt2">Science</option>
        <option value="COM" id="section-opt3">Commerce</option>
        <option value="HUM" id="section-opt4">Humanities</option>
      `);
    }
  } else {
    $("#section-list").html(`
        <option value="" id="section-opt1">All</option>
        <option value="A" id="section-opt2">Section A</option>
        <option value="B" id="section-opt3">Section B</option>
        <option value="C" id="section-opt4">Section C</option>
        <option value="D" id="section-opt5">Section D</option>
        <option value="SCI" id="section-opt2">Science</option>
        <option value="COM" id="section-opt3">Commerce</option>
        <option value="HUM" id="section-opt4">Humanities</option>
      `);
  }
}

// main control area
$("document").ready(() => {
  // resets the checkbox and adds onchange event listener
  $("#adv").prop("checked", false);
  $("#adv").change(dateAdvanced);
  $("#inp-form").submit((e) => {
    e.preventDefault();
    // console.log($("#inp-form").serializeArray());
    formFetch($("#inp-form").serializeArray());
  });

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

  // change the secton list on class change
  $("#class-list").change(() => {
    var v = $("#class-list").val();
    if (v === "") {
      sectionList(0);
    } else {
      sectionList(parseInt(v));
    }
  });

  $("#add-btn").click(() => {
    window.location = "/add";
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
