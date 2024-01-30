# Documentação da API

## Criar Praga

Cria uma nova praga.

### Request

`POST /plague/`

- `Headers`
- authorization: Bearer <token>

O token de autorização deve ser fornecido no header de autorização.

- `Body`

```json
{
  "name": "teste 2",
  "description": "teste"
}
```

### Response

- `Status`: 200

```json
{
  "data": {
    "id": "9b8575e9-1312-4700-80cd-36946a8a72b6",
    "name": "teste 2",
    "description": "teste"
  }
}
```

## Listar Praga

### Request

`GET /plague/`

### Response

- `Status`: 200

```json
{
  "data": [
    {
      "id": "9b8575e9-1312-4700-80cd-36946a8a72b6",
      "name": "teste 2",
      "description": "teste"
    }
  ]
}
```

## Criar Analisis

### Request

`POST /analysis/`

- `Headers`
- authorization: Bearer <token>

O token de autorização deve ser fornecido no header de autorização.

- `Body`

```json
{
  "author": "teste",
  "analyzedAt": "2024-01-04",
  "phoma": 0.1,
  "cerscospora": 0,
  "healthy": 0.3,
  "leafRust": 0.2,
  "miner": 0.94
}
```

### Response

- `Status`: 200

```json
{
  "data": {
    "id": "f4470a59-181f-4a17-8a8c-44829666989f",
    "analyzedAt": "2024-01-04",
    "userId": "de9c18b3-2022-4669-8e10-d7ca03f9e157",
    "author": "teste",
    "phoma": 0.1,
    "cerscospora": 0,
    "healthy": 0.3,
    "leafRust": 0.2,
    "miner": 0.94
  }
}
```

## Listar Analysis

### Request

`GET /plague/`

- `Headers`
- authorization: Bearer <token>

O token de autorização deve ser fornecido no header de autorização.

### Response

- `Status`: 200

```json
{
  "data": [
    {
      "id": "f4470a59-181f-4a17-8a8c-44829666989f",
      "userId": "de9c18b3-2022-4669-8e10-d7ca03f9e157",
      "author": "teste",
      "phoma": 0.1,
      "cerscospora": 0,
      "leafRust": 0.2,
      "miner": 0.94,
      "healthy": 0.3,
      "analyzedAt": "2024-01-04T03:00:00.000Z",
      "plague": {
        "id": "5eadc22d-3336-4fcc-8802-6936a915256f",
        "name": "miner"
      },
      "treatments": [
        {
          "id": "e53e4bef-269f-4e2f-ae7f-9689e25804ce",
          "name": null,
          "consumables": [
            {
              "quantity": 1230,
              "consumable": {
                "id": "edb9fbaf-bca9-4fa3-8d3c-f60b9a2f1122",
                "name": "Insecticida"
              }
            }
          ]
        },
        {
          "id": "5fe588f6-ed30-4354-9124-9142b3f54214",
          "name": null,
          "consumables": [
            {
              "quantity": 3213,
              "consumable": {
                "id": "edb9fbaf-bca9-4fa3-8d3c-f60b9a2f1122",
                "name": "Insecticida"
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## Criar Tratamento

### Request

`POST /treatment/`

- `Headers`
- authorization: Bearer <token>

O token de autorização deve ser fornecido no header de autorização.

- `Body`

```json
{
  "plagueId": "5eadc22d-3336-4fcc-8802-6936a915256f",
  "name": "teste",
  "consumables": [
    {
      "quantity": 3213,
      "consumable": {
        "name": "Veneno"
      }
    },
    {
      "quantity": 3213,
      "consumable": {
        "id": "edb9fbaf-bca9-4fa3-8d3c-f60b9a2f1122"
      }
    }
  ]
}
```

- Rules: se mandar um name será criado um novo produto a ser consumido, se mandar o id irá usar um já existente

### Response

- `Status`: 200

```json
{
  "data": {
    "id": "49db82cf-538b-4f75-b621-2b8e28376132",
    "plagueId": "5eadc22d-3336-4fcc-8802-6936a915256f",
    "name": "teste",
    "consumables": [
      {
        "quantity": 3213,
        "consumable": {
          "id": "2f71aff0-173e-4892-a994-6d1c4b8d1c82",
          "name": "Veneno"
        }
      },
      {
        "quantity": 3213,
        "consumable": {
          "id": "edb9fbaf-bca9-4fa3-8d3c-f60b9a2f1122",
          "name": "Inceticida"
        }
      }
    ]
  }
}
```

## Listar consumivel

### Request

`GET /consumable/`

- `Query params`

```json
    "searchTerm": "v",
    "limit": 1,
    "offset": 1
```

### Response

- `Status`: 200

```json
{
  "data": [
    {
      "id": "2f71aff0-173e-4892-a994-6d1c4b8d1c82",
      "name": "Veneno",
      "createdAt": "2024-01-30T14:32:08.713Z",
      "updatedAt": null
    }
  ]
}
```
