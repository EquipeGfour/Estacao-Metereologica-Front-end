from selenium.webdriver.common.by import By

class CrudEstacoesLocators():
    BTN_CADASTRO = (By.XPATH, '//*[@id="root"]/div/main/div[2]/div[1]/div/button[1]')
    BTN_LISTAGEM = (By.XPATH, '//*[@id="root"]/div/main/div[2]/div[1]/div/button[2]')

    TEXT_NOME = (By.XPATH, '//*[@id="root"]/div/section/main/div/div/form/div[1]/input')
    TEXT_UID = (By.XPATH, '//*[@id="root"]/div/section/main/div/div/form/div[2]/input')
    TEXT_LATITUDE = (By.XPATH, '//*[@id="root"]/div/section/main/div/div/form/div[3]/input[1]')
    TEXT_LONGITUDE = (By.XPATH, '//*[@id="root"]/div/section/main/div/div/form/div[3]/input[2]')
    BTN_ADD_PARAMETROS = (By.XPATH, '//*[@id="root"]/div/section/main/div/div/button/span')
    BTN_CADASTRAR_ESTACAO = (By.XPATH, '//*[@id="root"]/div/section/main/div/div/form/div[4]/button')
    ABRIR_SELETOR = (By.XPATH, '//*[@id="pr_id_34_content"]/div/div/div[3]/span')
    SELETOR_PARAMETRO = (By.XPATH, '//*[@id="pr_id_34_content"]/div/div/div[2]/div')
    FECHAR_SELETOR = (By.XPATH, '/html/body/div[3]/div[1]/button')
    BTN_SALVAR_PARAMETRO = (By.XPATH, '//*[@id="pr_id_152_content"]/button/span[2]')

    BTN_LISTAGEM = (By.XPATH,'//*[@id="root"]/div/main/div[2]/div[1]/div/button[2]')
    BTN_ESTACAO_SELECIONADA = (By.XPATH, '//*[@id="root"]/div/section/main/div[2]/div/div[1]/div/div[4]/div/div/button')
    BTN_EDITAR_ESTACAO = (By.XPATH, '//*[@id="root"]/div[2]/div/div/div[2]/div[2]/div/button[1]')

    TEXT_EDITAR_NOME = (By.ID, 'Nome Estação')
    TEXT_EDITAR_LONGITUDE = (By.ID, 'Longetude')
    TEXT_EDITAR_LATITUDE = (By.ID, 'Latitude')
    BTN_SALVAR_EDICAO = (By.XPATH, '//*[@id="pr_id_2_content"]/form/button')


    BTN_EXCLUIR_ESTACAO =  (By.XPATH, '//*[@id="root"]/div[2]/div/div/div[2]/div[2]/div/button[3]')  

    