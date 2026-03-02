import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz a tela ocupar 100% da altura do dispositivo
    alignItems: 'center', // Centraliza os itens horizontalmente (como a logo)
    backgroundColor: '#d0d2d8', // Cor de fundo cinza clara para contraste
    paddingTop: 62, // Espaçamento no topo para não colar na barra de status do celular
  },
  
  logo: {
    height: 34,
    width: 134,
  },
  
  form: {
    width: '100%', // Ocupa toda a largura disponível
    paddingHorizontal: 16, // Margem interna nas laterais
    gap: 7, // Espaçamento automático entre o Input e o Button (muito prático!)
    marginTop: 42, // Distância entre a logo e o formulário
  },
  
  content: {
    flex: 1, // Faz com que o conteúdo branco "empurre" e ocupe o restante da tela
    width: '100%',
    backgroundColor: '#FFFFFF', // Fundo branco para a área da lista
    borderTopLeftRadius: 24, // Arredonda o canto superior esquerdo
    borderTopRightRadius: 24, // Arredonda o canto superior direito
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  
  header: {
    width: '100%',
    flexDirection: 'row', // Alinha os filtros e o botão "Limpar" um ao lado do outro
    gap: 12, // Espaço entre os filtros
    borderBottomWidth: 1, // Linha fina na parte inferior do cabeçalho
    borderBottomColor: '#E4E6EC',
    paddingBottom: 12,
  },
  
  clearButton: {
    marginLeft: 'auto', // Truque do Flexbox: empurra este botão para o final da linha
  },
  
  clearText: {
    fontSize: 12,
    color: '#828282',
    fontWeight: '600',
  },
  
  separator: {
    width: "100%",
    height: 1, // Cria uma linha divisória de apenas 1 pixel
    backgroundColor: "#EEF0F5",
    marginVertical: 16, // Espaçamento em cima e embaixo da linha
  },
  
  listContent: {
    // Estiliza a parte interna da FlatList
    paddingTop: 24,
    paddingBottom: 62, // Garante que o último item não fique escondido atrás de botões
  },
  
  empty: {
    fontSize: 14,
    color: "#808080",
    textAlign: 'center', // Centraliza o texto quando a lista estiver vazia
  },
});