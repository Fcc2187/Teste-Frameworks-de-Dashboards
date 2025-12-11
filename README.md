# 📊 Dashboard Corporativo - Victory Charts

Um dashboard interativo e responsivo desenvolvido em **React**, focado na visualização de dados de vendas corporativas. Este projeto utiliza a biblioteca **Victory** para gráficos complexos e **Tailwind CSS** para estilização moderna e temas dinâmicos.

## 🚀 Funcionalidades

- **KPIs em Tempo Real**: Visualização rápida de Faturamento, Unidades Vendidas e Quantidade de Pedidos.
- **Gráficos Interativos (Victory)**:
  - **Gráfico de Pizza (Donut)**: Distribuição de vendas por categoria (Ex: Amendoim, Coenzima Q10, etc).
  - **Gráfico de Barras**: Faturamento mensal comparativo.
  - **Gráfico de Área (Smooth)**: Tendência de unidades vendidas ao longo do ano com gradiente.
- **Filtro por Ano**: Alterne os dados entre 2023 e 2024 dinamicamente.
- **Gerenciamento de Temas**: Suporte a temas (Dark/Light/Colorblind) via Context API e Tailwind.
- **Responsividade**: Layout adaptável (Mobile, Tablet e Desktop) usando CSS Grid.

## 🛠️ Stack Tecnológica

- **Core**: [React.js](https://react.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Gráficos**: [Victory Charts](https://formidable.com/open-source/victory/)
- **Gerenciamento de Estado**: React Context API (`ThemeContext`)
- **Hooks Customizados**: `useVendasData` para lógica de dados.