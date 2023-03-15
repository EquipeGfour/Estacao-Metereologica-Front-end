import styled from '@emotion/styled';

export const Container = styled.div`
section{

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
            background-color: #FFFFFF;
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
                    }
                }      
    
                .localizacao{
                    display: flex;
                    flex-direction: column;
    
                    label{
                        align-items: left;
                        text-align: left;
                    }
                }
    
                .parametros{
                    display: flex;
                    flex-direction: column;
    
                    label{
                        align-items: left;
                        text-align: left;
                    }
    
                }
            }
        } 
    }
}
`;

/* cor de fundo para teste background-color: #0F6EFD; */