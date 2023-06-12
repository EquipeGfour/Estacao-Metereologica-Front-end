from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By
import time

from locators import CrudEstacoesLocators

def cadastro_estacao(nome,uid, latitude,longitude):
        locators = CrudEstacoesLocators
        navegador = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        url = 'http://localhost:3000'
        navegador.maximize_window()
        navegador.get(url)
        time.sleep(2)

        #Ir para tela Estações
        navegador.find_element(*locators.BTN_CADASTRO).click()
        time.sleep(2)

        #Cadastro de Estações
        navegador.find_element(*locators.TEXT_NOME).send_keys(nome)
        navegador.find_element(*locators.TEXT_UID).send_keys(uid)
        navegador.find_element(*locators.TEXT_LATITUDE).send_keys(latitude)
        navegador.find_element(*locators.TEXT_LONGITUDE).send_keys(longitude)
        time.sleep(2)

        #Adicionar Parâmetro Temperatura
        # navegador.find_element(*locators.BTN_ADD_PARAMETROS).click()
        # time.sleep(3)
        # navegador.find_element(*locators.ABRIR_SELETOR).click()
        # time.sleep(2)
        # navegador.find_element(*locators.SELETOR_PARAMETRO).click()
        # time.sleep(1)
        # navegador.find_element(*locators.FECHAR_SELETOR).click()
        # time.sleep(1)
        # navegador.find_element(*locators.BTN_SALVAR_PARAMETRO).click()

        #Salvar estação
        navegador.find_element(*locators.BTN_CADASTRAR_ESTACAO).click()

        time.sleep(2)
        navegador.quit()
        return print('Estação cadastrada com Sucesso || Nome da estação: ' , nome)

cadastro_estacao('Teste', '22888881' ,'123456', '654321')