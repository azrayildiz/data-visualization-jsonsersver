//js for dashboard.html

const container = document.querySelector('.datas')

//make a request -- send a get request to endpoint
const renderPosts = async () => {
	let uri = 'http://localhost:3000/events'
	//fetch resources from the endpoint, send json server data back // get data with post
	const response = await fetch(uri)
	const events = await response.json()
	console.log(events)

	let template = ''
	events.forEach((datas) => {
		template += `
    <div class="datas">
      <h2>${datas.machine_name}</h2>
      <p>Date: ${datas.timestamp} Temperature: ${datas.temperature} </p>
      <p>${datas.body.slice(0, 300)}</p>
      <a href="/individualmachines.html> More details for the individual Machines</a>
    </div>`
	})

	container.innerHTML = template
}
//post and render them to the page --- invoking a render post function
window.addEventListener('DOMContetntLoaded', () => renderPosts())
