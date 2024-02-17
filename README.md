# Documentação da API

### Make a analysis

This endpoint allows you to make a analysis by making an HTTP POST request to `api/analysis/`.

#### Request header

- `authorization`: must be `Bearer ${JWT}`

#### Request Body

- `author` (string): The author of the analysis.
- `name` (string): The name of the analysis.
- `analyzedAt` (string, optional): The date and time when the analysis was conducted.
- `image` (string, required): The image data for analysis.

#### Response

Upon a successful request, the server will respond with a status code of 200 and a JSON object containing the following fields:

- `data` (object):
  - `attachment` (object):
    - `fileName` (string): The name of the attached file.
  - `id` (string): The ID of the analysis.
  - `analyzedAt` (string): The date and time when the analysis was conducted.
  - `userId` (string): The ID of the user who added the analysis.
  - `name` (string): The name of the analysis.
  - `author` (string): The author of the analysis.
  - `attachmentId` (string): The ID of the attached file.
  - `miner` (number): The value for miner analysis.
  - `phoma` (number): The value for phoma analysis.
  - `cerscospora` (number): The value for cerscospora analysis.
  - `leafRust` (number): The value for leaf rust analysis.
  - `healthy` (number): The value for healthy analysis.

### Add Treatment

This endpoint allows you to add a new treatment by making an HTTP POST request to `api/treatment/`.

#### Request header

- `authorization`: must be `Bearer ${JWT}`

#### Request Body

- `plagueId` (string, optional): The ID of the plague for which the treatment is being added.
- `name` (string, optional): The name of the treatment.
- `consumables` (array, optional): An array of consumables required for the treatment.

#### Response

- Status: 200
- Content-Type: application/json
- `data` (object): An object containing the details of the newly added treatment, including its `id`, `plagueId`, `name`, and `consumables`.

### List Consumable

This endpoint allows you to list consumable by making an HTTP GET request to `api/consumable/`.

This endpoint retrieves consumable items based on the provided search term, with pagination support. It accepts the 'searchTerm', 'limit', and 'offset' as query parameters to filter and paginate the results. The response will be in JSON format with an array of consumable items, each containing 'id', 'name', 'createdAt', and 'updatedAt' properties.

### Get Attachment

This endpoint retrieves the attachment with the specified ID. The response will include the details of the attachment such as ID, file name, MIME type, and creation timestamp. making an HTTP GET request to `api/attachment/:fileName`.

The response will be in JSON format and will include the following fields:
data: The data of the attachment
id: The ID of the attachment
fileName: The name of the file
mimeType: The MIME type of the file
createdAt: The timestamp when the attachment was created

# API Request: Get Analysis Data

This endpoint makes an HTTP GET request to retrieve analysis data from the server.

#### Request header

- `authorization`: must be `Bearer ${JWT}`

### Request

- Method: GET
- URL: `localhost:3001/api/analysis/`

### Response

- Status: 200
- Content-Type: application/json

The response contains an array of analysis data objects, each including the following fields:

- `id` (string): The unique identifier for the analysis.
- `userId` (string): The identifier of the user associated with the analysis.
- `author` (string): The author of the analysis.
- `phoma` (number): The phoma value.
- `cerscospora` (number): The cerscospora value.
- `leafRust` (number): The leaf rust value.
- `miner` (number): The miner value.
- `healthy` (number): The healthy value.
- `analyzedAt` (string): The timestamp when the analysis was performed.
- `attachment` (object): An object containing information about the attachment, including the `fileName`.
- `plague` (object): An object containing information about the plague, including the `id` and `name`.
- `treatments` (array): An array of treatment objects, each including the `id`, `name`, and `consumables` array. Each consumable includes the `quantity` and `consumable` object with `id` and `name` fields.

### Create User Session

This endpoint allows you to create a user session by providing the user's email and password.

**Endpoint**

```
POST localhost:3001/api/user/session

```

**Request Body**

- `email` (text) - The email of the user.
- `password` (text) - The password of the user.

**Response**

- Status: 200
- Content-Type: application/json
- `data` (object)
  - `id` - The user's ID.
  - `name` - The user's name.
  - `token` - The session token for the user.

### Add User

This endpoint allows you to create a new user.

#### Request Body

- `name` (string, required): The name of the user.
- `email` (string, required): The email address of the user.
- `password` (string, required): The password for the user account.

#### Response

- `data` (object): An object containing user data.
  - `name` (string): The name of the user.
  - `id` (string): The unique identifier of the user.
  - `token` (string): The authentication token for the user.

Example:

```json
{
  "data": {
    "name": "",
    "id": "",
    "token": ""
  }
}
```

### Create Plague

This API endpoint allows you to create a new entry related to a plague. When making a POST request to `localhost:3002/api/plague/`, the request body should include the `name` and `description` parameters. Both parameters are expected to be of type text.

#### Request header

- `authorization`: must be `Bearer ${JWT}`

#### Request Body

- `name`: (text) The name of the plague.
- `description`: (text) A description of the plague.

#### Response

Upon successful execution, the API will return a status code of 200 and a JSON object in the response body. The response will contain the `id`, `name`, and `description` of the newly created plague entry under the `data` field.

Example:

```json
{
  "data": {
    "id": "plague_id",
    "name": "plague_name",
    "description": "plague_description"
  }
}
```

### List Plagues

This endpoint retrieves information about the plague from the server. Upon successful execution, it returns a status code of 200 along with a JSON response containing an array of plague data objects. Each object includes an ID, name, description, and a boolean flag indicating whether the data has been analyzed.
