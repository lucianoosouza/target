// 1. Importamos os componentes fundamentais do núcleo do React Native.
// View funciona como um container (caixa) e Text é obrigatório para qualquer string.
import { Text, View } from "react-native";

// 2. Importamos o objeto de estilização de um arquivo externo. 
// Isso mantém nosso componente limpo e focado na estrutura.
import { styles } from "./styles";

/**
 * Componente Home: Representa a tela principal da aplicação.
 * Usamos 'export' para que ele possa ser importado no arquivo principal (App.js).
 */
export function Home() {
  return (
    /* A View abaixo atua como o container pai. 
       O atributo 'style' recebe as configurações de layout do objeto styles.container.
    */
    <View style={styles.container}>
      
      {/* O componente Text é o responsável por renderizar o conteúdo escrito.
          Sem ele, o React Native retornaria um erro ao tentar renderizar texto puro.
      */}
      <Text style={styles.text}>Hello, World!</Text>
      
    </View>
  );
}