var timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

function openPopup(el, eventId) {
  $("#addEvent").addClass("active");
  $("#selDay").val(el.day);
  $("#selMonth").val(el.month);
  $("#selYear").val(el.year);
  $("#evID").val(eventId);
  $(".container").addClass("background-overlay");
};

$("#grupa-form").submit(function(e) {
  e.preventDefault();
  var form = $(this);

  var formdata = form.serializeArray();
  createEvent(formdata);
  closePopup();
  renderCalendarCells();
});

$("#grupa-form-delete").submit(function(e) {
  e.preventDefault();
  var form = $(this);
  var formdata = form.serializeArray();

  deleteEventById(formdata[0].value, true);
  closePopup();
  renderCalendarCells();
});

$("#grupa-form-edit").submit(function(e) {
  e.preventDefault();
  var form = $(this);
  var formdata = form.serializeArray();
  var eventID = formdata[5].value;

  updateEvent(eventID, formdata);
  closePopup();
  renderCalendarCells();
});

$(".popup-close").on("click", function() {
  closePopup();
});


function openEdit(el, el2, eventId) {
  $("#editEvent").addClass("active");
  $("#name-1").val(el2.title);
  $("#time-1").val(el2.time);
  $("#selDay-1").val(el.day);
  $("#selMonth-1").val(el.month);
  $("#selYear-1").val(el.year);
  $("#evID-1").val(eventId);
  $("#evID-2").val(eventId);
  $(".title").append(el2.title);
  $(".start").append(el2.time);
  $(".timezone").append(timeZone);
};

function closePopup() {
  $(".popup-overlay").removeClass("active");
  $(".container").removeClass("background-overlay");
}
