# Pixel

Pixel is a library for using indexedDb in the background of a Google Chrome extension and in other scenarios it is also possible to use it.

## Installation

Use the package manager npm to install Pixel.

```bash
npm i pixel-idb
```

## Usage

```javascript
import Pixel from 'pixel-idb'
// create client
const client = new Pixel({
        dbName : 'User_DB',
        storeName : 'users',
        version : 1,
        table : [
          '@id', // @ = unique value
          'name',
          'email',
          'age'
        ]
})

// connect client and create store
const store = async () => await client.connect()

// this idbStore supports the same functions as indexedDb
const idbStore = async () => await store().idbStore()

// add will create a new record, if there is a field with a duplicate unique value the transaction will give an error
const add = async ({ id, name, email, age }) => await store().add({ id, name, email, age })

// put will create a new record, if there is a field with a duplicate unique value it will update the item.
const put = async ({ id, name, email, age }) => await store().put({ id, name, email, age })

// bulkDelete
const bulkDelete = async (arrayId) => await store().bulkDelete(arrayId)

// readAll
const readAll = async () => await store().read().all()

// deleteAll will clean the database
const deleteAll = async () => await store().deleteAll()
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)