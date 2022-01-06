getChart()
// get chart
async function getChart() {
	const data = await getData()
	console.log(data)

	const ctx = document.getElementById('chart').getContext('2d')
	//drawing chart
	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.timestamp_90,
			datasets: [
				{
					label: 'Critical Temperatures',
					labels: data.timestamp_90,
					data: data.temperature_90, // data temperature
					backgroundColor: 'transparent',
					borderColor: 'red',
					borderWidth: 4,
				},
			],
		},
		// callback function
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
// put getData, use async and await getData before chart is going to wait data is done before it does rest of staff
async function getData() {
	let criticalTemperate = []

	const response = await fetch('http://localhost:3000/events')

	const data = await response.json()

	data.map((datas) => {
		if (datas.temperature > 90) {
			criticalTemperate.push(datas)
		}
		return
	})

	//critical temperatures > 90
	const timestamp_90 = criticalTemperate.map((item) => {
		return item.timestamp
	})
	const temperature_90 = criticalTemperate.map((item) => {
		return item.temperature
	})

	return {
		timestamp_90,
		temperature_90,
	}
}
