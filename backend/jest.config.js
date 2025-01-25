export default {
  transform: {
    '^.+\\.m?js$': 'babel-jest', // Transforma os arquivos JS e MJS
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!modulo-especifico)'], // Mantém um módulo específico fora da transformação
};
