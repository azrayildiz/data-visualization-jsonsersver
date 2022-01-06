getChart()
// const years = []
// const months = []
// // console.log('months', months)
// const weeks = []

async function getChart() {
	const data = await getData()

	// console.log(data)

	const ctx = document.getElementById('chart').getContext('2d')

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timestamp_1,
			datasets: [
				{
					label: 'Machine 1',
					labels: data.timestamp_1,
					data: data.temperature_1,
					backgroundColor: 'transparent',
					borderColor: 'maroon',
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
	let machine_1 = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.machine_name === 'machine-1') {
			machine_1.push(datas)
		}
		return
	})

	//machine-1
	const timestamp_1 = machine_1.map((item) => {
		return item.timestamp
	})
	const temperature_1 = machine_1.map((item) => {
		return item.temperature
	})
	// get years and months
	// timestamp_1.map((timestamp) => {
	// 	console.log('timestamp', typeof timestamp)
	// 	const date = new Date(timestamp)
	// 	const year = date.getFullYear()
	// 	const month = date.getMonth()
	// 	months.push(month)
	// 	months.sort(function (a, b) {
	// 		return a - b
	// 	})
	// 	years.push(year)
	// 	years.sort(function (a, b) {
	// 		return a - b
	// 	})
	// console.log('years', years)
	// })
	return {
		timestamp_1,
		temperature_1,
	}
}
