$(document).ready(function () {
  $(document).on("click", "#dbSyncBtn", function (e) {
    alert("You clicked the element with and ID of 'test-element'");
    console.log("🚀 ~ document:fdfgfd");

    e.preventDefault();

    // Show the modal and spinner
    $("#dbBackup").modal("show");

    $.ajax({
      url: "/dbSync",
      type: "GET",
      success: function (result) {
        // Hide the modal
        $("#dbBackup").modal("hide");

        // Use a small delay to ensure the hide operations are completed
        setTimeout(function () {
          window.location.reload();
        }, 100);

        return false;
      },
      error: function () {
        // Hide the modal
        $("#dbBackup").modal("hide");

        // Use a small delay to ensure the hide operations are completed
        setTimeout(function () {
          alert("Database sync failed");
          window.location.reload();
        }, 100);
      },
    });
  });
});
