from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

from selenium.webdriver.common.by import By
import time
from locators import *


def visualizar_estacao():
        navegador = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        locators = CrudEstacoesLocators
        url = 'http://localhost:3000'
        navegador.maximize_window()
        navegador.get(url)
        time.sleep(2)

        #Visualizar estação
        navegador.find_element(*locators.BTN_LISTAGEM).click()
        time.sleep(5)
        navegador.quit()

visualizar_estacao()