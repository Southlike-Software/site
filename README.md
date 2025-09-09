# Southlike Software — Site de Marketing (Astro + Tailwind)

Site institucional em português para imobiliárias brasileiras, com UI escura moderna, coleta de leads (MongoDB) e agendamento (Cal.com).

## Configuração

Crie um arquivo `.env` na raiz com:

```
PUBLIC_CAL_URL=https://cal.com/southlike
MONGODB_URI=mongodb+srv://user:pass@cluster/db
MONGODB_DB=southlike
```

## Comandos

| Comando        | Ação                                       |
| :------------- | :----------------------------------------- |
| `pnpm install` | Instala dependências                       |
| `pnpm dev`     | Inicia servidor em `http://localhost:4321` |
| `pnpm build`   | Gera build de produção em `./dist/`        |
| `pnpm preview` | Faz preview do build localmente            |

## Deploy

Configure as variáveis do `.env` na sua plataforma (Vercel/Fly/etc). Certifique-se de que o banco MongoDB esteja acessível a partir do ambiente de produção.
