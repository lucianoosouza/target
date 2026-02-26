// 1. Importamos o 'StyleSheet' do núcleo do React Native.
// Ele é uma ferramenta que valida seus estilos e melhora a performance do app.
import { StyleSheet } from "react-native";

/**
 * Criamos e exportamos o objeto 'styles'.
 * O método .create() garante que o código seja processado de forma eficiente pelo dispositivo.
 */
export const styles = StyleSheet.create({
  
  // Estilo para o container principal (o "pai" de todos os elementos na tela)
  container: {
    // flex: 1 faz com que a View ocupe TODO o espaço disponível na tela do celular.
    flex: 1,
    
    // alignItems: 'center' alinha os elementos horizontalmente (no centro da largura).
    alignItems: 'center',
    
    // justifyContent: 'center' alinha os elementos verticalmente (no centro da altura).
    // Com flex: 1 e esses dois comandos, o conteúdo fica "perfeitamente centralizado".
    justifyContent: 'center',
  },

  // Estilo específico para o componente de texto
  text: {
    // Define o tamanho da fonte. Diferente da web, não usamos 'px', apenas o número.
    fontSize: 32,
    
    // Define o peso (espessura) da fonte. 700 equivale ao 'bold' (negrito).
    fontWeight: '700',
    
    // Define a cor do texto. Pode ser o nome da cor, hexadecimal ou RGB.
    color: 'red',
  },
});