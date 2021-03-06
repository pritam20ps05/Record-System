
function formSubmit(form) {
  for (var i = 4; i < form.length; i++) {
    if (i%2==0) {
      if (form[i].value==1 && form[i+1].value != "") {
        form[i].value = true;
      } else {
        if (form[i+1].value != "") {
          form[i].value = true;
        } else {
          form[i].value = false;
          form[i+1].value = "";
        }
      }
    }
  }

  let data = {
    id: id,
    data: {
      name: form[0].value,
      class: parseInt(form[2].value),
      section: form[3].value,
      RegistrationId: form[1].value,
      PayInfo: {
        Jan: {
          Paid: form[4].value,
          PayDate: form[5].value.split("-").reverse().join("")
        },
        Feb: {
          Paid: form[6].value,
          PayDate: form[7].value.split("-").reverse().join("")
        },
        Mar: {
          Paid: form[8].value,
          PayDate: form[9].value.split("-").reverse().join("")
        },
        Apr: {
          Paid: form[10].value,
          PayDate: form[11].value.split("-").reverse().join("")
        },
        May: {
          Paid: form[12].value,
          PayDate: form[13].value.split("-").reverse().join("")
        },
        Jun: {
          Paid: form[14].value,
          PayDate: form[15].value.split("-").reverse().join("")
        },
        Jul: {
          Paid: form[16].value,
          PayDate: form[17].value.split("-").reverse().join("")
        },
        Aug: {
          Paid: form[18].value,
          PayDate: form[19].value.split("-").reverse().join("")
        },
        Sep: {
          Paid: form[20].value,
          PayDate: form[21].value.split("-").reverse().join("")
        },
        Oct: {
          Paid: form[22].value,
          PayDate: form[23].value.split("-").reverse().join("")
        },
        Nov: {
          Paid: form[24].value,
          PayDate: form[25].value.split("-").reverse().join("")
        },
        Dec: {
          Paid: form[26].value,
          PayDate: form[27].value.split("-").reverse().join("")
        },
      }
    }

  };

  // console.log(data);
  // console.log(form);
  data = JSON.stringify(data);

  // posting data to server
  $.ajax({
    type: "POST",
    url: "/api/update", // testing is on 127.0.0.1
    data: data,
    dataType: "json",
    crossDomain: true,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    success: (e) => {
      // dataPopulator(e, 0, 20);
      Swal.fire('Saved!', '', 'success').then(() => {
        console.log(e);
        location.reload();
      });
    },
    error: (e) => {
      Swal.fire('Something went wrong', '', 'error').then(() => {
        console.log(e);
      });;
    },
  });
}

function dataDelete() {
  var url = new URL(window.location.href);
  var data = JSON.stringify({
    id: url.searchParams.get("id")
  });
  $.ajax({
    type: "POST",
    url: "/api/delete", // testing is on 127.0.0.1
    data: data,
    dataType: "json",
    crossDomain: true,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    success: (e) => {
      // dataPopulator(e, 0, 20);
      Swal.fire('Deleted!', '', 'success').then(() => {
        console.log(e);
        window.location = "/dashboard"
      });
    },
    error: (e) => {
      Swal.fire('Something went wrong', '', 'error').then(() => {
        console.log(e);
      });
    },
  });
}

function entrySectionList(cv) {
  if (cv < 11) {
    // console.log("h");
    $("#section-list-entry").html(`
      <option value="A" id="section-opt2">Section A</option>
      <option value="B" id="section-opt3">Section B</option>
      <option value="C" id="section-opt4">Section C</option>
      <option value="D" id="section-opt5">Section D</option>
    `);
  } else {
    $("#section-list-entry").html(`
      <option value="SCI" id="section-opt2">Science</option>
      <option value="COM" id="section-opt3">Commerce</option>
      <option value="HUM" id="section-opt4">Humanities</option>
    `);
  }
}

$("document").ready(() => {
  $("#upd-form").submit((e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "The modification will be irreversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, modify it!'
    }).then((result) => {
      if (result.isConfirmed) {
        formSubmit($("#upd-form").serializeArray());
        // Swal.fire('Saved!', '', 'success');
      } else {
        Swal.fire('The changes were not saved', '', 'info');
      }
    })
    // console.log($("#inp-form").serializeArray());
  });

  $("#del-btn").click(() => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dataDelete();
        // Swal.fire('Saved!', '', 'success');
      } else {
        Swal.fire('The entry was not deleted!', '', 'info');
      }
    })
  })

  $("#enb-edit").click(() => {
    $(".form-data").prop("disabled", (i, v) => {
      return !v;
    });
  });

  $("#class-list-entry").change(() => {
    var v = $("#class-list-entry").val();
    entrySectionList(parseInt(v));
  });
});
