getChart()

async function getChart() {
	const data = await getData()
	console.log(data)

	const ctx = document.getElementById('chart').getContext('2d')

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timestamp_3,
			datasets: [
				{
					label: 'Machine 3',
					labels: data.timestamp_3,
					data: data.temperature_3,
					backgroundColor: 'transparent',
					borderColor: 'blue',
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
	let machine_3 = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.machine_name === 'machine-3') {
			machine_3.push(datas)
		}
		return
	})

	//machine-3
	const timestamp_3 = machine_3.map((item) => {
		return item.timestamp
	})
	const temperature_3 = machine_3.map((item) => {
		return item.temperature
	})

	return {
		timestamp_3,
		temperature_3,
	}
}
