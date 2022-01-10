getChart()

async function getChart() {
	const data = await getData()
	console.log(data)

	const ctx = document.getElementById('chart').getContext('2d')

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timestamp_4,
			datasets: [
				{
					label: 'Machine 4',
					labels: data.timestamp_4,
					data: data.temperature_4,
					backgroundColor: 'transparent',
					borderColor: 'orange',
					borderWidth: 2,
				},
			],
		},

		options: {
			elements: {
				line: {
					tension: 0,
				},
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
								callback: function (value, index, values) {
									return index + 'grad'
								},
							},
						},
					],
				},
			},
		},
	})
}

async function getData() {
	let machine_4 = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.machine_name === 'machine-4') {
			machine_4.push(datas)
		}
		return
	})
	machine_4 = machine_4.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
	//machine-4
	const timestamp_4 = machine_4.map((item) => {
		return item.timestamp
	})
	const temperature_4 = machine_4.map((item) => {
		return item.temperature
	})

	return {
		timestamp_4,
		temperature_4,
	}
}
