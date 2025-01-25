# task-management-system

## Configuração de Containers com Docker

Para configurar os containers para PostgreSQL e Redis, utilize os comandos abaixo. Certifique-se de ter o [Docker](https://www.docker.com/) instalado em sua máquina.

### Variáveis de Ambiente

Defina as seguintes variáveis de ambiente no seu terminal ou arquivo `.env`:

```bash
DB_NAME=taskSystem
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost

REDIS_HOST=localhost
REDIS_PORT=6379
```

### Comandos para Criar os Containers

#### PostgreSQL

Execute o comando abaixo para criar e iniciar um container PostgreSQL:

```bash
docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=taskSystem -p 5432:5432 -d postgres
```

- **POSTGRES_USER**: Define o nome de usuário do banco de dados.
- **POSTGRES_PASSWORD**: Define a senha do banco de dados.
- **POSTGRES_DB**: Define o nome do banco de dados.
- **-p 5432:5432**: Mapeia a porta local 5432 para o container.

#### Redis

Execute o comando abaixo para criar e iniciar um container Redis:

```bash
docker run --name redis-container -p 6379:6379 -d redis
```

- **-p $REDIS_PORT:6379**: Mapeia a porta local especificada pela variável `REDIS_PORT` para o container.

### Verificando os Containers

Para verificar se os containers estão em execução, utilize:

```bash
docker ps
```

Para acessar os logs de um container específico, use:

```bash
docker logs <nome_do_container>
```

### Conexão com o Banco de Dados e Redis

- PostgreSQL estará disponível em `localhost:5432`.
- Redis estará disponível em `localhost:6379`.

Certifique-se de que as variáveis de ambiente estão corretamente configuradas para que sua aplicação possa se conectar aos serviços.

