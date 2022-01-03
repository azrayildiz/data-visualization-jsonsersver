//js for dashboard.html
getChart()

// Chart element
async function getChart() {
	const data = await getData()
	const ctx = document.getElementById('chart').getContext('2d')

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timeStamp,
			datasets: [
				{
					label: 'Machine 2',
					data: data.temp,
					fill: false,
					backgroundColor: 'transparent',
					borderColor: 'red',
					borderWidth: 4,
				},
			],
			datasets: [
				{
					label: 'Machine 2',
					data: data.machineName,
					fill: false,
					backgroundColor: 'transparent',
					borderColor: 'red',
					borderWidth: 4,
				},
			],
			datasets: [
				{
					label: 'Machine 5',
					data: data.timeStamp,
					fill: false,
					backgroundColor: 'transparent',
					borderColor: 'red',
					borderWidth: 4,
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
	const timeStamp = []
	const temp = []
	const machineName = []
	// console.log(machineName)

	const response = await fetch('http://localhost:3000/events')
	const data = await response.text()

	const table = data.split('\n').slice(1)
	table.forEach((row) => {
		const columns = row.split(',')
		const time = columns[0]
		timeStamp.push(time)

		const temperat = columns[1]
		temp.push(temperat)

		const machine = columns[2]
		machineName.push(machine)
	})
	return { timeStamp, machineName, temp }
}
