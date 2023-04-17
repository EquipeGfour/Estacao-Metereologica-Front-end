import styled from '@emotion/styled';

export const Container = styled.div`
  main {
    margin-top: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .welcome {
      display: flex;
      padding-top: 50px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      h1 {
        font-size: 60px;
      }
      h2 {
        font-size: 30px;
      }
    }
    .listar {
      margin-top: 35px;
      display: flex;
      gap: 8em;
      align-items: center;
      h1 {
      }
      a {
        display: flex;
        align-items: center;
        font-size: 50px;
        gap: 10px;
      }
      li {
        list-style: none;
      }
      .button {
        margin-top: 3rem;
        gap: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;  
        text-align: center;  
      }
      .estacoes{     
        justify-content: center;
        align-items: center;   
        text-align: center;
      }
      .parametros{    
        justify-content: center;
        align-items: center;   
        text-align: center;
      }
      .alertas{
        justify-content: center;
        align-items: center;   
        text-align: center;
      }
    }
  }
`;