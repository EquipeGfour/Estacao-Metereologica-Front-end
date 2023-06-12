from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By
import time
from locators import *

def deletar_estacao():
        navegador = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        locators = CrudEstacoesLocators
        url = 'http://localhost:3000'
        navegador.maximize_window()
        navegador.get(url)
        time.sleep(2)

        #Selecionar estação a ser deletada
        navegador.find_element(*locators.BTN_LISTAGEM).click()
        navegador.find_element(*locators.BTN_ESTACAO_SELECIONADA).click()        
        time.sleep(2)

        #Deletar estação
        navegador.find_element(*locators.BTN_EXCLUIR_ESTACAO).click()
        time.sleep(2)
        navegador.quit()
        return print('Estação deletada com sucesso!')   

deletar_estacao()