// 1. Importamos a função registerRootComponent do pacote Expo.
// Ela é a responsável por "ligar os motores" do aplicativo no dispositivo.
import { registerRootComponent } from 'expo';

// 2. Importamos a nossa tela principal (Home) que criamos dentro da pasta src.
// Note que o caminho reflete a nova organização de pastas que adotamos na aula.
import { Home } from './src/app/Home';

/**
 * registerRootComponent(Home):
 * * Esta função faz duas coisas fundamentais:
 * 1. Registra o componente 'Home' como o componente principal (raiz) do app.
 * 2. Garante que o ambiente seja configurado corretamente, seja rodando no 
 * Expo Go (durante o desenvolvimento) ou em um aplicativo instalado (produção).
 */
registerRootComponent(Home);