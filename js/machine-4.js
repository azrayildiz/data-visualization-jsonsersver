//js for dashboard.html
getChart()

// Chart element
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
					data: data.temperature_4,
					backgroundColor: 'transparent',
					borderColor: 'orange',
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
	let machine_1 = []
	let machine_2 = []
	let machine_3 = []
	let machine_4 = []
	let machine_5 = []
	let criticeTemperate = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.temperature > 90) {
			criticeTemperate.push(datas)
		} else if (datas.machine_name === 'machine-1') {
			machine_1.push(datas)
		} else if (datas.machine_name === 'machine-2') {
			machine_2.push(datas)
		} else if (datas.machine_name === 'machine-3') {
			machine_3.push(datas)
		} else if (datas.machine_name === 'machine-4') {
			machine_4.push(datas)
		} else {
			machine_5.push(datas)
		}
	})
	console.log(criticeTemperate)

	//machine-1
	const timestamp_1 = machine_1.map((item) => {
		return item.timestamp
	})

	const machineId_1 = machine_1.map((item) => {
		return item.machine_id
	})

	const machineName_1 = machine_1.map((item) => {
		return item.machine_name
	})

	const temperature_1 = machine_1.map((item) => {
		return item.temperature
	})

	//machine-2
	const timestamp_2 = machine_2.map((item) => {
		return item.timestamp
	})

	const machineId_2 = machine_2.map((item) => {
		return item.machine_id
	})

	const machineName_2 = machine_2.map((item) => {
		return item.machine_name
	})

	const temperature_2 = machine_2.map((item) => {
		return item.temperature
	})

	//machine-3
	const timestamp_3 = machine_3.map((item) => {
		return item.timestamp
	})

	const machineId_3 = machine_3.map((item) => {
		return item.machine_id
	})

	const machineName_3 = machine_3.map((item) => {
		return item.machine_name
	})

	const temperature_3 = machine_3.map((item) => {
		return item.temperature
	})

	//machine-4
	const timestamp_4 = machine_4.map((item) => {
		return item.timestamp
	})

	const machineId_4 = machine_4.map((item) => {
		return item.machine_id
	})

	const machineName_4 = machine_4.map((item) => {
		return item.machine_name
	})

	const temperature_4 = machine_4.map((item) => {
		return item.temperature
	})

	//machine-5
	const timestamp_5 = machine_5.map((item) => {
		return item.timestamp
	})

	const machineId_5 = machine_5.map((item) => {
		return item.machine_id
	})

	const machineName_5 = machine_5.map((item) => {
		return item.machine_name
	})

	const temperature_5 = machine_5.map((item) => {
		return item.temperature
	})

	return {
		timestamp_1,
		temperature_1,
		timestamp_2,
		temperature_2,
		timestamp_3,
		temperature_3,
		timestamp_4,
		temperature_4,
		timestamp_5,
		temperature_5,
	}
}
