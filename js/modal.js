async function showModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
)

const data = await res.json()

const issue = data.data

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDesc").innerText = issue.description

document.getElementById("modalAuthor").innerText =
"Opened by " + issue.author

document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString()

document.getElementById("modalAssignee").innerText =
issue.author

const statusEl = document.getElementById("modalStatus")

if(issue.status === "open"){

statusEl.innerText = "Opened"

statusEl.className =
"px-3 py-1 rounded-full text-xs bg-green-100 text-green-600"

}else{

statusEl.innerText = "Closed"

statusEl.className =
"px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-600"

}

const priorityEl = document.getElementById("modalPriority")

priorityEl.innerText = issue.priority.toUpperCase()

if(issue.priority === "high")
priorityEl.className =
"px-3 py-1 rounded-full bg-red-500 text-white text-xs"

if(issue.priority === "medium")
priorityEl.className =
"px-3 py-1 rounded-full bg-yellow-500 text-white text-xs"

if(issue.priority === "low")
priorityEl.className =
"px-3 py-1 rounded-full bg-gray-500 text-white text-xs"

const labels = document.getElementById("modalLabels")

labels.innerHTML = `
<span class="px-3 py-1 bg-red-100 text-red-500 rounded-full text-xs">BUG</span>
<span class="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs">HELP WANTED</span>
`

document.getElementById("modal").classList.remove("hidden")

}

function closeModal(){

document.getElementById("modal").classList.add("hidden")

}