import styled from '@emotion/styled';

export const Container = styled.div`
section{
    color: #737479;
    p{
        margin-top: 0px;
        font-size: 1.5vw;
        color: #000;
    }
    header{
        z-index: 100;
        width: 100vw;
        top: 0;
        position: fixed;
    }
    main{
        margin-top: 4em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        .card{
            margin-top: 3em ;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border-radius: 8px;
            box-shadow: 3px 1px 2px 2px gray, -1px 0 0.4px gray;
            background-color: #ffffff;
            width: 500px;
            hight: 700px;
            .campos{
                display: flex;
                flex-direction: column;
                width: 25vw;
                padding: 5%;
    
                .estacaoNome{
                    display: flex;
                    flex-direction: column;
    
                    label{
                        align-items: left;
                        text-align: left;
                    }
                }
    
                .descricao{
                    display: flex;
                    flex-direction: column;
    
                    label{
                        align-items: left;
                        text-align: left;
                        margin-top: 5px;
                    }
                }      
    
                .localizacao{
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
    
                    label{
                        align-items: left;
                        text-align: left;
                        margin-top: 5px;
                    }

                }
                small{
                    margin-top: 5px ;
                    display: flex;
                    align-items: left;
                    color: #5652C7;
                }
                
                .parametros-e-alertas{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
    
                    label{
                        align-items: left;
                        text-align: left;
                        margin-top: 5px;
                    }
                    .parametros{
                        display: flex;
                        flex-direction: column;
                        width: 48%;
                    }
                    .alertas{
                        display: flex;
                        flex-direction: column;
                        width: 48%;
                        
                    }
                }
                .botao{
                    display: flex;
                    margin-top: 18px;
                    
                    Button{
                        width: 100%;
                    }
                }
                .linha{
                    margin-top: 18px ;
                    width: 100%;
                    border: 1px solid #858796;
                }
                .criar-conta{
                    margin-top: 18px ;
                    display: flex;
                    justify-content: space-between;
                    color: #3E3B8E;
                    font-size: 1vw;
                }
            }
        } 
    }
}
`;

/* cor de fundo para teste background-color: #0F6EFD; */