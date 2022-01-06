getChart()

async function getChart() {
	const data = await getData()
	console.log(data)

	const ctx = document.getElementById('chart').getContext('2d')

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timestamp_5,
			datasets: [
				{
					label: 'Machine 5',
					labels: data.timestamp_5,
					data: data.temperature_5,
					backgroundColor: 'transparent',
					borderColor: 'purple',
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
	let machine_5 = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.machine_name === 'machine-5') {
			machine_5.push(datas)
		}
		return
	})

	//machine-5
	const timestamp_5 = machine_5.map((item) => {
		return item.timestamp
	})
	const temperature_5 = machine_5.map((item) => {
		return item.temperature
	})

	return {
		timestamp_5,
		temperature_5,
	}
}
