const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT ?? 3030; 
app.use(express.json());
const fs = require('fs');

//const data = fs.readFileSync('mcok.csv');
//console.log(data.toString().split(',').toString().split('\r\n'));
//const dt = [data.toString().split(',').toString().split('\r\n')];
//const setHeaders = dt[0][0];
//console.log(setHeaders);

class DPipeline{
	constructor(file_name){
		this.file_name = file_name;
		this.header = [];
		this.response = [];
	}
	
	transformA(data){
		//console.log(data.length)
		var fdata = {}
		for(let d =0; d < data.length;d++){
			if(!d) this.header = data[d].toString().split(',');
			var tmp = data[d].toString().split(',');
			this.text = '';
			this.header.map((value, i)=>{	
				if (!i){this.text +=`{"${value}":"${tmp[i]}",`}
				else if (!!i && i<this.header.length-1){this.text+=`"${value}":"${tmp[i]}",`}
				else{this.text+= `"${value}":"${tmp[i]}"}`}
			});
			this.response.push(JSON.parse(this.text));
		}
		console.log(this.response)

	}
	
	readCsv(){
		const data = fs.readFileSync(this.file_name);
		//console.log(data)
		const dt = data.toString().split(',').toString().split('\r\n');
		//console.log(dt)
		
		this.transformA(dt)
	}
}

const mockdata = new DPipeline('mcok.csv');
mockdata.readCsv()



app.get('/', (req,res)=>{
	res.send({
		name:'Thiago',
		age:21,
		gender: 'M'
	});
});

app.listen(PORT, ()=>{
	console.log(`running at ${PORT}`)
});