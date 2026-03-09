const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");
const issueCount = document.getElementById("issueCount");

let allIssues = [];

/* ---------------- SPINNER ---------------- */

function showSpinner() {
  spinner.classList.remove("hidden");
  container.classList.add("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
  container.classList.remove("hidden");
}

/* ---------------- LOAD ISSUES ---------------- */

async function loadIssues() {
  showSpinner();

  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );

    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);
  } catch (error) {
    console.error("Error loading issues:", error);
  }

  hideSpinner();
}

/* ---------------- DISPLAY ISSUES ---------------- */

function displayIssues(issues) {
  container.innerHTML = "";

  issueCount.innerText = issues.length;

  issues.forEach((issue) => {
    const borderColor =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    const statusIcon =
      issue.status === "open"
        ? `<img src="assets/Open-Status.png" class="w-10">`
        : `<img src="assets/Closed-Status.png" class="w-10">`;

    const priorityColor =
      issue.priority === "high"
        ? "bg-red-100 text-red-500"
        : issue.priority === "medium"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-gray-200 text-gray-600";

    const card = `
    
    <div onclick="showModal(${issue.id})"
    class="bg-white border-t-4 ${borderColor} rounded-xl shadow hover:shadow-lg transition cursor-pointer">

      <div class="p-5">

        <div class="flex justify-between items-center mb-4">

          ${statusIcon}

          <span class="px-4 py-1 text-xs font-semibold rounded-full ${priorityColor}">
            ${issue.priority.toUpperCase()}
          </span>

        </div>

        <h3 class="font-bold text-lg mb-2">
          ${issue.title}
        </h3>

        <p class="text-gray-500 text-sm mb-4">
          ${issue.description.slice(0, 80)}...
        </p>

        <div class="flex gap-2">

          <span class="px-3 py-1 bg-red-100 text-red-500 rounded-full text-xs">
            BUG
          </span>

          <span class="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">
            HELP WANTED
          </span>

        </div>

      </div>

      <div class="border-t px-5 py-4 text-sm text-gray-500">

        #${issue.id} by ${issue.author}

        <br>

        ${new Date(issue.createdAt).toLocaleDateString()}

      </div>

    </div>

    `;

    container.innerHTML += card;
  });
}

/* ---------------- TAB FILTER ---------------- */

function setActive(tab){

document.querySelectorAll(".tabBtn").forEach(btn => {

btn.classList.remove("bg-purple-600","text-white")

})

showSpinner()

setTimeout(() => {

if(tab === "all"){

document.getElementById("allBtn")
.classList.add("bg-purple-600","text-white")

displayIssues(allIssues)

}

if(tab === "open"){

document.getElementById("openBtn")
.classList.add("bg-purple-600","text-white")

displayIssues(allIssues.filter(i => i.status === "open"))

}

if(tab === "closed"){

document.getElementById("closedBtn")
.classList.add("bg-purple-600","text-white")

displayIssues(allIssues.filter(i => i.status === "closed"))

}

hideSpinner()

},400)

}

/* ---------------- INITIAL LOAD ---------------- */

loadIssues();