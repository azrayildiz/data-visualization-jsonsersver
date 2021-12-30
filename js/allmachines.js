//js for allmachines.html

const container = document.querySelector('.datas')

//make a request -- send a get request to endpoint
const fetchEventsJSON = async () => {
	const res = await fetch('http://localhost:3000/events')
	const events = await res.json()
	return events
}
// fetchEventsJSON().then((events) => {
// 	events
// })
let template = ''
fetchEventsJSON().then((events) => {
	console.log(events)

	events.forEach((datas) => {
		template += `
    <div class="datas">
      <h2>${datas.machine_name}</h2>
      <p>Date: ${datas.timestamp} Temperature: ${datas.temperature} </p>
      <p>${datas.machine_id.slice(0, 300)}</p>

      <a href="/machines.html?machine_id=${datas.machine_id}> More details for the individual Machines</a>
    </div>`
	})
})
container.innerHTML = template

//post and render them to the page --- invoking a render post function
window.addEventListener('DOMContetntLoaded', () => renderPosts())
