import styled from "@emotion/styled";

export const View = styled.div`

.map{
    width: 850px;
    height: 450px;
    background-color: #ffffff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 5px #b6b6b6;
}

.formato{
    width: 90%;
    margin: 0 auto;
}
.view{
    width:90%;
    margin: 0 auto;
    margin-top: 50px;
}
.h2{
    text-align: center;
    margin-top: 0;
    color: #5652C7;
}
.descricao{
    width: 70%;
}
.texto{

    text-align: start;
    margin-top: 0;
    margin-right: 3vw ;
    
}
.parametrosDivs{
    display: flex;
    padding: 5%;

}
.ParametrosEspecificos{
    text-align: center;
    height: 170px;
    width: 32%;
    
    border-radius: 25px;
background: white;
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
             margin: 0 auto;
}
p{width:65%}

.container {
  display: flex; /* or inline-flex */
  justify-content: space-between;
}
p{
    color: #5652C7;
}

.Parametros{
    width: 381px;
    height: 180px;  
}

.nivel1{
color: #C75267;
font-size: 35px;
}
.nivel2{
color: #00FFFF;
font-size: 35px;
}
.nivel3{
color: #5652C7;
font-size: 35px;
}
.Valores{
    font-size: 40px;
    color: black;
    margin: 0 auto;
}
.grafico{
    border-radius: 25px;
    width: 90%;
    margin: 0 auto;
    margin-top: 30px;
    padding: 45px;
    background-color: #ffffff;
    box-shadow: 2px 2px 5px #b6b6b6;
    margin-bottom: 50px;
}
.botaoEditar{
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
    margin-top: 0;
    color: #5652C7;
    text-align: start;
    margin-top: 0;
    margin-right: 3vw ;
}
.parametrosview{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    box-shadow: 2px 2px 5px #b6b6b6;
    background-color: #ffffff;
    border-radius: 15px;
    padding: 5px;
}

`