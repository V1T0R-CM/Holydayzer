import express from 'express';
import cors from 'cors';

const server = express();
server.use(cors());


const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];

server.get("/holidays", (req, res) => {
    res.send(holidays);
});

server.get('/holidays/:mes', (req, res) => {
    const mesRequerido = req.params.mes;
    res.send(holidays.filter(dataComemorativa => Number(dataComemorativa.date.split("/")[0])===Number(mesRequerido)));
});

server.get("/is-today-holiday", (req, res) => {
    let ehFeriado = false;
    const hoje = new Date();
    const [diaHoje,mesHoje,anoHoje]=hoje.toLocaleDateString().split("/");
    for(let dataComemorativa of holidays){
        let [mes, dia, ano]=dataComemorativa.date.split("/");
        if(Number(dia)===Number(diaHoje) && Number(mes)===Number(mesHoje) && Number(ano)===Number(anoHoje)){
            ehFeriado=true;
            break;
        }
    }
    if(ehFeriado){
        res.send(`Sim, hoje é ${dataComemorativa.name}`);
    }
    else{
        res.send("Não, hoje não é feriado");
    }
})

server.listen(3000);