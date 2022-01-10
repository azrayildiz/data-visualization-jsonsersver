getChart()

async function getChart() {
	const data = await getData()
	// console.log(data)

	const ctx = document.getElementById('chart').getContext('2d')

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timestamp_2,
			datasets: [
				{
					label: 'Machine 2',
					labels: data.timestamp_2,
					data: data.temperature_2,
					backgroundColor: 'transparent',
					borderColor: 'green',
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
	let machine_2 = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.machine_name === 'machine-2') {
			machine_2.push(datas)
		}
		return
	})
	machine_2 = machine_2.sort((a, b) => Date.parse(a.timestamp) - Date.parse(b.timestamp))
	//machine-2
	const timestamp_2 = machine_2.map((item) => {
		return item.timestamp
	})
	const temperature_2 = machine_2.map((item) => {
		return item.temperature
	})

	return {
		timestamp_2,
		temperature_2,
	}
}
