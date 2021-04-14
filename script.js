var done = false;

var observer = new MutationObserver(function (mutations) {
    if(done) {
        return;
    }

    var tableBody = document.querySelector("#RunningJobGrid > table > tbody");

    if(!tableBody) {
        return;
    }

    var borderStyle = "border-style:solid;border-width:1px 0 0 1px";

    var totalRow = document.createElement("tr");
    totalRow.setAttribute("role", "row");

    var leftSpacer = document.createElement("td");
    leftSpacer.setAttribute("colspan", "5");
    leftSpacer.setAttribute("style", "border-style:solid;border-width:1px 0 0 0");
    leftSpacer.innerText = "Totals";

    var cells_percent = tableBody.querySelectorAll("td:nth-child(6)");
    var percent = 0;
    cells_percent.forEach(function(cell)
    {
        percent += parseFloat(cell.innerText);
    });
    var totalCell_percent = document.createElement("td");
    totalCell_percent.setAttribute("style", borderStyle);
    totalCell_percent.innerText = "" + percent + " (-" + (100-percent).toFixed(1) + ")";

    var cells_tokens = tableBody.querySelectorAll("td:nth-child(7)");
    var tokens = 0;
    cells_tokens.forEach(function(cell)
    {
        tokens += parseFloat(cell.innerText);
    });
    var totalCell_tokens = document.createElement("td");
    totalCell_tokens.setAttribute("style", borderStyle);
    totalCell_tokens.innerText = "" + tokens + " (-" + (Math.floor(tokens/(percent/100)-tokens)) + ")";

    var rightSpacer = document.createElement("td");
    rightSpacer.setAttribute("colspan", "3");
    rightSpacer.setAttribute("style", borderStyle);

    totalRow.appendChild(leftSpacer);
    totalRow.appendChild(totalCell_percent);
    totalRow.appendChild(totalCell_tokens);
    totalRow.appendChild(rightSpacer);
    tableBody.appendChild(totalRow);
});
observer.observe(document.body, { childList: true, subTree: true });